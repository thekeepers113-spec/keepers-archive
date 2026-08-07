/*
=========================================
KEEPER OS
terminal.js
=========================================
*/

const output = document.getElementById("output");
const input = document.getElementById("commandInput");
const inputLine = document.getElementById("input-line");

let history = [];
let historyIndex = 0;


/*
=========================================
PRINT
=========================================
*/

function print(text = "") {

    output.innerHTML +=
        text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br>");

    output.scrollTop = output.scrollHeight;
}


/*
=========================================
CLEAR SCREEN
=========================================
*/

function clearScreen() {

    output.innerHTML = "";

}


/*
=========================================
PROMPT
=========================================
*/

function prompt() {

    input.value = "";
    input.focus();

}


/*
=========================================
EXECUTE COMMAND
=========================================
*/

function execute(commandLine) {

    commandLine = commandLine.trim();

    if (!commandLine) {

        prompt();
        return;

    }


    history.push(commandLine);

    historyIndex = history.length;


    print(
        `<span style="color:#33ff66;">C:\\KEEPERS&gt; ${commandLine}</span>`
    );


    const parts = commandLine.split(/\s+/);

    const command = parts[0].toUpperCase();

    const args = parts.slice(1);

    const arg = args.join(" ");


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


        case "SCAN":

            print(COMMANDS.SCAN());

            break;


        case "AUTH":

            print(COMMANDS.AUTH(arg));

            break;


        case "CD":

            print(COMMANDS.CD(args[0]));

            break;


        case "BACK":

            print(COMMANDS.BACK());

            break;


        case "CLS":

            COMMANDS.CLS();

            break;


        case "LOGIN":

            print(
                COMMANDS.LOGIN(
                    args[0],
                    args[1]
                )
            );

            break;


        default:

            print("UNKNOWN COMMAND");

    }


    prompt();

}


/*
=========================================
KEYBOARD INPUT
=========================================
*/

input.addEventListener("keydown", function(e) {


    /*
    ENTER
    */

    if (e.key === "Enter") {

        /*
        Password entry is handled
        by boot.js.
        */

        if (input.type === "password") {

            return;

        }


        execute(input.value);

    }


    /*
    =====================================
    ARROW UP
    =====================================
    */

    if (e.key === "ArrowUp") {

        if (history.length === 0) {

            return;

        }


        historyIndex =
            Math.max(
                0,
                historyIndex - 1
            );


        input.value =
            history[historyIndex];

    }


    /*
    =====================================
    ARROW DOWN
    =====================================
    */

    if (e.key === "ArrowDown") {

        if (history.length === 0) {

            return;

        }


        historyIndex++;


        if (historyIndex >= history.length) {

            historyIndex = history.length;

            input.value = "";

            return;

        }


        input.value =
            history[historyIndex];

    }

});


/*
=========================================
START TERMINAL
=========================================
*/

function startTerminal() {

    input.type = "text";

    input.placeholder = "";

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
