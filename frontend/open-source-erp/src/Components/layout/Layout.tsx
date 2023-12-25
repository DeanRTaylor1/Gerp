import React, { useMemo, useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { pages } from '../../router/pages';
import { useTheme } from '../../hooks/useTheme';

interface LayoutProps {
    children: React.ReactNode;
}

interface NavButtonProps {
    to: string;
    name: string;
}

const NavButton: React.FC<NavButtonProps> = React.memo(({ to, name }) => {
    const location = useLocation();
    const { getColorClasses } = useTheme();

    const isActive = useCallback(() => location.pathname === to, [location, to]);
    const activeColors = getColorClasses('primaryInverse');
    const inactiveButtonColors = getColorClasses('inactiveButton');

    const linkClassName = `block py-2.5 px-4 rounded-l transition duration-200 ${isActive() ? activeColors : inactiveButtonColors}`;

    return <Link to={to} className={linkClassName}>{name}</Link>;
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { theme, getColorClasses, toggleTheme } = useTheme();
    const primary = getColorClasses("primary");
    const secondary = getColorClasses("secondary");

    useEffect(() => {
        toggleTheme()
    }, [])

    const navLinks = useMemo(() => pages.map((page, index) => {
        return page.navbar ? <NavButton key={index} to={page.path} name={page.name} /> : null;
    }), []);

    return (
        <div className={`${theme} flex h-screen min-h-screen`}>
            {/* Top Bar */}
            <div className={`w-full ${primary} fixed top-0 left-0 h-12 flex items-center z-10`}>
                <div className="ml-4">
                    <Link to="/" className={`${primary} flex items-center space-x-2 px-4`}>
                        <span className="text-2xl font-extrabold">Go-erp</span>
                    </Link>
                </div>
            </div>
            {/* Sidebar */}
            <div className={` ${primary} pt-12 pl-2 w-64 space-y-6 py-7 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
                <nav>{navLinks}</nav>
            </div>
            {/* Content Area */}
            <div className={`content flex flex-wrap p-6 pt-14 gap-6 w-full ${secondary}`}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
