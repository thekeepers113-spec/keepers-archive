/*
=========================================
KEEPER OS
Command Engine
=========================================
*/

const COMMANDS = {

HELP() {

return `
AVAILABLE COMMANDS

HELP
DIR
OPEN
STATUS
WHOAMI
VER
CLS

`;

},

DIR() {

let text = "";

for (const file in FILESYSTEM.root) {
    text += file + "\n";
}

return text;

},

STATUS() {

return `
ARCHIVE STATUS

ONLINE

TARGET:
ECHO 001

STATUS:
MISSING

SIGNAL:
17%

`;

},

WHOAMI() {

return `
RECOVERY-01

CLEARANCE LEVEL:
0

`;

},

VER() {

return `
KEEPER OS

VERSION 1.13

ARCHIVE BUILD:
1989.11

`;

},

OPEN(filename){

if(!filename)
    return "Usage:\nOPEN filename";

filename = filename.toUpperCase();

if(FILESYSTEM.root[filename]){

    if(filename==="OPERATIONS.LOG"){
        GAME.scanUnlocked = true;
    }

    return FILESYSTEM.root[filename];
}

if(FILESYSTEM.hidden[filename]){

    if(!GAME.signalRecovered){
        return "FILE NOT FOUND";
    }

    return FILESYSTEM.hidden[filename];
}

return "FILE NOT FOUND";

},

SCAN(){

if(!GAME.scanUnlocked){

return `
SCAN FAILED

Unknown scan target.

`;

}

GAME.signalRecovered = true;

return `
Scanning archive...

Sector 001........OK
Sector 002........OK
Sector 003........CORRUPTED
Sector 004........RECOVERED

Hidden file recovered:

SIGNAL.DAT

`;

},

CLS(){

clearScreen();
return "";

}

};
