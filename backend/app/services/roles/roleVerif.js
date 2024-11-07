const roleVerif = (roles) => (req, res, next) => {
    const { role } = req.user;
    const hasRole = roles.some(r => role.includes(r));
    if(!hasRole) {
        return res.status(403).json({ message: "Accès refusé: rôle insuffisant" })
    }
    next();
}

module.exports = roleVerif;