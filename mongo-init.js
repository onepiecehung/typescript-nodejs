db.createUser({
    user: "appts",
    pwd: "appts2022",
    roles: [
        {
            role: "readWrite",
            db: "appts",
        },
    ],
});
