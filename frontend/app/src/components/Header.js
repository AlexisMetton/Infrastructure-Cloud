import { useState, useEffect } from "react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../utils/configAPI";

function Header() {
    const navigate = useNavigate();
    const [userRoles, setUserRoles] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchUserRoles = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setUserRoles([]);
                return;
            }

            try {
                const response = await axios.get(`${API_URL}/auth-status`, {
                    headers: { Authorization: token },
                });
                setUserRoles(response.data.user.role);
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
                setUserRoles([]);
            }
        };
        fetchUserRoles();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUserRoles([]);
        setIsAuthenticated(false);
        navigate('/login');
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-black text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <NavLink to="/" className="text-lg font-bold">ANNA</NavLink>
                
                {/* Menu principal */}
                <div className="hidden md:flex space-x-4">
                    {userRoles.includes('ROLE_ADMIN') && (
                        <NavLink to="/admin">Admin</NavLink>
                    )}
                    {(userRoles.includes('ROLE_ADMIN') || userRoles.includes('ROLE_ASSO')) && (
                        <NavLink to="/asso">Asso</NavLink>
                    )}
                    <NavLink to="/recherche">Recherche</NavLink>
                    <NavLink to="/full">Full</NavLink>
                    <NavLink to="/normal">Normal</NavLink>
                    <NavLink to="/short">Short</NavLink>
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="mr-4">Déconnexion</button>
                    ) : (
                        <NavLink to="/login" className="mr-4">Se connecter</NavLink>
                    )}
                </div>

                {/* Icône menu burger pour mobile */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle menu">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* Menu déroulant mobile */}
                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center space-y-4 py-4 md:hidden">
                        {userRoles.includes('ROLE_ADMIN') && (
                            <NavLink to="/admin" className="mr-4">Admin</NavLink>
                        )}
                        {(userRoles.includes('ROLE_ADMIN') || userRoles.includes('ROLE_ASSO')) && (
                            <NavLink to="/asso" className="mr-4">Asso</NavLink>
                        )}
                        <NavLink to="/recherche" className="mr-4">Recherche</NavLink>
                        <NavLink to="/full" className="mr-4">Full</NavLink>
                        <NavLink to="/normal" className="mr-4">Normal</NavLink>
                        <NavLink to="/short" className="mr-4">Short</NavLink>
                        {isAuthenticated ? (
                            <button onClick={handleLogout} className="mr-4">Déconnexion</button>
                        ) : (
                            <NavLink to="/login" className="mr-4">Se connecter</NavLink>
                        )}
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header;