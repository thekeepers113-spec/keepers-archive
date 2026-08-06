/*
=========================================
KEEPER OS
Virtual File System
=========================================
*/

const FILESYSTEM = {

    root: {

        "ECHO001.TXT": `
====================================

        ECHO 001

====================================

STATUS:
MISSING

LAST VERIFIED:
UNKNOWN

CLEARANCE:
LEVEL 0

------------------------------------

Recovery Candidate Identified.

The Echo is still transmitting.

Signal integrity:
17%

The Keepers have preserved
everything except the final location.

Only Recovery Personnel may proceed.

Type:

OPEN LOG1.TXT

`,

        "LOG1.TXT": `
====================================

KEEPER LOG 001

====================================

Observation:

Echo 001 disappeared without
warning.

No evidence of termination.

No evidence of escape.

Only silence remained.

Signal fragments have been detected.

Continue investigation.

`,

        "README.TXT": `
====================================

KEEPER ARCHIVE

====================================

Useful Commands

HELP

DIR

OPEN filename

STATUS

WHOAMI

CLS

VER

`,

        "CASEFILES": {

            "CASE01.TXT": `
CASE FILE

Access Restricted

No readable information.

Further clearance required.
`
        },

        "SURVEILLANCE": {

            "CAM01.TXT": `
CAMERA FEED

Video Missing

Only static remains.
`
        }

    }

};
