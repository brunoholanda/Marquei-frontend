import api from 'components/api/api';
import React, { createContext, useState, useEffect, useContext } from 'react';

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
            const response = await api.get('/auth/company-log-details');
            if (response.status >= 200 && response.status < 300) {
                const { company_id, user_specialties } = response.data;
                setAuthData({ authToken: token, companyID: company_id, userSpecialties: user_specialties });
            } else if (response.status === 401) { 
                logout(); 
            } else {
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
        window.location = '/#login'; 
    };

    return (
        <AuthContext.Provider value={{ authData, updateAuthData, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
