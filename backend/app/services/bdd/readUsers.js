const fs = require('fs');

function readUsers() {
    const rawData = fs.readFileSync('./data/users.json', 'utf8');
    const users = JSON.parse(rawData);
    return users;
}

module.exports = readUsers;