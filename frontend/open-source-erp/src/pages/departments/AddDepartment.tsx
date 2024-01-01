import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import AddDepartmentForm from '../../Components/forms/departments/AddDepartmentForm';
import { useAuth } from '../../context/useAuth';
import { useToast } from '../../hooks/useToast';

const AddDepartment = () => {
  const showToast = useToast();
  const { id } = useParams();
  const { verifyRoleAndId, user: loggedInUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const valid = verifyRoleAndId('Administrator', Number(id), navigate);
    if (valid === false) {
      showToast('Not Authorized', 'error');
    }
  }, [verifyRoleAndId, id, navigate, showToast, loggedInUser]);

  return (
    <>
      <div className="flex flex-col gap-6 pt-4  w-full">
        Profile
        <div className="flex flex-col justify-center items-center lg:flex-row gap-8 w-full min-h-full">
          <AddDepartmentForm />
        </div>
      </div>
    </>
  );
};

export default AddDepartment;
