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
```javascript
registry: {

    "NOTICE.LOG": `
KEEPER REGISTRY

ACCESS PROTOCOL

Following the 1989 archive failure,
Registry authorization was divided
into multiple records.

No single record contains
the complete authorization.

NOTICE:

Do not search by filename.

Search by event.

The last known Registry breach
occurred at:

08:14
`,

    "AUDIT.LOG": `
ARCHIVE AUDIT

DATE:
1989-11-18

08:02
Routine maintenance.

08:07
Archive index synchronization.

08:14
UNAUTHORIZED ACCESS DETECTED.

08:15
Security response initiated.

08:19
Registry access terminated.

08:22
Keeper-07 reported missing.

--------------------------------

NOTE:

The system recorded no valid
credential at 08:14.

Someone entered without logging in.
`,

    "CAMERAS.LOG": `
SECURITY CAMERA REPORT

CAMERA 01

08:13
Normal.

08:14
SIGNAL LOST.

08:15
SIGNAL RESTORED.


CAMERA 02

08:13
Normal.

08:14
Normal.

08:15
Normal.


CAMERA 03

08:13
Normal.

08:14
ARCHIVE CORRUPTION.

08:15
Normal.


CAMERA 04

08:13
Normal.

08:14
SUBJECT DETECTED.

08:15
SUBJECT GONE.

--------------------------------

CAMERA 04 RECORD:

SUBJECT:
KEEPER-07

TIME:
08:14
`,

    "KEEPER-07.DAT": `
PERSONNEL RECORD

DESIGNATION:
KEEPER-07

ROLE:
ARCHIVE SUPERVISOR

STATUS:
MISSING

LAST VERIFIED LOCATION:

REGISTRY ACCESS CORRIDOR

TIME:
08:14

--------------------------------

PERSONAL NOTE

If the Registry ever reports
an unauthorized entry at 08:14,

do not trust the first record.

The system clock was altered.

Compare the security records
before attempting recovery.
`,

    "SECURITY.LOG": `
SECURITY SYSTEM

TIME SYNCHRONIZATION REPORT

1989-11-18

PRIMARY CLOCK:
08:14

SECONDARY CLOCK:
08:17

ARCHIVE CLOCK:
08:11

--------------------------------

CLOCK DISCREPANCY DETECTED.

Three systems recorded
the same event differently.

Original event time:

UNKNOWN

--------------------------------

RECOVERY NOTE:

The correct record can be found
by comparing the three clocks.

08:11
08:14
08:17

Difference:

3 minutes
`,

    "MAINTENANCE.LOG": `
MAINTENANCE REPORT

TECHNICIAN:
M. VALE

SYSTEM:
REGISTRY SECURITY

ISSUE:
Clock synchronization failure.

CORRECTED:
NO

REASON:

Manual correction prohibited
during active containment.

--------------------------------

TECHNICIAN NOTE

The corrupted time isn't random.

Someone moved the archive clock
exactly three minutes.

Check the records surrounding
the 08:14 incident.

The first useful number is hidden
in the correction interval.
`,

    "INDEX.LOG": `
REGISTRY INDEX

The following records were accessed
during the 08:14 incident:

AUDIT.LOG
CAMERAS.LOG
KEEPER-07.DAT
SECURITY.LOG
MAINTENANCE.LOG

--------------------------------

ONE ADDITIONAL RECORD WAS ACCESSED.

Record name:
████████████

Status:
REMOVED

Recovery status:
POSSIBLE
`,

    "RECOVERY.LOG": `
RECOVERY REPORT

Removed record partially recovered.

Original filename:

AUTHORIZATION.DAT

Contents:

[DATA CORRUPTED]

Recovered bytes:

7A

Remaining data unavailable.

--------------------------------

RECOVERY NODE:
K-113

PACKET:
002
`,

    "PACKET-002.DAT": `
RECOVERED PACKET

SOURCE:
KEEPER-07

TIME:
08:17

MESSAGE:

"If you're reading this,
the first fragment survived.

The clock was changed because
the original authorization event
was supposed to disappear.

Three minutes.

Remember that number.

The next record is not where
the index says it is."
`,

    "ARCHIVE-MAP.LOG": `
ARCHIVE MAP

STANDARD INDEX:

SECURITY
AUDIT
PERSONNEL
MAINTENANCE

--------------------------------

CORRUPTED ENTRY:

08:17

MAPPED DESTINATION:

ARCHIVE / RECOVERY

--------------------------------

WARNING

Recovered records may appear
under their packet number rather
than their original filename.
`,

    "PACKET-003.DAT": `
RECOVERED PACKET

SOURCE:
UNKNOWN

PACKET:
003

CONTENT:

3F

--------------------------------

END PACKET
`,

    "PACKET-004.DAT": `
RECOVERED PACKET

SOURCE:
KEEPER ARCHIVE

PACKET:
004

CONTENT:

C1

--------------------------------

NOTE:

Do not combine fragments
until all packets are recovered.
`,

    "PACKET-005.DAT": `
RECOVERED PACKET

SOURCE:
UNKNOWN

PACKET:
005

CONTENT:

99

--------------------------------

FINAL PACKET

The Registry key was never
stored as one complete value.

It was reconstructed
from the recovered packets.

Order is determined by
packet number.

002
003
004
005
`,

    "PROJECT-ECHO.LOG": `
PROJECT ECHO

SUBJECT INDEX

001
002
003
004
005

STATUS:

CLASSIFIED

--------------------------------

SUBJECT 001

Containment:
FAILED

Transmission:
RECOVERED

--------------------------------

SUBJECT 002

Containment:
STABLE

--------------------------------

SUBJECT 003

Record:
REMOVED

--------------------------------

SUBJECT 004

Record:
REMOVED

--------------------------------

SUBJECT 005

Record:
REMOVED

--------------------------------

NOTICE

Subject numbers and packet
numbers are unrelated.

Do not assume otherwise.
`,

    "PERSONNEL.DAT": `
PERSONNEL DATABASE

RECOVERY-01

Assignment:
RECOVERY UNIT

Memory:
PURGED

Original Identity:
REDACTED

Status:
ACTIVE

--------------------------------

KEEPER-07

Assignment:
ARCHIVE SUPERVISOR

Status:
MISSING

--------------------------------

ADMIN

Assignment:
SYSTEM ADMINISTRATION

Status:
ARCHIVED

--------------------------------

DIRECTOR

Assignment:
FACILITY DIRECTOR

Status:
UNKNOWN
`

}
```

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


