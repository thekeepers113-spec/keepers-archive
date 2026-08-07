const GAME = {

    scanUnlocked: false,
    signalRecovered: false,

    loggedIn: false,
    clearance: 0,
    user: "RECOVERY-01",

    discoveredFiles: [],

    registryUnlocked: false,
    registryAuthorized: false,

    currentDirectory: "ROOT",

    keyFragments: []

};

const FILESYSTEM = {

    root: {

        "README.TXT": `
KEEPER ARCHIVE

Recovery Terminal v1.13

Your assignment is simple.

Locate and recover Echo 001.

Use the available terminal commands
to inspect archive records.

Some files have been intentionally
removed from the directory index.

If something appears to be missing...

keep searching.
`,

        "STATUS.LOG": `
SYSTEM STATUS

ARCHIVE .............. ONLINE

TARGET ............... ECHO 001

STATUS ............... MISSING

SIGNAL STRENGTH ...... 17%

CLEARANCE ............ LEVEL 0

NOTICE

Directory listings
cannot always be trusted.
`,

        "OPERATIONS.LOG": `
SYSTEM OPERATIONS

Maintenance Report

Date:
1989-11-18

Archive index corruption detected.

Directory tables may omit
recoverable records.

If standard retrieval fails,
perform a storage scan.

Report Complete.
`,

        "ECHO001.TXT": `
ECHO RECORD

Designation:
Echo 001

Status:
MISSING

Recovery Priority:
MAXIMUM

Last Known Transmission:

Connection terminated
unexpectedly.

Signal unavailable.
`,

        "NOTES.TXT": `
FIELD NOTES

People stop searching
once DIR reports
there are no more files.

The archive never lies.

The index sometimes does.
`

    },

    hidden: {

        "SIGNAL.DAT": `
RECOVERED SIGNAL

RECOVERY NODE:
K-113

PACKET:
001

BEGIN TRANSCRIPT

"...this is Echo 001...

If this archive has been opened,
then containment failed.

The directory is incomplete.

The Keepers removed records,
not data.

If you can read this...

find the Registry.

Do NOT reconnect me.

...they're watching..."

END OF TRANSMISSION

SIGNAL LOST
`,

        "REGISTRY.SYS": `
KEEPER REGISTRY

STATUS:
LOCKED

NOTICE

Registry access requires
a valid Authorization Key.

Authentication credentials
are no longer accepted.

Authorization fragments
remain stored within
the archive.

Locate every fragment.

Reconstruct the key.

Then authenticate.

ERROR:
ACCESS DENIED
`

    },

    registry: {

        "NOTICE.LOG": `
KEEPER NOTICE

Following the archive failure,
all Registry authorization keys
were divided into four fragments.

No single archive record contains
a complete key.

This procedure prevents
unauthorized Registry access.
`,

        "STAFF.LOG": `
KEEPER PERSONNEL

RECOVERY-01
Recovery Unit
STATUS: ACTIVE

KEEPER-07
Archive Supervisor
STATUS: MISSING

ADMIN
System Administrator
STATUS: ARCHIVED

DIRECTOR
Facility Director
STATUS: UNKNOWN

Personnel records
may be incomplete.
`,

        "PERSONNEL.DAT": `
PERSONNEL DATABASE

RECOVERY-01

Assignment:
Recovery Unit

Memory Status:
PURGED

Original Identity:
REDACTED

Recovery personnel receive
replacement identities before
deployment.
`,

        "AUTH.LOG": `
AUTHORIZATION REPORT

Registry Key fragmented.

Fragment Count:
4

Recovery Required:
YES

Authorized users must
reconstruct the complete key
before Registry access
can be granted.
`,

        "FRAGMENT-A.LOG": `
AUTHORIZATION FRAGMENT

7A
`,

        "FRAGMENT-B.LOG": `
AUTHORIZATION FRAGMENT

3F
`,

        "FRAGMENT-C.LOG": `
AUTHORIZATION FRAGMENT

C1
`,

        "FRAGMENT-D.LOG": `
AUTHORIZATION FRAGMENT

99
`,

        "PROJECT-ECHO.LOG": `
PROJECT ECHO

SUBJECT INDEX

001
002
003
004
005

STATUS

CLASSIFIED

Only authorized personnel
may access complete records.
`,

        "RECOVERY-01.DAT": `
RECOVERY PROFILE

Designation:
RECOVERY-01

Assignment:
Recovery Unit

Memory:
PURGED

Original Identity:
REDACTED

Status:
ACTIVE
`

    }

};

const USERS = {

    "RECOVERY-01": {

        password: "ECHO113",

        clearance: 0

    }

};
