import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../utils/configAPI";

function Short() {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        fetchCountries();
    }, [])

    const fetchCountries = async () => {
        try {
            const response = await axios.get(`${API_URL}/short`);
            setCountries(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des pays en version short :", error);
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Informations Brèves des Pays</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {countries.map((country, index) => (
                <div key={index} className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
                <img 
                    src={country.flag} 
                    alt={`Drapeau de ${country.name.common}`} 
                    className="w-20 h-12 mb-2 object-cover"
                />
                <h2 className="font-bold text-lg">{country.name.common}</h2>
                <p>Code CCA2 : {country.cca2}</p>
                <p>Code CCA3 : {country.cca3}</p>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Short;