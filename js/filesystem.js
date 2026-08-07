/*
=========================================
KEEPER OS
Virtual File System
=========================================
*/

const GAME = {

    scanUnlocked: false,
    signalRecovered: false,

    discoveredFiles: []

};

const FILESYSTEM = {

    root: {

        "README.TXT": `
KEEPER ARCHIVE
----------------------------

Recovery Terminal v1.13

Your assignment:

Recover Echo 001.

Standard archive commands
are available.

Read everything.

Some files were intentionally
removed from the directory.

`,

        "STATUS.LOG": `
SYSTEM STATUS
----------------------------

Archive ............ ONLINE

Echo 001 ........... MISSING

Signal Strength .... 17%

Recovery Clearance . LEVEL 0

NOTICE:

Directory listings
cannot always be trusted.

`,

        "OPERATIONS.LOG": `
SYSTEM OPERATIONS
----------------------------

Maintenance Report
1989-11-18

Index corruption detected.

Directory table may omit
recoverable records.

If standard retrieval fails,
perform a storage scan.

`,

        "ECHO001.TXT": `
ECHO RECORD
----------------------------

Designation:
Echo 001

Status:
MISSING

Recovery Priority:
MAXIMUM

Last known transmission
terminated unexpectedly.

`,

        "NOTES.TXT": `
FIELD NOTES
----------------------------

People stop searching
once DIR says there
are no more files.

The archive never lies.

The index sometimes does.

`

    },

    hidden: {"REGISTRY.SYS": `
KEEPER REGISTRY

ACCESS LEVEL:
RESTRICTED

Use LOGIN to authenticate.

`
        "SIGNAL.DAT": `
RECOVERED SIGNAL
=================================

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

`

    }

};
