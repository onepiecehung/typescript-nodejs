#!/bin/bash

# TODO: This script executes restore MongoDB on Ubuntu 20.x, make sure to understand it before the run

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

# TODO: SETUP VAR

ARGS=$(getArgs "$@")

host=$(echo "$ARGS" | getNamedArg host)
port=$(echo "$ARGS" | getNamedArg port)
username=$(echo "$ARGS" | getNamedArg username)
password=$(echo "$ARGS" | getNamedArg password)
db=$(echo "$ARGS" | getNamedArg db)
dir=$(echo "$ARGS" | getNamedArg dir)
buckets3=$(echo "$ARGS" | getNamedArg buckets3)

if [ -z "$host" ]; then
    host="127.0.0.1"
fi

if [ -z "$port" ]; then
    port="27017"
fi

if [ -z "$username" ]; then
    username="root"
fi

if [ -z "$password" ]; then
    password="root"
fi

if [ -z "$db" ]; then
    db="test"
fi

secs=$((5))
while [ $secs -gt 0 ]; do
    echo -ne "  Restore MongoDB begin in : ${secs}s \033[0K\r"
    sleep 1
    : $((secs--))
done

if [ -z "$dir" ]; then
    echo "Please setup path file backup"
else
    mongorestore --host=$host --port=$port --username=$username --password=$password --archive=${dir} --gzip --nsInclude="${db}.*"
fi
