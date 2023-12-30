import React, { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import Navigation from '../Components/Navigation/Navigation';
import TopBar from '../Components/Navigation/TopBar';
import MobileNavigation from '../Components/Navigation/MobileNavigation';

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
    <div className={`${theme} flex  min-h-screen max-w-screen w-full`}>
      {/* Top Bar */}
      <div
        className={`w-full z-40 border-b-2 border-gray-200 ${primary} fixed top-0 left-0 h-16 flex items-center z-10 shadow-sm`}
      >
        <TopBar openNav={openNav} closeNavIfOpen={closeNavIfOpen} />
      </div>
      {/* Sidebar */}
      <Navigation showNav={showNav} closeNavIfOpen={closeNavIfOpen} />
      <MobileNavigation showNav={showNav} closeNavIfOpen={closeNavIfOpen} />
      {/* Content Area */}
      <div
        className={`content flex flex-wrap items-start justify-center md:justify-start p-6 mt-16 pt-2 gap-6 w-full ${secondary} ${
          showNav ? 'md:ml-16' : 'md:ml-16'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
