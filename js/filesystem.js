```javascript
/*
=========================================
KEEPER OS
filesystem.js
=========================================
*/

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

    /*
    =========================================
    ROOT DIRECTORY
    =========================================
    */

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


    /*
    =========================================
    HIDDEN DIRECTORY
    =========================================
    */

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


    /*
    =========================================
    KEEPER REGISTRY
    =========================================
    */

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

};


/*
=========================================
USER DATABASE
=========================================
*/

const USERS = {

    "RECOVERY-01": {

        password: "ECHO113",

        clearance: 0

    }

};
```

