import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

interface NavButtonProps {
  to: string;
  name: string;
  icon: string;
  showNav: boolean;
  closeNavIfOpen: () => void;
}

const NavButton: React.FC<NavButtonProps> = React.memo(
  ({ to, name, icon, showNav, closeNavIfOpen }) => {
    const location = useLocation();
    const { getColorClasses } = useTheme();

    const isActive = useCallback(
      () => location.pathname === to,
      [location, to]
    );
    const activeColors = getColorClasses('primaryInverse');
    const inactiveButtonColors = getColorClasses('inactiveButton');

    const linkClassName = `block py-2.5 px-4 rounded-l transition duration-200 ${
      isActive() ? activeColors : inactiveButtonColors
    }`;

    return (
      <Link
        to={to}
        className={`${linkClassName} flex gap-2 h-12 justify-left items-center`}
        onClick={closeNavIfOpen}
      >
        <div>
          <Icon icon={icon} width={24} />
        </div>
        <div
          className={`transform ${
            showNav
              ? 'transition-opacity ease-in duration-500 opacity-100'
              : 'opacity-0 xl:opacity-100'
          }`}
        >
          {name}
        </div>
      </Link>
    );
  }
);

export default NavButton;
