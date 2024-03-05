import React, { createContext, useState, useEffect, useContext } from 'react';
import { BASE_URL } from 'config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({
        companyID: null,
        authToken: null,
        userSpecialties: [],
    });

    useEffect(() => {
        const authToken = sessionStorage.getItem('authToken');
        if (authToken) {
            setAuthData((prev) => ({ ...prev, authToken }));
            fetchCompanyDetails(authToken);
        }
    }, []);

    const fetchCompanyDetails = async (token) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/company-log-details`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const { company_id, user_specialties } = await response.json();
                setAuthData({ authToken: token, companyID: company_id, userSpecialties: user_specialties });
            } else {
                logout();
                throw new Error('Não foi possível obter os detalhes da empresa.');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const updateAuthData = (data) => {
        setAuthData(data);
        sessionStorage.setItem('authToken', data.authToken);
    };

    const logout = () => {
        setAuthData({ authToken: null, companyID: null, userSpecialties: [] });
        sessionStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ authData, updateAuthData, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
