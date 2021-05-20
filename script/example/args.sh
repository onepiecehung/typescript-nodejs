while getopts u:a:f: flag
do
    case "${flag}" in
        u) username=${OPTARG};;
        a) age=${OPTARG};;
        f) fullname=${OPTARG};;
    esac
done

if $username; then
   username="username_default";
fi

echo "Username: $username";
echo "Age: $age";
echo "Full Name: $fullname";
