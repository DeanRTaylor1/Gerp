import { useTheme } from "../../hooks/useTheme";

interface TablePaginationProps {
    page: number; // current page number
    count: number; // total number of rows
    rowsPerPage: number; // number of rows per page
    onPageChange: (newPage: number) => void;
    onRowsPerPageChange: (newRowsPerPage: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({ page, count, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
    const totalPages = Math.ceil(count / rowsPerPage);

    const { getStyles } = useTheme();
    const selectStyle = getStyles('selectDropdown');
    const navButtonStyle = getStyles('navButton');


    const handlePreviousPage = () => {
        if (page > 0) onPageChange(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) onPageChange(page + 1);
    };

    return (
        <div className="w-full flex gap-4 pt-2">

            <div className="ml-auto flex gap-4 items-center">
                <span>{`${page + 1}-${count <= (page + 1) * rowsPerPage ? count : (page + 1) * rowsPerPage} of ${count}`}</span>
                <div className="flex gap-2">
                    <label className="flex gap-2 items-center justify-center">
                        Rows per page:
                        <select
                            value={rowsPerPage}
                            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                            className={"ml-1 " + selectStyle}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                        </select>
                    </label>
                </div>
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 0}
                    className={navButtonStyle}
                    aria-label="Previous Page"
                >
                    &lt;
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={page >= totalPages - 1}
                    className={navButtonStyle}
                    aria-label="Next Page"
                >
                    &gt;
                </button>
            </div>
        </div>
    );

};

export default TablePagination;
