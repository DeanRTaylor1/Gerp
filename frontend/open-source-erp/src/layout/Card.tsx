import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface CardProps {
  children: React.ReactNode;
  overrideClasses?: string;
}

//Dashboard components should be put inside a card.

const Card: React.FC<CardProps> = ({ children, overrideClasses }) => {
  const { getColorClasses } = useTheme();
  const primary = getColorClasses('primary');
  const defaultClasses = `max-w-full w-full h-fit p-4 shadow-md rounded-lg`;
  return (
    <div
      className={`${
        overrideClasses ? overrideClasses : defaultClasses
      } ${primary}`}
    >
      {children}
    </div>
  );
};

export default Card;
