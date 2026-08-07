```javascript
/*
=========================================
KEEPER OS
commands.js
=========================================
*/

const COMMANDS = {

    LOGIN(username, password) {

        if (!username || !password) {
            return `
Usage:

LOGIN username password
`;
        }

        username = username.toUpperCase();

        const user = USERS[username];

        if (!user) {
            return "ACCESS DENIED";
        }

        if (user.password !== password) {
            return "ACCESS DENIED";
        }

        GAME.loggedIn = true;
        GAME.user = username;
        GAME.clearance = user.clearance;

        return `
AUTHENTICATION SUCCESSFUL

USER: ${username}

CLEARANCE LEVEL: ${GAME.clearance}
`;
    },


    HELP() {

        return `
AVAILABLE COMMANDS

HELP
DIR
OPEN
STATUS
WHOAMI
VER
SCAN
AUTH
CLS
CD
BACK
`;
    },


    DIR() {

        let directory;

        if (GAME.currentDirectory === "ROOT") {

            directory = FILESYSTEM.root;

        }

        else if (GAME.currentDirectory === "HIDDEN") {

            if (!GAME.signalRecovered) {
                return "DIRECTORY NOT FOUND";
            }

            directory = FILESYSTEM.hidden;

        }

        else if (GAME.currentDirectory === "REGISTRY") {

            if (!GAME.registryUnlocked) {
                return "ACCESS DENIED";
            }

            directory = FILESYSTEM.registry;

        }

        else {

            return "DIRECTORY NOT FOUND";

        }


        let text = "";

        for (const file in directory) {

            text += file + "\n";

        }

        return text;
    },


    STATUS() {

        let registryStatus =
            GAME.registryUnlocked
                ? "UNLOCKED"
                : "LOCKED";

        return `
ARCHIVE STATUS

ONLINE

TARGET:
ECHO 001

STATUS:
MISSING

SIGNAL:
17%

CLEARANCE:
LEVEL ${GAME.clearance}

REGISTRY:
${registryStatus}
`;
    },


    WHOAMI() {

        return `
USER:

${GAME.user}

CLEARANCE LEVEL:

${GAME.clearance}
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


    OPEN(filename) {

        if (!filename) {

            return `
Usage:

OPEN filename
`;
        }


        filename = filename.toUpperCase();


        /*
        =========================================
        ROOT DIRECTORY
        =========================================
        */

        if (GAME.currentDirectory === "ROOT") {

            if (FILESYSTEM.root[filename]) {

                /*
                Opening OPERATIONS.LOG
                unlocks SCAN.
                */

                if (filename === "OPERATIONS.LOG") {

                    GAME.scanUnlocked = true;

                }

                return FILESYSTEM.root[filename];
            }


            /*
            Hidden files become available
            after SIGNAL.DAT is recovered.
            */

            if (FILESYSTEM.hidden[filename]) {

                if (!GAME.signalRecovered) {

                    return "FILE NOT FOUND";

                }

                return FILESYSTEM.hidden[filename];

            }


            return "FILE NOT FOUND";
        }


        /*
        =========================================
        HIDDEN DIRECTORY
        =========================================
        */

        if (GAME.currentDirectory === "HIDDEN") {

            if (!GAME.signalRecovered) {

                return "ACCESS DENIED";

            }


            if (!FILESYSTEM.hidden[filename]) {

                return "FILE NOT FOUND";

            }


            return FILESYSTEM.hidden[filename];
        }


        /*
        =========================================
        REGISTRY DIRECTORY
        =========================================
        */

        if (GAME.currentDirectory === "REGISTRY") {

            if (!GAME.registryUnlocked) {

                return "ACCESS DENIED";

            }


            if (!FILESYSTEM.registry[filename]) {

                return "FILE NOT FOUND";

            }


            /*
            Track files the player investigates.
            */

            if (!GAME.discoveredFiles.includes(filename)) {

                GAME.discoveredFiles.push(filename);

            }


            return FILESYSTEM.registry[filename];
        }


        return "FILE NOT FOUND";
    },


    SCAN() {

        if (!GAME.scanUnlocked) {

            return `
SCAN FAILED

Unknown scan target.

Read OPERATIONS.LOG
before attempting a scan.
`;
        }


        if (GAME.signalRecovered) {

            return `
SCAN COMPLETE

No additional sectors detected.

Recovered file:

SIGNAL.DAT
`;
        }


        GAME.signalRecovered = true;


        return `
SCANNING ARCHIVE...

Sector 001........OK
Sector 002........OK
Sector 003........CORRUPTED
Sector 004........RECOVERED

--------------------------------

HIDDEN FILE RECOVERED:

SIGNAL.DAT

--------------------------------

Use:

OPEN SIGNAL.DAT

to inspect the recovered transmission.
`;
    },


    AUTH(key) {

        if (!key) {

            return `
Usage:

AUTH XX-XX-XX-XX
`;
        }


 /*
=========================================
REGISTRY AUTHORIZATION
=========================================
*/

        const normalizedKey =
            key
                .toUpperCase()
                .replace(/-/g, "")
                .replace(/\s/g, "");


        if (normalizedKey !== "7A3FC199") {

            return `
AUTHORIZATION FAILED

INVALID AUTHORIZATION KEY
`;
        }


        GAME.registryAuthorized = true;
        GAME.registryUnlocked = true;
        GAME.clearance = 1;


        return `
=========================================

REGISTRY AUTHORIZATION ACCEPTED

AUTHORIZATION KEY:
7A-3F-C1-99

-----------------------------------------

CLEARANCE UPDATED

LEVEL 0
    ↓
LEVEL 1

-----------------------------------------

KEEPER REGISTRY:
UNLOCKED

-----------------------------------------

The archive has accepted
your authorization.

But something is wrong.

The Registry contains records
that should not exist.

=========================================

Use:

CD REGISTRY

to enter the Registry.
`;
    },


    CD(directory) {

        if (!directory) {

            return `
Usage:

CD REGISTRY
`;
        }


        directory = directory.toUpperCase();


        /*
        =========================================
        REGISTRY
        =========================================
        */

        if (directory === "REGISTRY") {

            if (!GAME.registryUnlocked) {

                return `
ACCESS DENIED

Registry authorization required.
`;
            }


            GAME.currentDirectory = "REGISTRY";


            return `
DIRECTORY CHANGED

C:\\KEEPERS\\REGISTRY>
`;
        }


        /*
        =========================================
        HIDDEN
        =========================================
        */

        if (directory === "HIDDEN") {

            if (!GAME.signalRecovered) {

                return `
ACCESS DENIED

Hidden directory unavailable.
`;
            }


            GAME.currentDirectory = "HIDDEN";


            return `
DIRECTORY CHANGED

C:\\KEEPERS\\HIDDEN>
`;
        }


        /*
        =========================================
        ROOT
        =========================================
        */

        if (
            directory === "ROOT" ||
            directory === ".."
        ) {

            GAME.currentDirectory = "ROOT";


            return `
DIRECTORY CHANGED

C:\\KEEPERS>
`;
        }


        return "DIRECTORY NOT FOUND";
    },


    BACK() {

        if (GAME.currentDirectory === "ROOT") {

            return `
Already at root directory.
`;
        }


        GAME.currentDirectory = "ROOT";


        return `
DIRECTORY CHANGED

C:\\KEEPERS>
`;
    },


    CLS() {

        clearScreen();

        return "";
    }

};
```


