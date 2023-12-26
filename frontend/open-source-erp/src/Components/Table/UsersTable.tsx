import { useEffect, useState } from "react"
import Table from "./Table"
import TableBody from "./TableBody"
import TableContainer from "./TableContainer"
import TableHead from "./TableHead"
import TablePagination from "./TablePagination"
import TableRow from "./TableRow"
import { UserResponse } from "../../axios"
import { useUserApi } from "../../hooks/useUserApi"

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


const useFetchUsers = (page: number, rowsPerPage: number) => {
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const usersApi = useUserApi();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await usersApi.usersGet(page * rowsPerPage, rowsPerPage);
                setUsers(response.data.data || []);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page, rowsPerPage, usersApi]);

    return { users, loading, error };
};


const UsersTable: React.FC = () => {
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;

    const { users, loading, error } = useFetchUsers(page, rowsPerPage);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    return (
        <TableContainer style={{ overflow: 'unset' }}>
            <Table>
                <TableHead headLabel={headLabels} />
                <TableBody>
                    {users.length > 0 && users.map(user => (
                        <TableRow key={user.id} id={user.id!} updatedAt={user.updatedAt!} status={user.status!} username={user.username!} firstName={user.firstName!} lastName={user.lastName!} role={user.role!} email={user.email!} createdAt={user.createdAt!} handleClick={() => console.log("clicked")} selected={false} avatar={user.avatar!}> </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                page={page}
                count={users.length}
                rowsPerPage={10}
                onPageChange={setPage}
                onRowsPerPageChange={() => "test"}
            />
        </TableContainer>
    );
}

export default UsersTable

