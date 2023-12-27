import React, { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import Navigation from '../Components/Navigation/Navigation';
import TopBar from '../Components/Navigation/TopBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, getColorClasses, toggleTheme } = useTheme();
  const primary = getColorClasses('primary');
  const secondary = getColorClasses('secondary');
  const [showNav, setShowNav] = useState<boolean>(false);

  useEffect(() => {
    toggleTheme();
  }, []);

  const closeNavIfOpen = () => {
    if (showNav) {
      setShowNav(false);
    }
  };

  const openNav = () => {
    const navStatus = showNav;

    setShowNav(!navStatus);
  };

  return (
    <div className={`${theme} flex h-screen min-h-screen`}>
      {/* Top Bar */}
      <div
        className={`w-full ${primary} fixed top-0 left-0 h-12 flex items-center z-10`}
      >
        <TopBar openNav={openNav} closeNavIfOpen={closeNavIfOpen} />
      </div>
      {/* Sidebar */}
      <Navigation showNav={showNav} closeNavIfOpen={closeNavIfOpen} />
      {/* Content Area */}
      <div
        className={`content flex flex-wrap items-start justify-start p-6 pt-14 gap-6 w-full ${secondary}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
