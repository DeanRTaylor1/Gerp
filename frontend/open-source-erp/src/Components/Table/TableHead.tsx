import { useTheme } from "../../hooks/useTheme";

interface HeadLabel {
    id: string;
    label: string;
    align?: 'left' | 'right' | 'center';
}

interface TableHeadProps {
    headLabel: HeadLabel[];
}

const TableHead: React.FC<TableHeadProps> = ({ headLabel }) => {
    const { getColorClasses } = useTheme()
    const secondary = getColorClasses('secondary')
    return (
        <thead>
            <tr>
                {headLabel.map((header) => (
                    <th key={header.id} className={secondary + " font-semibold text-left p-3 border-b border-gray-300"} style={{ textAlign: header.align || 'left' }}>{header.label}</th>
                ))}
            </tr>
        </thead>
    );
};
export default TableHead