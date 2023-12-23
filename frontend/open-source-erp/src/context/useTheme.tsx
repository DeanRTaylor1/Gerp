import { createContext, useState, useEffect, ReactNode } from 'react';
import { themes } from './themes';



interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: 'light', toggleTheme: () => { } });


interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const getSystemThemePreference = () => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? themes.DARK
            : themes.LIGHT;
    };

    const [theme, setTheme] = useState(getSystemThemePreference());

    const toggleTheme = () => {
        const newTheme = theme === themes.LIGHT ? themes.DARK : themes.LIGHT;
        setTheme(newTheme);
        try {
            window.localStorage.setItem('color-scheme', newTheme);
        } catch (error) {
            console.error("Could not save theme preference:", error);
        }
    };

    useEffect(() => {
        const savedTheme = window.localStorage.getItem('color-scheme') as themes;
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e: MediaQueryListEvent) => {
                setTheme(e.matches ? themes.DARK : themes.LIGHT);
            };

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, []);


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
