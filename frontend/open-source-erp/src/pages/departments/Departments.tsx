import DepartmentsTable from '../../Components/Table/departments/DepartmentsTable';
import ShoeLaceCustomButton from '../../Components/buttons/ShoeLaceCustomButton';
import { useTheme } from '../../hooks/useTheme';
import Card from '../../layout/Card';
import FormModal from '../../Components/modals/FormModal';
import AddDepartmentForm from '../../Components/forms/departments/AddDepartmentForm';
import useTranslator from '../../hooks/useTranslator';
import { useState } from 'react';

const ManageDepartmentsPage = () => {
  const { getColorClasses, getStyles } = useTheme();
  const secondary = getColorClasses('secondary');
  const pageTitle = getStyles('pageTitle');
  const translator = useTranslator();
  const [showModal, setShowModal] = useState<boolean>(false);

  const modalHandler = () => {
    const isOpen = showModal;
    if (isOpen) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  // const handAddClick = () => {
  //   navigate(finalPagesList['Create Department'].path!);
  // };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 mt-8">
        <div className="flex justify-between px-4">
          <div className={`${pageTitle} ${secondary}`}>Departments</div>
          <ShoeLaceCustomButton icon="plus-circle" onClick={modalHandler}>
            Add
          </ShoeLaceCustomButton>
        </div>
        <Card overrideClasses="px-0 max-w-full w-full h-fit p-4 shadow-md rounded-lg">
          <DepartmentsTable />
        </Card>
      </div>
      {showModal && (
        <FormModal
          title={`${translator.global.create} ${translator.global.department}`}
          closeFn={modalHandler}
        >
          <AddDepartmentForm closeFn={modalHandler} />
        </FormModal>
      )}
    </>
  );
};

export default ManageDepartmentsPage;
