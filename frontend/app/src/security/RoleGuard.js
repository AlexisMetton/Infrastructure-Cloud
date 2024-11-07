import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../utils/configAPI';

function RoleGuard({ children, allowedRoles }) {
    const [authChecked, setAuthChecked] = useState(false);
    const [hasAccess, setHasAccess] = useState(null);

    useEffect(() => {
        const checkRoleAccess = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setAuthChecked(true);
                setHasAccess(false);
                return;
            }
    
            try {
                const response = await axios.get(`${API_URL}/auth-status`, {
                    headers: { Authorization: token },
                });
                const userRoles = response.data.user.role;
                const isAllowed = allowedRoles.some(role => userRoles.includes(role));
                setHasAccess(isAllowed);
            } catch (error) {
                setHasAccess(false);
            } finally {
                setAuthChecked(true);
            }
        };
        checkRoleAccess();
    }, [allowedRoles]);
  
    if (!authChecked) return null;
  
    return hasAccess ? children : <Navigate to="/" />;
}
  
export default RoleGuard;