import { useState } from "react";
import Table from "../Components/Table/Table";
import TableBody from "../Components/Table/TableBody";
import TableContainer from "../Components/Table/TableContainer";
import TableHead from "../Components/Table/TableHead";
import TablePagination from "../Components/Table/TablePagination";
import Card from "../Components/layout/Card";

const UsersAdmin = () => {
    const [page, setPage] = useState<number>(1)
    const users = []

    return (
        <Card>
            <TableContainer style={{ overflow: 'unset' }}>
                <Table>
                    <TableHead headLabel={[{
                        id: "0",
                        label: "test"
                    }]} />
                    <TableBody>
                        <div></div>
                    </TableBody>
                </Table>
                <TablePagination
                    page={page}
                    count={users.length}
                    onPageChange={setPage}
                    onRowsPerPageChange={() => "test"}
                    rowsPerPage={10}
                />
            </TableContainer>
        </Card>
    );
};

export default UsersAdmin