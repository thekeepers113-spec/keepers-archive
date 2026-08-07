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
}

function clearScreen() {
    output.innerHTML = "";
}

function prompt() {
    input.value = "";
    input.focus();
}

function execute(commandLine) {

    commandLine = commandLine.trim();

    if (!commandLine) {
        prompt();
        return;
    }

    history.push(commandLine);
    historyIndex = history.length;

    print(`<span style="color:#33ff66;">C:\\KEEPERS&gt; ${commandLine}</span>`);

    const parts = commandLine.split(" ");
    const command = parts[0].toUpperCase();
const args = parts.slice(1);
const arg = args.join(" ");

    switch(command){

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
            COMMANDS.CLS();
            break;

            case "SCAN":
    print(COMMANDS.SCAN());
    break;

        default:
            print("UNKNOWN COMMAND");
    }

    prompt();
}

input.addEventListener("keydown", function(e){

 if (e.key === "Enter") {

    // Don't execute commands until after login.
    if (input.type === "password") {
        return;
    }

    execute(input.value);

}

    if(e.key==="ArrowUp"){

        if(history.length===0) return;

        historyIndex=Math.max(0,historyIndex-1);
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

function startTerminal(){

    input.type="text";
    input.placeholder="";

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
