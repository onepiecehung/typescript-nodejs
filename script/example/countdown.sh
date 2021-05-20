#/bin/ksh


secs=$((5 * 60))
while [ $secs -gt 0 ]; do
   echo -ne "Excute: $secs\033[0K\r"
   sleep 1
   : $((secs--))
done
