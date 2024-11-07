import React, { useEffect, useState } from "react";
import API_URL from "../utils/configAPI";
import axios from "axios";

function Search() {
    const [cca2, setCca2] = useState(localStorage.getItem("cca2") || "");
    const [name, setName] = useState(localStorage.getItem("name") || "");
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetchSearch();
    }, [cca2, name])

    const fetchSearch = async () => {
        if(cca2 !== null ? cca2.toUpperCase(): "");

        try {
            const response = await axios.post(`${API_URL}/countries/search`, { cca2, name});
            setResults(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération du résultat de la recherche", error);
        }
    }

    const handleCca2Change = (e) => {
        const value = e.target.value.toUpperCase();
        setCca2(value);
        localStorage.setItem("cca2", value);
    }

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        localStorage.setItem("name", value);
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Page de recherche</h1>
            <form className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-10">
                <label className="flex flex-col items-start w-64">
                    <span className="mb-1 text-gray-700">CCA2</span>
                    <input
                        type="text"
                        value={cca2}
                        onChange={handleCca2Change}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Entrez le code CCA2"
                    />
                </label>
                
                <label className="flex flex-col items-start w-64">
                    <span className="mb-1 text-gray-700">Nom du pays</span>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Entrez le nom du pays"
                    />
                </label>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map((result, index) => (
                    <div key={index} className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
                    <img 
                        src={result.flags.png} 
                        alt={`Drapeau de ${result.name.common}`} 
                        className="w-20 h-12 mb-2 object-cover"
                    />
                    <h2 className="font-bold text-lg">{result.name.common}</h2>
                    <p>Code CCA2 : {result.cca2}</p>
                    <p>Code CCA3 : {result.cca3}</p>
                    <p>Capitale : {result.capital}</p>
                    <p>Population : {result.population}</p>
                    <p>Continent : {result.continents[0]}</p>
                    <p>Région : {result.region}</p>
                    <p>Superficie : {result.area} km²</p>
                    <p>Langues : {Object.values(result.languages || {}).join(", ")}</p>
                    <p>Monnaie : {Object.values(result.currencies || {}).map(cur => cur.name).join(", ")}</p>
                    <p>Drapeau : {result.flag}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Search;