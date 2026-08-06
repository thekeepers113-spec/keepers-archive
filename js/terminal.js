/*
=========================================
KEEPER OS
Terminal Engine
=========================================
*/

const output = document.getElementById("output");
const input = document.getElementById("commandInput");
const inputLine = document.getElementById("input-line");

let history = [];
let historyIndex = 0;

function print(text = "") {
    output.innerHTML += text.replace(/\n/g, "<br>") + "<br>";
    output.scrollTop = output.scrollHeight;
    document.getElementById("terminal").scrollTop =
        document.getElementById("terminal").scrollHeight;
}

function clearScreen() {
    output.innerHTML = "";
}

function prompt() {
    input.value = "";
    input.focus();
}

function execute(commandLine) {

    if (!commandLine.trim()) return;

    history.push(commandLine);
    historyIndex = history.length;

    print(`<span style="color:#33ff66;">C:\\KEEPERS&gt; ${commandLine}</span>`);

    const parts = commandLine.trim().split(" ");
    const command = parts[0].toUpperCase();
    const arg = parts.slice(1).join(" ");

    switch (command) {

        case "HELP":
            print(COMMANDS.HELP());
            break;

        case "DIR":
            print(COMMANDS.DIR());
            break;

        case "STATUS":
            print(COMMANDS.STATUS());
            break;

        case "WHOAMI":
            print(COMMANDS.WHOAMI());
            break;

        case "VER":
            print(COMMANDS.VER());
            break;

        case "OPEN":
            print(COMMANDS.OPEN(arg));
            break;

        case "CLS":
            clearScreen();
            break;

        case "EXIT":
            print("LOGOUT NOT AVAILABLE");
            break;

        default:
            print(
`UNKNOWN COMMAND

Type HELP for a list of available commands.`
            );
    }

    prompt();
}

input.addEventListener("keydown", e => {

    if (e.key === "Enter") {
        execute(input.value);
    }

    if (e.key === "ArrowUp") {

        if(history.length===0) return;

        historyIndex--;

        if(historyIndex<0)
            historyIndex=0;

        input.value=history[historyIndex];

    }

    if(e.key==="ArrowDown"){

        if(history.length===0) return;

        historyIndex++;

        if(historyIndex>=history.length){

            historyIndex=history.length;
            input.value="";
            return;

        }

        input.value=history[historyIndex];

    }

});

/*
Called by boot.js
*/

function startTerminal(){

    inputLine.classList.remove("hidden");

    print("");

    print("LOGIN SUCCESSFUL");
    print("");
    print("USER: RECOVERY-01");
    print("CLEARANCE: LEVEL 0");
    print("");
    print("Type HELP to begin.");
    print("");

    prompt();

}
