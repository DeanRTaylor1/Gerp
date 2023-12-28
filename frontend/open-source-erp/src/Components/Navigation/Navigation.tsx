import React, { useMemo } from 'react';
import { pageTree } from '../../router/pages';
import NavButton from './NavButton';
import { useTheme } from '../../hooks/useTheme';

interface NavigationProps {
  showNav: boolean;
  closeNavIfOpen: () => void;
}
const Navigation: React.FC<NavigationProps> = ({ showNav, closeNavIfOpen }) => {
  const { getColorClasses } = useTheme();
  const primary = getColorClasses('primary');

  const navLinks = useMemo(
    () =>
      pageTree.map((page, index) => {
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
      }),
    [showNav]
  );

  return (
    <div
      className={` ${primary} ${
        showNav
          ? 'min-w-72 w-72 mt-16 z-50 pt-1'
          : 'pt-1 w-16 xl:w-72 space-y-6 mt-16 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:shadow-md md:translate-x-0'
      }   pl-2 transition-all duration-200 ease-in-out z-50`}
    >
      <nav>{navLinks}</nav>
    </div>
  );
};

export default Navigation;
