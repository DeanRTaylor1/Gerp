interface TableContainerProps {
    children: React.ReactNode
    style: object
}
const TableContainer: React.FC<TableContainerProps> = ({ children, style }) => {
    return <div className="min-w-full" style={style}>{children}</div>;
};

export default TableContainer
