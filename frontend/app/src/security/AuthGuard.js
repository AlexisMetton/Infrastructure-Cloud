import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../utils/configAPI';

function AuthGuard({ children }) {
    const [authChecked, setAuthChecked] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setAuthChecked(true);
                return;
            }
            try {
                await axios.get(`${API_URL}/auth-status`, {
                    headers: { Authorization: token },
                });
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setAuthChecked(true);
            }
        };
        checkAuthStatus();
    }, []);
  
    if (!authChecked) return null;
  
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default AuthGuard;