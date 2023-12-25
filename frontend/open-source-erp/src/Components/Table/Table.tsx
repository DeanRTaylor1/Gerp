interface TableProps {
    children: React.ReactNode
}

const Table: React.FC<TableProps> = ({ children }) => {
    return <table className="w-full">{children}</table>;
};


export default Table