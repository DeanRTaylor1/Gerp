import { useEffect } from 'react';
import Loading from '../../Components/Loader/Loading';
import EditUserProfileForm from '../../Components/forms/EditUserProfileForm';
import UserSummary from '../../Components/forms/UserSummary';
import { getFetchUser } from '../../api/users';
import {
  DepartmentsResponse,
  GenderResponse,
  MaritalStatusesResponse,
  UserResponse,
} from '../../axios';
import { useAuth } from '../../context/useAuth';
import useFetch from '../../hooks/useFetch';
import { useGendersApi } from '../../hooks/useGendersApi';
import { useMaritalStatusesApi } from '../../hooks/useMaritalStatusesApi';
import { useToast } from '../../hooks/useToast';
import { useUserApi } from '../../hooks/useUserApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useDepartmentsApi } from '../../hooks/useDepartmentsApi';

const EditUserProfile = () => {
  const usersApi = useUserApi();
  const showToast = useToast();
  const { id } = useParams();
  const { verifyRoleAndId, user: loggedInUser } = useAuth();
  const navigate = useNavigate();
  const {
    data: user,
    isLoading: userIsLoading,
    error: profileError,
  } = useFetch<UserResponse | null>(
    ['user', id],
    getFetchUser(usersApi, Number(id))
  );

  useEffect(() => {
    const valid = verifyRoleAndId('Administrator', Number(id), navigate);
    if (valid === false) {
      showToast('Not Authorized', 'error');
    }
  }, [verifyRoleAndId, id, navigate, showToast, loggedInUser]);

  const genderApi = useGendersApi();
  const getGenders = async (): Promise<GenderResponse[] | null> => {
    const response = await genderApi.gendersGet();

    return response.data.data || null;
  };

  const {
    data: genders,
    isLoading: gendersAreLoading,
    error: genderError,
  } = useFetch<GenderResponse[] | null>(['genders'], getGenders);

  const maritalStatusesApi = useMaritalStatusesApi();
  const getMaritalStatuses = async (): Promise<
    MaritalStatusesResponse[] | null
  > => {
    const response = await maritalStatusesApi.maritalStatusesGet();

    return response.data.data || null;
  };

  const departmentsApi = useDepartmentsApi();
  const getDepartments = async (): Promise<DepartmentsResponse[] | null> => {
    const response = await departmentsApi.departmentsGet();

    return response.data.data || null;
  };

  const {
    data: maritalStatuses,
    isLoading: maritalStatusesAreLoading,
    error: maritalStatusError,
  } = useFetch<MaritalStatusesResponse[] | null>(
    ['maritalStatuses'],
    getMaritalStatuses
  );

  const {
    data: departmentData,
    isLoading: departmentsAreLoading,
    error: departmentsError,
  } = useFetch<DepartmentsResponse[] | null>(['departments'], getDepartments);

  if (
    userIsLoading ||
    gendersAreLoading ||
    maritalStatusesAreLoading ||
    departmentsAreLoading
  ) {
    return (
      <div className="w-full h-full flex justify-center mt-10">
        <Loading />
      </div>
    );
  }
  if (profileError) {
    showToast('Error loading your profile.');
    return (
      <div className="w-full h-full flex justify-center mt-10">
        <Loading />
      </div>
    );
  }
  if (genderError) {
    showToast('Error loading genders.');
    return (
      <div className="w-full h-full flex justify-center mt-10">
        <Loading />
      </div>
    );
  }
  if (maritalStatusError) {
    showToast('Error loading Marital Statuses.');
    return (
      <div className="w-full h-full flex justify-center mt-10">
        <Loading />
      </div>
    );
  }

  if (departmentsError) {
    showToast('Error loading your profile.');
    return (
      <div className="w-full h-full flex justify-center mt-10">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6 pt-4  w-full">
        Profile
        <div className="flex flex-col justify-center items-center lg:flex-row gap-8 w-full min-h-full">
          <UserSummary user={user} />
          <EditUserProfileForm
            genders={genders!}
            user={user!}
            departments={departmentData!}
            maritalStatuses={maritalStatuses!}
          />
        </div>
      </div>
    </>
  );
};

export default EditUserProfile;
