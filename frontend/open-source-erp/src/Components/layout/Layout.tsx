import React from 'react';
import { pages } from '../../router/pages';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="sidebar bg-gray-800 text-gray-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
                <a href="#" className="text-white flex items-center space-x-2 px-4">
                    <span className="text-2xl font-extrabold">Go-erp</span>
                </a>

                <nav>
                    {pages.map((page) => {
                        return (
                            <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white" href={page.path}>

                                {page.name}
                            </a>
                        )
                    })}
                </nav>
            </div>

            {/* Content Area */}
            <div className="content flex-1 p-10">
                {children}
            </div>
        </div>
    );
};

export default Layout;
