/*
====================================
KEEPER OS v1.13
Command Engine
====================================
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

STATUS() {

return `
TARGET:
ECHO 001

STATUS:
MISSING

SIGNAL:
17%

RECOVERY:
AUTHORIZED

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

DIR() {

let output="";

for(const file in FILESYSTEM.root){

output+=file+"\n";

}

return output;

},

OPEN(filename){

if(!filename){

return "Usage:\nOPEN filename";

}

filename=filename.toUpperCase();

const file=FILESYSTEM.root[filename];

if(file===undefined){

return "FILE NOT FOUND";

}

if(typeof file==="object"){

return "DIRECTORY\n\nFuture update.";

}

return file;

}

};
