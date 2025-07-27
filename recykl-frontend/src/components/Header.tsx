import { Sun, Moon, Monitor, Power } from 'lucide-react';
import type { FC } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export const Header: FC = () => {
    const { user, logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const getRole = localStorage.getItem('role');

    console.log("User role is", user);
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Device Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 rounded-lg p-1 bg-gray-200 dark:bg-gray-700">
                            <button onClick={() => setTheme('light')} className={`p-1.5 rounded-md ${theme === 'light' ? 'bg-white dark:bg-gray-600' : ''}`}><Sun size={18} /></button>
                            <button onClick={() => setTheme('dark')} className={`p-1.5 rounded-md ${theme === 'dark' ? 'bg-white dark:bg-gray-900' : ''}`}><Moon size={18} /></button>
                            <button onClick={() => setTheme('system')} className={`p-1.5 rounded-md ${theme === 'system' ? 'bg-white dark:bg-gray-600' : ''}`}><Monitor size={18} /></button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700 dark:text-gray-300 hidden sm:block">{user?.role?.toUpperCase() ??  getRole?.toUpperCase()}</span>
                            <button onClick={logout} className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                                <Power size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};