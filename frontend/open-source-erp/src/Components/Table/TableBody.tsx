interface TableBodyProps {
    children: React.ReactNode

}
const TableBody: React.FC<TableBodyProps> = ({ children }) => {
    return <tbody>{children}</tbody>;
};

export default TableBody