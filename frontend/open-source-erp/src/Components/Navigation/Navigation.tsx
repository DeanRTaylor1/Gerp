import React, { useMemo } from 'react';
import { pageTree } from '../../router/pages';
import NavButton from './NavButton';
import { useTheme } from '../../hooks/useTheme';

export interface NavigationProps {
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
    [showNav, closeNavIfOpen]
  );

  return (
    <div
      className={`fixed mt-16 ${primary} ${
        showNav
          ? 'min-w-72 w-72 z-50 pt-1 h-full'
          : 'pt-1 w-16 space-y-6 inset-y-0 left-0 transform -translate-x-full  md:shadow-md md:translate-x-0'
      } pl-2 transition-all duration-200 ease-in-out z-50 hidden md:block `}
    >
      <nav className="relative max-w-72">{navLinks}</nav>
    </div>
  );
};

export default Navigation;
