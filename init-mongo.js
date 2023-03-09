db.createUser(
    {
        user: "user",
        pwd: "DHBW",
        roles: [
            {
                role: "readWrite",
                db: "Recipes"
            }
        ]
    }
);
db.createCollection("test"); //MongoDB creates the database when you first store data in that database