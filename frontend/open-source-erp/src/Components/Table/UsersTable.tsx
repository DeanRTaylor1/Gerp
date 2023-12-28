import { useState } from "react"
import Table from "./Table"
import TableBody from "./TableBody"
import TableContainer from "./TableContainer"
import TableHead from "./TableHead"
import TablePagination from "./TablePagination"
import TableRow from "./TableRow"
import { useUserApi } from "../../hooks/useUserApi"
import useFetch from "../../hooks/useFetch"
import SearchInputField from "../Inputs/SearchInputField"
import { Icon } from "@iconify/react"
import { useToast } from "../../hooks/useToast"
import Loading from "../Loader/Loading"

const headLabels = [
    {
        "id": "avatar",
        "label": "Avatar"
    },
    {
        "id": "id",
        "label": "Id"
    },
    {
        "id": "username",
        "label": "Username"
    },
    {
        "id": "firstName",
        "label": "FirstName"
    },
    {
        "id": "lastName",
        "label": "LastName"
    },
    {
        "id": "email",
        "label": "Email"
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
        "id": "createdAt",
        "label": "CreatedAt"
    },
    {
        "id": "updatedAt",
        "label": "UpdatedAt"
    },

]





const UsersTable: React.FC = () => {
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    const usersApi = useUserApi();
    const showToast = useToast()
    const fetchUsers = async () => {
        const response = await usersApi.usersGet(page * rowsPerPage, rowsPerPage);
        console.log(JSON.stringify(response.data.data))
        return response.data.data || [];
    };

    const { data: users, isLoading, error } = useFetch(['users'], fetchUsers);

    if (isLoading) return (
        <Loading />
    )
    if (error) {
        showToast("Error loading users.")
        return (null)
    }

    return (
        <TableContainer style={{ overflow: 'unset' }}>
            <SearchInputField type="input" name="Search:" placeholder="Search..." icon={<Icon icon="carbon:search" />} additionalClasses="pl-8 w-60" />
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
        </TableContainer >
    );
}

export default UsersTable

