const { hashSync } = require("bcrypt");

const users = [
    {
        name: "Admin",
        email: "admin@gmail.com",
        password: hashSync("admin786", 8),
        isAdmin: true
    },
    {
        name: "Faisal",
        email: "faisal@gmail.com",
        password: hashSync("faisal786", 8),
        isAdmin: false
    },
    {
        name: "Harsha",
        email: "harsha@gmail.com",
        password: hashSync("harsha786", 8),
        isAdmin: false
    },
    {
        name: "Faizan",
        email: "faizan@gmail.com",
        password: hashSync("faizan786", 8),
        isAdmin: false
    },
];

module.exports = users;