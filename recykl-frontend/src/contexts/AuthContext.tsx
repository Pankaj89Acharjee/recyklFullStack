import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import type { FC, ReactNode } from 'react'
import { usrApi } from '../api/userApi';
import type { User, AuthContextType } from '../types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [userRole, setUserRole] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            setUserRole(null);
            setLoading(false);
            return;
        }
        setLoading(false);
    }, [token]);

    const login = async (email: string, password: string) => {
        const response = await usrApi.loginAPI(email, password);
        if (response.token) {
            setToken(response.token);
            setUserRole({ role: response.role, email: response.email });
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('role', response.role);
            localStorage.setItem('role', response.role);
            return { success: true, role: response.role, email: response.email };
        }
        if (!response.success) {
            toast.error(response.message || "Login failed");
            return { success: false, message: response.message };
        }
        return { success: false, message: response.message };
    };

    const logout = () => {
        setUserRole(null);
        setToken(null);
        navigate('/')
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
    };

    const authContextValue = useMemo(() => ({ user: userRole, token, login, logout, isAuthenticated: !!token }), [userRole, token]);

    if (loading) {
        return <div className="h-screen w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div></div>;
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};