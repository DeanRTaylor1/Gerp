import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { Icon } from '@iconify/react'
import { useNavigate } from "react-router-dom";

interface TableRowProps {
    id: number;
    children: React.ReactNode;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
    avatar: string;
    selected: boolean;
    createdAt: string;
    updatedAt: string;
    handleClick: () => void;
}

const TableRow: React.FC<TableRowProps> = ({
    id,
    firstName,
    lastName,
    role,
    email,
    status,
    avatar,
    username,
    selected,
    createdAt,
    updatedAt,
    handleClick
}) => {
    const [showPopout, setShowPopout] = useState(false);
    const popoutRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { getStyles, getColorClasses } = useTheme();
    const tableRowHover = getStyles('tableRowHover');
    const primary = getColorClasses('primary')

    const handleIconClick = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        setShowPopout(!showPopout);
    };

    const handleEditClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate(`/users/edit/${id}`);
        setShowPopout(false);
    };

    const handleClickOutside = (event: Event) => {
        if (popoutRef.current && !popoutRef.current.contains(event.target as Node)) {
            setShowPopout(false);
        }
    };

    useEffect(() => {
        if (showPopout) {
            document.addEventListener('click', handleClickOutside, true);
            document.addEventListener('scroll', handleClickOutside, true);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('scroll', handleClickOutside, true);
        };
    }, [showPopout]);

    return (
        <tr onClick={handleClick} className={`${selected ? 'selected-row' : 'border-b border-gray-300'} ${tableRowHover} h-14`}>
            <td className="p-3 align-center">
                <img src={avatar} alt={username} className="rounded-full h-12 w-12 object-cover inline-block" />
            </td>
            <td className="p-3 align-center">{id}</td>
            <td className="p-3 align-center">{username}</td>
            <td className="p-3 align-center">{firstName}</td>
            <td className="p-3 align-center">{lastName}</td>
            <td className="p-3 align-center">{email}</td>
            <td className="p-3 align-center">{role}</td>
            <td className={`font-semibold ${status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{status}</td>
            <td className="p-3 align-center">{new Date(createdAt).toLocaleDateString('en-UK')}</td>
            <td className="p-3 align-center">{new Date(updatedAt).toLocaleDateString('en-UK')}</td>
            <td className="p-3 align-right">
                <Icon className="hover:cursor-pointer" icon="uil:ellipsis-v" onClick={handleIconClick} />
                {showPopout && (
                    <div ref={popoutRef} className={`absolute right-10 mt-2 w-40 rounded-md shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 ${primary}`}>
                        <a href="#" className="block rounded-md px-4 py-2 text-sm  hover:bg-gray-100 dark:hover:bg-secondary-bg-dark" onClick={handleEditClick}>
                            Edit
                        </a>
                    </div>
                )}
            </td>
        </tr >
    );
};

export default TableRow