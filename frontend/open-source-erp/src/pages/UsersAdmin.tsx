import { useState } from "react";
import Table from "../Components/Table/Table";
import TableBody from "../Components/Table/TableBody";
import TableContainer from "../Components/Table/TableContainer";
import TableHead from "../Components/Table/TableHead";
import TablePagination from "../Components/Table/TablePagination";
import Card from "../Components/layout/Card";
import { UserResponse } from "../axios";
import TableRow from "../Components/Table/TableRow";
import { useTheme } from "../hooks/useTheme";

const UsersAdmin = () => {
    const { getColorClasses, getStyles } = useTheme()
    const secondary = getColorClasses('secondary')
    const pageTitle = getStyles('pageTitle')
    const [page, setPage] = useState<number>(0)
    const users: Array<UserResponse> = [{
        id: 1,
        username: "username",
        firstName: "firstName",
        lastName: "lastName",
        email: "email@email.com",
        avatar: "https://minimal-kit-react.vercel.app/assets/images/avatars/avatar_13.jpg",
        status: "active",
        role: "user",
        createdAt: new Date().getTime().toString(),
        updatedAt: new Date().getTime().toString()
    }]

    const headLabels = Object.keys(users[0])
        .filter(key => key !== 'avatar')
        .map(key => ({
            id: key,
            label: key.charAt(0).toUpperCase() + key.slice(1),
        }));

    headLabels.unshift({
        id: 'avatar',
        label: 'Avatar',
    });



    return (
        <>
            <div className="w-full h-full flex flex-col gap-4 mt-8">
                <div className={pageTitle + " " + secondary}>Users</div>
                <Card className="px-0">
                    <TableContainer style={{ overflow: 'unset' }}>
                        <Table>
                            <TableHead headLabel={headLabels} />
                            <TableBody>
                                {users.map(user => (
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
                </Card>
            </div>
        </>
    );
};

export default UsersAdmin