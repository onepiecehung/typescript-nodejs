#!/bin/bash

# TODO: This script executes auto-backup MongoDB on Ubuntu 20.x, make sure to understand it before the run

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

folder="backupMongoDB"
name=$(date +%F-%H%M.v%S)

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

if [ -z "$dir" ]; then
    dir="/home/ubuntu/${folder}/${db}-${name}.gz"
fi

# ?: COLOR => https://en.wikipedia.org/wiki/ANSI_escape_code
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "\n${RED}Important! Please make sure what're you doing!!!${NC}\n"

# TODO: Check folder backup

folder="/home/ubuntu/${folder}"
if [ -d "$folder" ]; then
    echo -e "'$folder' found and now backup MongoDB, please wait ...\n"
else
    echo -e "Warning: '$folder' NOT found, create new folder, please wait ...\n"
    mkdir "$folder"
fi

# countdown before begin
secs=$((5))
while [ $secs -gt 0 ]; do
    echo -ne "  Backup MongoDB begin in : ${secs}s \033[0K\r"
    sleep 1
    : $((secs--))
done

# TODO: BACKUP

mongodump --host=$host --port=$port --username=$username --password=$password --forceTableScan --db=$db --archive=$dir --gzip

# TODO: Upload to S3

declare -a arrayFile=()
# search all file in folder
for entry in "$folder"/*; do
    arrayFile+=("$entry")
done

echo -e "\nList backup file"

printf '\nFile: %s\n' "${arrayFile[@]}"

keepFile=$((5))
backupAmount=${#arrayFile[@]}

# TODO: Remove backup file if more than 5 files
if [ "$(expr $backupAmount - $keepFile)" -gt 0 ]; then
    echo -e "\nRemove backup file"
    for ((i = 0; i < "$(expr $backupAmount - $keepFile)"; i++)); do
        sudo rm -rf ${arrayFile[$i]}
        echo -e "\nRemoved on local: ${arrayFile[$i]}"
    done
else
    echo -e "\nNothing to remove"
fi

# TODO: upload to s3
echo -e "\n********** Upload to S3 **********"

if [ -z "$buckets3" ]; then
    echo -e "\nCan't upload backup to s3, cause don't input the bucket name"
    exit
else
    echo -e "\nSync to s3\n"
    aws s3 sync ${folder} s3://${buckets3}/ --delete
fi
