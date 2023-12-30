import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useCallback, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { IPageTreeItem } from '../../router/pages';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon/index.js';

interface NavButtonProps {
  to?: string;
  name: string;
  icon: string;
  showNav: boolean;
  closeNavIfOpen: () => void;
  children?: Array<IPageTreeItem>;
}

const NavButton: React.FC<NavButtonProps> = React.memo(
  ({ to, name, icon, showNav, closeNavIfOpen, children }) => {
    const location = useLocation();
    const { getColorClasses } = useTheme();
    const [isChildrenVisible, setIsChildrenVisible] = useState(false);
    const [childPaths, setChildPaths] = useState<string[]>([]);

    const isActive = useCallback(
      () => location.pathname === to,
      [location.pathname, to]
    );

    const childIsActive = useCallback(
      () => childPaths.includes(location.pathname),
      [childPaths, location]
    );

    useEffect(() => {
      setIsChildrenVisible(isActive());
    }, [isActive]);

    const activeColors = getColorClasses('primaryInverse');
    const childActiveColors =
      'dark:text-primary-text-dark text-button-hover-text-inactive font-bold  border-r-4 border-primary-inverse-border dark:border-dark-primary-inverse-border';
    const inactiveButtonColors = getColorClasses('inactiveButton');

    const linkClassName = `block py-2.5 px-4 rounded-l transition duration-200 ${
      isActive() ? activeColors : inactiveButtonColors
    }`;

    const parentClassName = `block py-2.5 px-4 rounded-l transition duration-200 ${
      childIsActive() ? childActiveColors : inactiveButtonColors
    }`;

    const toggleChildrenVisibility = () => {
      setIsChildrenVisible((prev) => !prev);
    };

    useEffect(() => {
      const paths =
        children
          ?.map((child) => child.path)
          .filter((path): path is string => !!path) || [];
      setChildPaths(paths);
      if (childIsActive()) {
        setIsChildrenVisible(true);
      }
    }, [children, childIsActive]);

    if (!children && to) {
      return (
        <Link
          to={to}
          className={`${linkClassName} max-w-72 flex gap-2 h-12 justify-left items-center`}
          onClick={closeNavIfOpen}
        >
          <div>
            <SlIcon name={icon} />
          </div>
          <div
            className={`transform ${
              showNav
                ? 'transition-opacity ease-in duration-500 opacity-100'
                : 'opacity-0 hidden '
            }`}
          >
            {name}
          </div>
        </Link>
      );
    } else {
      return (
        <div className="flex flex-col gap-2" onClick={toggleChildrenVisibility}>
          <div
            className={`${parentClassName} flex gap-2 h-12 justify-left items-center cursor-pointer`}
          >
            <div>
              <SlIcon name={icon} />
            </div>
            <div
              className={`w-full flex justify-between items-center transform ${
                showNav
                  ? 'transition-opacity ease-in duration-500 opacity-100'
                  : 'opacity-0 hidden '
              }`}
            >
              <h3>{name}</h3>
              <span
                className={`transition-all ease-out duration-300 ${
                  isChildrenVisible ? 'rotate-0' : '-rotate-90'
                }`}
              >
                <Icon icon="gridicons:dropdown" width={24} height={24} />
              </span>
            </div>
          </div>
          <div
            className={`pl-2 flex flex-col transition-all ease-in-out duration-300 ${
              isChildrenVisible
                ? 'opacity-100 max-h-[1000px] visible'
                : 'opacity-0 max-h-0 invisible'
            }`}
          >
            {children?.map((child, index) => (
              <NavButton
                key={index}
                icon={child.icon}
                to={child.path}
                name={child.name}
                showNav={showNav}
                closeNavIfOpen={closeNavIfOpen}
                children={child.children}
              />
            ))}
          </div>
        </div>
      );
    }
  }
);

export default NavButton;
