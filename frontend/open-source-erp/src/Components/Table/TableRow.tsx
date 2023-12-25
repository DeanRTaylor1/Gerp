interface TableRowProps {
    name: string;
    role: string;
    status: string;
    company: string;
    avatarUrl: string;
    isVerified: boolean;
    selected: boolean;
    handleClick: () => void;
}

const TableRow: React.FC<TableRowProps> = ({
    name,
    role,
    status,
    company,
    avatarUrl,
    isVerified,
    selected,
    handleClick
}) => {
    return (
        <tr onClick={handleClick} className={selected ? 'selected-row' : ''}>
            <td><img src={avatarUrl} alt={name} /></td>
            <td>{name}</td>
            <td>{role}</td>
            <td>{company}</td>
            <td>{isVerified ? 'Yes' : 'No'}</td>
            <td>{status}</td>
        </tr>
    );
};

export default TableRow