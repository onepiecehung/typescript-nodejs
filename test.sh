#!/bin/bash

function main() {
    ARGS=`getArgs "$@"`

    a1=`echo "$ARGS" | getNamedArg a1`
    a2=`echo "$ARGS" | getNamedArg a2`
    a3=`echo "$ARGS" | getNamedArg a3`
    a4=`echo "$ARGS" | getNamedArg a4`
    a5=`echo "$ARGS" | getNamedArg a5`
    a6=`echo "$ARGS" | getNamedArg a6`
    a7=`echo "$ARGS" | getNamedArg a7`

    echo "a1 = \"$a1\""
    echo "a2 = \"$a2\""
    echo "a3 = \"$a3\""
    echo "a4 = \"$a4\""
    echo "a5 = \"$a5\""
    echo "a6 = \"$a6\""
    echo "a7 = \"$a7\""

    exit 0
}


function getArgs() {
    for arg in "$@"; do
        echo "$arg"
    done
}


function getNamedArg() {
    ARG_NAME=$1

    sed --regexp-extended --quiet --expression="
        s/^--$ARG_NAME=(.*)\$/\1/p  # Get arguments in format '--arg=value': [s]ubstitute '--arg=value' by 'value', and [p]rint
        /^--$ARG_NAME\$/ {          # Get arguments in format '--arg value' ou '--arg'
            n                       # - [n]ext, because in this format, if value exists, it will be the next argument
            /^--/! p                # - If next doesn't starts with '--', it is the value of the actual argument
            /^--/ {                 # - If next do starts with '--', it is the next argument and the actual argument is a boolean one
                # Then just repla[c]ed by TRUE
                c TRUE
            }
        }
    "
}


main "$@"
