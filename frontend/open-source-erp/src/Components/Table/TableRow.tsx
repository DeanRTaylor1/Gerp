import React from "react";
import { useTheme } from "../../hooks/useTheme";

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
    const { getStyles } = useTheme()
    const tableRowHover = getStyles('tableRowHover')
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
            <td className="p-3 align-center">{createdAt}</td>
            <td className="p-3 align-center">{updatedAt}</td>
        </tr >
    );
};

export default TableRow