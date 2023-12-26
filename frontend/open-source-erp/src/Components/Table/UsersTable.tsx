import { useState } from "react"
import Table from "./Table"
import TableBody from "./TableBody"
import TableContainer from "./TableContainer"
import TableHead from "./TableHead"
import TablePagination from "./TablePagination"
import TableRow from "./TableRow"
import { useUserApi } from "../../hooks/useUserApi"
import useFetch from "../../hooks/useFetch"

const headLabels = [
    {
        "id": "avatar",
        "label": "Avatar"
    },
    {
        "id": "createdAt",
        "label": "CreatedAt"
    },
    {
        "id": "email",
        "label": "Email"
    },
    {
        "id": "firstName",
        "label": "FirstName"
    },
    {
        "id": "id",
        "label": "Id"
    },
    {
        "id": "lastName",
        "label": "LastName"
    },
    {
        "id": "role",
        "label": "Role"
    },
    {
        "id": "status",
        "label": "Status"
    },
    {
        "id": "updatedAt",
        "label": "UpdatedAt"
    },
    {
        "id": "username",
        "label": "Username"
    }
]





const UsersTable: React.FC = () => {
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    const usersApi = useUserApi();
    const fetchUsers = async () => {
        const response = await usersApi.usersGet(page * rowsPerPage, rowsPerPage);
        return response.data.data || [];
    };

    const { data: users, isLoading, error } = useFetch(['users'], fetchUsers);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        <TableContainer style={{ overflow: 'unset' }}>
            <Table>
                <TableHead headLabel={headLabels} />
                <TableBody>
                    {users && users.length > 0 && users.map(user => (
                        <TableRow key={user.id} id={user.id!} updatedAt={user.updatedAt!} status={user.status!} username={user.username!} firstName={user.firstName!} lastName={user.lastName!} role={user.role!} email={user.email!} createdAt={user.createdAt!} handleClick={() => console.log("clicked")} selected={false} avatar={user.avatar!}> </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                page={page}
                count={users && users.length || 0}
                rowsPerPage={10}
                onPageChange={setPage}
                onRowsPerPageChange={() => "test"}
            />
        </TableContainer>
    );
}

export default UsersTable

