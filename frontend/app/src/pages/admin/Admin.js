import React from "react";
import axios from "axios";
import API_URL from "../../utils/configAPI";
import { useState } from "react";
import { useEffect } from "react";

function Admin() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetchUsers();
    } , [])

    const fetchUsers = async () => {
        let token = localStorage.getItem('token');

        try {
            const response = await axios.get(`${API_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            setUsers(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des pays en version full :", error);
        }
    }

    const handleEditClick = (user) => {
        setEditingUser(user);
    };

    const handleRoleChange = (role) => {
        setEditingUser((prevUser) => ({
            ...prevUser,
            role: prevUser.role.includes(role)
                ? prevUser.role.filter(r => r !== role)
                : [...prevUser.role, role]
        }));
    };

    const handleSave = async () => {
        let token = localStorage.getItem('token');
        
        const response = await axios.put(`${API_URL}/users/${editingUser.id}`, { roles: editingUser.role }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === editingUser.id ? response.data : user
            )
        );
        setEditingUser(null);

        setSuccessMessage("Modification réussie !");
    };
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Bienvenu sur votre interface de membre de l'association</h1>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Utilisateurs</h2>
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
                            <th className="py-3 px-4 font-semibold">Rôles</th>
                            <th className="py-3 px-4 font-semibold">Modifier</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 text-gray-800">{user.username}</td>
                                <td className="py-2 px-4 text-gray-600">{user.role.join(", ")}</td>
                                <td className="py-2 px-4">
                                    <button
                                        onClick={() => handleEditClick(user)}
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
            {editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
                        <h3 className="text-lg font-semibold mb-4">
                            Modifier {editingUser.name}
                        </h3>
                        <label className="flex items-center space-x-2 mb-2">
                            <input
                                type="checkbox"
                                checked= {editingUser.role.includes("ROLE_ADMIN")}
                                onChange={() => handleRoleChange("ROLE_ADMIN")}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="text-gray-700">ROLE_ADMIN</span>
                        </label>
                        <label className="flex items-center space-x-2 mb-2">
                            <input
                                type="checkbox"
                                checked={editingUser.role.includes("ROLE_ASSO")}
                                onChange={() => handleRoleChange("ROLE_ASSO")}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="text-gray-700">ROLE_ASSO</span>
                        </label>
                        <label className="flex items-center space-x-2 mb-2">
                            <input
                                type="checkbox"
                                checked={editingUser.role.includes("ROLE_USER")}
                                onChange={() => handleRoleChange("ROLE_USER")}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="text-gray-700">ROLE_USER</span>
                        </label>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setEditingUser(null)}
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

export default Admin;