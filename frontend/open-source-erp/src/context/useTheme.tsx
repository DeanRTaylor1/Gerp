import { createContext, useState, useEffect, ReactNode } from 'react';
import { themes } from './themes';



interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
    getColorClasses: (colorName: string) => string;
    getStyles: (styleName: string) => string;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: 'light', toggleTheme: () => { }, getColorClasses: () => "", getStyles: () => "" });


interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const colorSchemes: { [key: string]: string } = {
        primary: 'bg-white text-primary-text-light dark:bg-dark-primary-inverse-text dark:text-primary-text-dark', //Navbar toolbar
        secondary: `dark:bg-secondary-bg-dark bg-gray-100 dark:text-secondary-text-dark text-secondary-text-light`, // Content background area
        inactiveButton: `dark:hover:text-primary-text-dark hover:text-button-hover-text-inactive  hover:font-bold hover:border-0 hover:border-r-4 hover:border-primary-inverse-border dark:hover:border-dark-primary-inverse-border]`,
        primaryInverse: `bg-primary-inverse-bg text-primary-inverse-text border-0 border-r-4 border-primary-inverse-border dark:border-dark-primary-inverse-border font-bold dark:bg-primary-inverse-bg dark:text-dark-primary-inverse-text`
    }

    const styles: { [key: string]: string } = {
        pageTitle: 'text-2xl font-semibold',
        tableRowHover: `hover:bg-gray-50 dark:hover:bg-[#6D6D6D]`
    }

    const getStyles = (styleName: string): string => {
        return styles[styleName]
    }

    const getColorClasses = (colorName: string): string => {
        return colorSchemes[colorName]
    }

    const getSystemThemePreference = () => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? themes.DARK
            : themes.LIGHT;
    };

    const [theme, setTheme] = useState(getSystemThemePreference());

    const toggleTheme = () => {
        const newTheme = theme === themes.LIGHT ? themes.DARK : themes.LIGHT;
        setTheme(newTheme);
        console.log({ newTheme })
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
        <ThemeContext.Provider value={{ theme, toggleTheme, getColorClasses, getStyles }}>
            {children}
        </ThemeContext.Provider>
    );
};
