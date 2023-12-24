import React, { useEffect, useState } from 'react';
import { pages } from '../../router/pages';
import { useTheme } from '../../hooks/useTheme';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}



interface NavButtonProps {
    to: string
    name: string
}
const NavButton: React.FC<NavButtonProps> = ({ to, name }) => {
    const [active, setActive] = useState<boolean>(false)
    const location = useLocation();

    useEffect(() => {
        const matchUrlPath = (path: string): boolean => {
            return location.pathname === path;
        };

        setActive(matchUrlPath(to));
    }, [location, to]);


    const linkClassName = `block py-2.5 px-4 rounded transition duration-200 ${active ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'
        }`;
    return (
        <>
            <Link to={to} className={linkClassName}>
                {name}
            </Link>
        </>
    )
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className={`${theme} flex h-screen min-h-screen bg-gray-100`}>
            <div className="sidebar bg-white text-black w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
                <Link to="/" className="text-black flex items-center space-x-2 px-4">
                    <span className="text-2xl font-extrabold">Go-erp</span>
                </Link>

                <nav>
                    {pages.map((page, index) => (
                        page.navbar && <NavButton key={index} to={page.path} name={page.name} />
                    ))}
                </nav>
            </div>

            {/* Content Area */}
            <div className="content flex flex-wrap p-6 gap-6">
                {children}
            </div>
        </div>
    );
};

export default Layout;

