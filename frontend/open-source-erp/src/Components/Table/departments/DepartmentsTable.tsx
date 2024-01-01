import { useState } from 'react';

import { useDepartmentsApi } from '../../../hooks/useDepartmentsApi';
import { Icon } from '@iconify/react/dist/iconify.js';
import { DepartmentsResponse, UserResponse } from '../../../axios';
import useFetch from '../../../hooks/useFetch';
import { useToast } from '../../../hooks/useToast';
import {
  getHeadLabels,
  createUserRowData,
  dateFields,
  imageFields,
} from '../../../utils/table';
import { InputType } from '../../Inputs/Input.enum';
import SearchInputField from '../../Inputs/SearchInputField';
import Loading from '../../Loader/Loading';
import Table from '../Table';
import TableBody from '../TableBody';
import TableContainer from '../TableContainer';
import TableHead from '../TableHead';
import TablePagination from '../TablePagination';
import TableRow from '../TableRow';

const rowOrder = ['id', 'departmentName'];

const DepartmentsTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const departmentsApi = useDepartmentsApi();
  const showToast = useToast();
  const fetchDepartments = async () => {
    const response = await departmentsApi.departmentsGet(
      page * rowsPerPage,
      rowsPerPage
    );
    console.log(response.data.data);
    return response.data.data || [];
  };

  const {
    data: departments,
    isLoading,
    error,
  } = useFetch(['departments'], fetchDepartments);

  if (isLoading) return <Loading />;
  if (error) {
    showToast('Error loading users.');
    return null;
  }

  if (!departments || departments.length === 0) {
    return null;
  }

  //   const additionalRows = (userId: number) => [
  //     <td className="p-3 align-right">
  //       <Link
  //         to={`/profile/edit/${userId}`}
  //         className="w-full h-full justify-center items-center"
  //       >
  //         <SlIcon name="pencil-square" />
  //       </Link>
  //     </td>,
  //   ];

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
          headLabels={getHeadLabels<UserResponse>(departments[0])}
          rowOrder={rowOrder}
          additionalClasses="w-[50%]"
        />
        <TableBody>
          {departments &&
            departments.length > 0 &&
            departments.map((department: DepartmentsResponse) => {
              const rowData = createUserRowData<DepartmentsResponse>(
                department,
                dateFields,
                imageFields
              );
              return (
                <TableRow
                  rowOrder={rowOrder}
                  rowData={rowData}
                  selected={false}
                  handleClick={() => console.log('clicked')}
                ></TableRow>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        page={page}
        count={(departments && departments.length) || 0}
        rowsPerPage={10}
        onPageChange={setPage}
        onRowsPerPageChange={() => 'test'}
      />
    </TableContainer>
  );
};

export default DepartmentsTable;
