import { useState } from 'react';
import Table from './Table';
import TableBody from './TableBody';
import TableContainer from './TableContainer';
import TableHead from './TableHead';
import TablePagination from './TablePagination';
import TableRow from './TableRowCustom';
import { useUserApi } from '../../hooks/useUserApi';
import useFetch from '../../hooks/useFetch';
import SearchInputField from '../Inputs/SearchInputField';
import { Icon } from '@iconify/react';
import { useToast } from '../../hooks/useToast';
import Loading from '../Loader/Loading';
import { InputType } from '../Inputs/Input.enum';
import {
  createUserRowData,
  dateFields,
  getHeadLabels,
  imageFields,
} from '../../utils/table';
import { UserResponse } from '../../axios';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon/index.js';
import { Link } from 'react-router-dom';

const rowOrder = [
  'avatar',
  'id',
  'username',
  'firstName',
  'lastName',
  'email',
  'role',
  'status',
  'createdAt',
  'updatedAt',
];

const UsersTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const usersApi = useUserApi();
  const showToast = useToast();
  const fetchUsers = async () => {
    const response = await usersApi.usersGet(page * rowsPerPage, rowsPerPage);
    console.log(response.data.data);
    return response.data.data || [];
  };

  const { data: users, isLoading, error } = useFetch(['users'], fetchUsers);

  if (isLoading) return <Loading />;
  if (error) {
    showToast('Error loading users.');
    return null;
  }

  if (!users || users.length === 0) {
    return null;
  }

  const additionalRows = (userId: number) => [
    <td className="p-3 align-right">
      <Link
        to={`/profile/edit/${userId}`}
        className="w-full h-full justify-center items-center"
      >
        <SlIcon name="pencil-square" />
      </Link>
    </td>,
  ];

  return (
    <TableContainer style={{ overflow: 'unset' }}>
      <SearchInputField
        type={InputType.Search}
        name="Search:"
        placeholder="Search..."
        icon={<Icon icon="carbon:search" />}
        additionalClasses="pl-8 w-60"
      />
      <Table>
        <TableHead
          headLabels={getHeadLabels<UserResponse>(users[0])}
          rowOrder={rowOrder}
          additionalColumns={additionalRows.length || 0}
        />
        <TableBody>
          {users &&
            users.length > 0 &&
            users.map((user: UserResponse) => {
              const rowData = createUserRowData<UserResponse>(
                user,
                dateFields,
                imageFields
              );
              return (
                <TableRow
                  rowOrder={rowOrder}
                  rowData={rowData}
                  selected={false}
                  handleClick={() => console.log('clicked')}
                >
                  {...additionalRows(user.id!)}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        page={page}
        count={(users && users.length) || 0}
        rowsPerPage={10}
        onPageChange={setPage}
        onRowsPerPageChange={() => 'test'}
      />
    </TableContainer>
  );
};

export default UsersTable;
