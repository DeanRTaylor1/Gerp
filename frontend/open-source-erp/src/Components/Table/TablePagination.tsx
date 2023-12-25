interface TablePaginationProps {
    page: number; // current page number
    count: number; // total number of rows
    rowsPerPage: number; // number of rows per page
    onPageChange: (newPage: number) => void;
    onRowsPerPageChange: (newRowsPerPage: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({ page, count, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
    const totalPages = Math.ceil(count / rowsPerPage);

    const handlePreviousPage = () => {
        if (page > 0) onPageChange(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) onPageChange(page + 1);
    };

    return (
        <div>
            <button onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
            <span>Page {page + 1} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={page >= totalPages - 1}>Next</button>
            <div>
                <label>
                    Rows per page:
                    <select value={rowsPerPage} onChange={(e) => onRowsPerPageChange(Number(e.target.value))}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default TablePagination;
