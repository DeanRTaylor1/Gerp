import React from 'react';
import { useTheme } from '../../hooks/useTheme';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
    const { getColorClasses } = useTheme()
    const primary = getColorClasses('primary')
    return (
        <div className={`min-w-fit max-w-full w-full p-4 shadow-md rounded-lg ${className} ${primary}`}>
            {children}
        </div>
    );
};

export default Card;
