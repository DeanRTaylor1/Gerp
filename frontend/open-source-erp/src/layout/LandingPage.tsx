import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface LandingPageProps {
  children: React.ReactNode;
}
const LandingPage: React.FC<LandingPageProps> = ({ children }) => {
  const { theme } = useTheme();

  return <div className={`${theme}`}>{children}</div>;
};

export default LandingPage;
