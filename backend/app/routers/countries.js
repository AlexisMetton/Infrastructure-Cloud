const express = require("express");
const assoRouter = express.Router();
const authMiddleware = require("../services/authentication/auth");
const roleVerif = require("../services/roles/roleVerif");
const readCountries = require("../services/bdd/readCountries");
const updateCountries = require("../services/bdd/updateCountries");

assoRouter.post('/search', (req, res) => {
    const { name, cca2 } = req.body;

    const filteredCountries = readCountries().filter(country => {
        const countryName = country.name.common ? country.name.common.toLowerCase() : "";
        const countryCca2 = country.cca2 ? country.cca2.toLowerCase() : "";

        return (!name || countryName.includes(name.toLowerCase())) &&
               (!cca2 || countryCca2.includes(cca2.toLowerCase()));
    });

    res.json(filteredCountries);
})

assoRouter.use('/', authMiddleware);
assoRouter.use('/', roleVerif(["ROLE_ADMIN", "ROLE_ASSO"]));

assoRouter.get('/', (req, res) => {
    res.json(readCountries());
})

assoRouter.put('/:cca2', (req, res) => {
    const { cca2 } = req.params;
    const updatedData = req.body;

    const updatedCountry = updateCountries(cca2, updatedData);
    res.json(updatedCountry);
});

module.exports = assoRouter;