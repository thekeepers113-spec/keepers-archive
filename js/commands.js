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

        let commands = `
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
`;

        if (GAME.registryUnlocked) {

            commands += `
CD
BACK
`;
        }

        return commands;
    },


    DIR() {

        let directory;

        if (GAME.currentDirectory === "ROOT") {

            directory = FILESYSTEM.root;

        }

        else if (GAME.currentDirectory === "HIDDEN") {

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

        let directory;


        /*
        =========================================
        ROOT
        =========================================
        */

        if (GAME.currentDirectory === "ROOT") {

            directory = FILESYSTEM.root;

            if (directory[filename]) {

                /*
                Opening OPERATIONS.LOG
                enables SCAN.
                */

                if (filename === "OPERATIONS.LOG") {

                    GAME.scanUnlocked = true;

                }

                return directory[filename];
            }


            /*
            Hidden files cannot normally
            be opened from ROOT.
            */

            if (FILESYSTEM.hidden[filename]) {

                if (filename === "SIGNAL.DAT") {

                    if (!GAME.signalRecovered) {

                        return "FILE NOT FOUND";
                    }

                }

                if (filename === "REGISTRY.SYS") {

                    if (!GAME.signalRecovered) {

                        return "FILE NOT FOUND";
                    }

                }

                return FILESYSTEM.hidden[filename];
            }


            return "FILE NOT FOUND";
        }


        /*
        =========================================
        HIDDEN
        =========================================
        */

        if (GAME.currentDirectory === "HIDDEN") {

            directory = FILESYSTEM.hidden;

            if (!directory[filename]) {

                return "FILE NOT FOUND";
            }


            if (filename === "REGISTRY.SYS") {

                return directory[filename];
            }


            return directory[filename];
        }


        /*
        =========================================
        REGISTRY
        =========================================
        */

        if (GAME.currentDirectory === "REGISTRY") {

            if (!GAME.registryUnlocked) {

                return "ACCESS DENIED";
            }

            directory = FILESYSTEM.registry;

            if (!directory[filename]) {

                return "FILE NOT FOUND";
            }


            /*
            Fragment detection
            */

            if (filename === "FRAGMENT-A.LOG") {

                if (!GAME.keyFragments.includes("7A")) {

                    GAME.keyFragments.push("7A");

                }

            }


            if (filename === "FRAGMENT-B.LOG") {

                if (!GAME.keyFragments.includes("3F")) {

                    GAME.keyFragments.push("3F");

                }

            }


            if (filename === "FRAGMENT-C.LOG") {

                if (!GAME.keyFragments.includes("C1")) {

                    GAME.keyFragments.push("C1");

                }

            }


            if (filename === "FRAGMENT-D.LOG") {

                if (!GAME.keyFragments.includes("99")) {

                    GAME.keyFragments.push("99");

                }

            }


            return directory[filename];
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

Use DIR to refresh the archive.
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
        Normalize the player's input.

        This allows:

        AUTH 7A-3F-C1-99

        or

        AUTH 7A3FC199
        */

        const normalizedKey =
            key
                .toUpperCase()
                .replace(/-/g, "")
                .replace(/\s/g, "");


        /*
        Player must have discovered
        all four fragments.
        */

        if (GAME.keyFragments.length < 4) {

            return `
AUTHORIZATION FAILED

Incomplete authorization key.

Fragments recovered:

${GAME.keyFragments.length}/4
`;
        }


        /*
        Correct Registry key.
        */

        if (normalizedKey !== "7A3FC199") {

            return `
AUTHORIZATION FAILED

INVALID KEY
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

CLEARANCE UPDATED

LEVEL 0
    ↓
LEVEL 1

KEEPER REGISTRY:
UNLOCKED

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

