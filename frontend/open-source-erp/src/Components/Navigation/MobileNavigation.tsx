import React from 'react';
import { pageTree } from '../../router/pages';
import NavButton from './NavButton';
import { NavigationProps } from './Navigation';
import { useTheme } from '../../hooks/useTheme';

const MobileNavigation: React.FC<NavigationProps> = ({
  showNav,
  closeNavIfOpen,
}) => {
  const { getColorClasses } = useTheme();
  const primary = getColorClasses('primary');
  const navLinks = pageTree.map((page, index) => {
    return page.navbar ? (
      <NavButton
        icon={page.icon}
        key={index}
        to={page.path}
        name={page.name}
        showNav={showNav}
        closeNavIfOpen={closeNavIfOpen}
        children={page.children}
      />
    ) : null;
  });

  return (
    <>
      <div
        className={` ${primary} mt-16 fixed top-0 left-0 h-full z-40 transform ${
          showNav ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out bg-white`}
        style={{ width: '250px' }}
      >
        <nav>{navLinks}</nav>
      </div>

      {showNav && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30"
          onClick={closeNavIfOpen}
        ></div>
      )}
    </>
  );
};

export default MobileNavigation;
