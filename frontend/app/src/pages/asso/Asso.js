import React from "react";
import axios from "axios";
import API_URL from "../../utils/configAPI";
import { useState } from "react";
import { useEffect } from "react";

function Asso() {
    const [countries, setCountries] = useState([]);
    const [editingCountry, setEditingCountry] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetchCountries();
    } , [])

    const fetchCountries = async () => {
        let token = localStorage.getItem('token');

        try {
            const response = await axios.get(`${API_URL}/countries`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            setCountries(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des pays en version full :", error);
        }
    }

    const handleEditClick = (country) => {
        setEditingCountry(country);
    };

    const handleSave = async () => {
        let token = localStorage.getItem('token');

        const response = await axios.put(`${API_URL}/countries/${editingCountry.cca2}`, editingCountry, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setCountries((prevCountries) =>
            prevCountries.map((country) =>
                country.cca2 === editingCountry.cca2 ? response.data : country
            )
        );
        setEditingCountry(null);

        setSuccessMessage("Modification réussie !");
    };
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Bienvenu sur votre interface de membre de l'association</h1>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Pays</h2>
            {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
                    {successMessage}
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 text-left">
                            <th className="py-3 px-4 font-semibold">Nom</th>
                            <th className="py-3 px-4 font-semibold">Code</th>
                            <th className="py-3 px-4 font-semibold">Modifier</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map(country => (
                            <tr key={country.cca2} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 text-gray-800">{country.name.common}</td>
                                <td className="py-2 px-4 text-gray-600">{country.cca2}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => handleEditClick(country)}
                                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        Modifier
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editingCountry && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
                        <h3 className="text-lg font-semibold mb-4">
                            Modifier {editingCountry.name.common}
                        </h3>
                        <input
                            type="text"
                            value={editingCountry.name.common}
                            onChange={(e) =>
                                setEditingCountry({
                                    ...editingCountry,
                                    name: { ...editingCountry.name, common: e.target.value },
                                })
                            }
                            className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setEditingCountry(null)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Asso;