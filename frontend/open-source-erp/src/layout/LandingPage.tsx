import React, { useEffect } from "react";
import { useTheme } from "../hooks/useTheme";

interface LandingPageProps {
    children: React.ReactNode
}
const LandingPage: React.FC<LandingPageProps> = ({ children }) => {
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        toggleTheme()
    }, [])
    return (
        <div className={`${theme}`}>
            {children}
        </div>
    );
};

export default LandingPage;
