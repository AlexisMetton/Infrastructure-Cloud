import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../utils/configAPI";
import { useNavigate } from "react-router-dom"

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/login`, {username, password});
            const { token } = response.data;

            localStorage.setItem('token', token);

            navigate('/');
        } catch (error) {
            setError("Nom d'utilisateur ou mot de passe incorrect.")
        }
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Connexion</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block mb-1">Nom d'utilisateur</label>
                    <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Mot de passe</label>
                    <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Se connecter</button>
            </form>
        </div>
    )
}

export default Login;