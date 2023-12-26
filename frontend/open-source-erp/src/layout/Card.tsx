import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

//Dashboard components should be put inside a card. 

const Card: React.FC<CardProps> = ({ children, className }) => {
    const { getColorClasses } = useTheme()
    const primary = getColorClasses('primary')
    return (
        <div className={`max-w-full w-full h-fit p-4 shadow-md rounded-lg ${className} ${primary}`}>
            {children}
        </div>
    );
};

export default Card;
