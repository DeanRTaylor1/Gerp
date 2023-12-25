interface HeadLabel {
    id: string;
    label: string;
    align?: 'left' | 'right' | 'center';
}

interface TableHeadProps {
    headLabel: HeadLabel[];
}

const TableHead: React.FC<TableHeadProps> = ({ headLabel }) => {
    return (
        <thead>
            <tr>
                {headLabel.map((header) => (
                    <th key={header.id} style={{ textAlign: header.align || 'left' }}>{header.label}</th>
                ))}
            </tr>
        </thead>
    );
};
export default TableHead