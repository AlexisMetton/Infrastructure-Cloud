const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/users.json");

function updateUserRoles(userId, updatedRoles) {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    userId = parseInt(userId, 10);

    const userIndex = data.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        throw new Error("Utilisateur non trouvé.");
    }

    data[userIndex].role = updatedRoles;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    return data[userIndex];
}

module.exports = updateUserRoles;
