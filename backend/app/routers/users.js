const express = require("express");
const adminRouter = express.Router();
const authMiddleware = require("../services/authentication/auth");
const roleVerif = require("../services/roles/roleVerif");
const readUsers = require("../services/bdd/readUsers");
const updateUsers = require("../services/bdd/updateUsers");

adminRouter.use('/', authMiddleware);
adminRouter.use('/', roleVerif(["ROLE_ADMIN"]));

adminRouter.get('/', (req, res) => {
    res.json(readUsers());
})

adminRouter.put('/:userId', (req, res) => {
    const { userId } = req.params;
    const updatedRoles = req.body.roles;

    const updatedUser = updateUsers(userId, updatedRoles);
    res.json(updatedUser);
});

module.exports = adminRouter;

