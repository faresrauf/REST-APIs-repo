const bcrypt = require('bcrypt');

const usersCredentials = [
    {
        username: "Rauf",
        password: "$2a$10$Eh9UNbwlpClzRfzQ9OmNNeKcSxFdMdlE2XlQUxotRSh.0dE57X.hW",
        role: "admin"
    },
    {
        username: "Fares",
        password: "$2a$10$YH8b/Ir52sRt1beFVJRFL.u9QMYkUjGo7egpEjIzCa.fbjmcYeOpO",
        role: "normal"
    }
];

function validateCredentials(userCredentials) {
    const userFound = usersCredentials.find(user => user.username === userCredentials.username);
    return bcrypt.compareSync(userCredentials.password, userFound.password);
}

function getUserRole(username) {
    const userFound = usersCredentials.find(user => user.username === username);
    return userFound?.role ?? 'User not found';
}

module.exports = {
    validateCredentials,
    getUserRole
}