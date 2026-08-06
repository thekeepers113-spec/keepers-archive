/*
=========================================
KEEPER OS v1.13
Boot Sequence
=========================================
*/

const bootLines = [
    "KEEPER OS v1.13",
    "",
    "Initializing archive...",
    "Loading Keeper Registry...",
    "Verifying Echo Database...",
    "",
    "Echo 001 ............ MISSING",
    "",
    "Archive Status ...... ONLINE",
    "",
    "ARCHIVE OFFLINE — AUTHORIZATION REQUIRED",
    "",
    "ENTER PASSWORD:"
];

let bootIndex = 0;
let passwordMode = false;

function bootLine() {

    if (bootIndex >= bootLines.length) {

        passwordMode = true;

        inputLine.classList.remove("hidden");
        input.placeholder = "Password";
        input.type = "password";
        input.focus();

        return;
    }

    print(bootLines[bootIndex]);

    bootIndex++;

    setTimeout(bootLine, 450);

}

window.onload = () => {

    inputLine.classList.add("hidden");

    bootLine();

};

input.addEventListener("keydown", function(e){

    if(!passwordMode) return;

    if(e.key !== "Enter") return;

    e.preventDefault();

    const pass = input.value.trim();

    if(pass === "K-113"){

        passwordMode = false;

        clearScreen();

        input.type = "text";
        input.placeholder = "";

        startTerminal();

        return;

    }

    print("");
    print("ACCESS DENIED");
    print("");

    input.value = "";

});
