import { useNavigate } from 'react-router-dom';
import DepartmentsTable from '../../Components/Table/departments/DepartmentsTable';
import ShoeLaceCustomButton from '../../Components/buttons/ShoeLaceCustomButton';
import { useTheme } from '../../hooks/useTheme';
import Card from '../../layout/Card';
import { finalPagesList } from '../../router/pages';

const ManageDepartmentsPage = () => {
  const { getColorClasses, getStyles } = useTheme();
  const navigate = useNavigate();
  const secondary = getColorClasses('secondary');
  const pageTitle = getStyles('pageTitle');

  const handAddClick = () => {
    navigate(finalPagesList['Create Department'].path!);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 mt-8">
        <div className="flex justify-between px-4">
          <div className={`${pageTitle} ${secondary}`}>Departments</div>
          <ShoeLaceCustomButton icon="plus-circle" onClick={handAddClick}>
            Add
          </ShoeLaceCustomButton>
        </div>
        <Card overrideClasses="px-0 max-w-full w-full h-fit p-4 shadow-md rounded-lg">
          <DepartmentsTable />
        </Card>
      </div>
    </>
  );
};

export default ManageDepartmentsPage;
