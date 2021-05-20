#!/bin/bash

DIR="/home/ubuntu/script_sh/backup"

if [ -d "$DIR" ]; then
   echo "'$DIR' found and now copying files, please wait ..."
else
   echo "Warning: '$DIR' NOT found."
   mkdir "$DIR"
fi


