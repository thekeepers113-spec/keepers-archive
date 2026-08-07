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

    hidden: {

        "SIGNAL.DAT": `
RECOVERED SIGNAL
----------------------------

Transmission Fragment

"...if anyone finds this...

do NOT trust the index...

there are more of us..."

SIGNAL LOST

`

    }

};
