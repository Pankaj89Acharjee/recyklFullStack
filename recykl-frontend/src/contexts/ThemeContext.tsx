import { useState, useEffect, createContext, useContext } from 'react';
import type { FC, ReactNode } from 'react'
import type { ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'system');

    useEffect(() => {
        const root = window.document.documentElement;
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const currentTheme = theme === 'system' ? systemTheme : theme;

        root.classList.remove('light', 'dark');
        root.classList.add(currentTheme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
