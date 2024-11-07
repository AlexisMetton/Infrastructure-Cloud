const fs = require('fs');

function readCountries() {
    const rawData = fs.readFileSync('./data/countries.json', 'utf8');
    const countries = JSON.parse(rawData);
    return countries;
}


module.exports = readCountries;