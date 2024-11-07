const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/countries.json");

function updateCountry(cca2, updatedData) {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const countryIndex = data.findIndex((country) => country.cca2 === cca2);
    if (countryIndex === -1) {
        throw new Error("Pays non trouvé.");
    }

    data[countryIndex] = { ...data[countryIndex], ...updatedData };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    
    return data[countryIndex];
}

module.exports = updateCountry;
