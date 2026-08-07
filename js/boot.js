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
        input.type = "password";
        input.placeholder = "Password";
        input.focus();

        return;
    }

    print(bootLines[bootIndex]);

    bootIndex++;

    setTimeout(bootLine, 450);
}

window.onload = function () {

    clearScreen();

    inputLine.classList.add("hidden");

    bootLine();

};

input.addEventListener("keydown", function (e) {

    if (!passwordMode) return;

    if (e.key !== "Enter") return;

    e.preventDefault();

    const password = input.value.trim();

print("DEBUG: [" + password + "]");

    if (password === "K-113") {

        passwordMode = false;

        clearScreen();

        input.value = "";
        input.type = "text";

        startTerminal();

        return;
    }

    print("");
    print("ACCESS DENIED");
    print("");

    input.value = "";

});
