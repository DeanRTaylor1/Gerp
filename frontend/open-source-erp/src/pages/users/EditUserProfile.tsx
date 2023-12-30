import Loading from '../../Components/Loader/Loading';
import EditUserProfileForm from '../../Components/forms/EditUserProfileForm';
import UserSummary from '../../Components/forms/UserSummary';
import { getFetchUser } from '../../api/users';
import {
  GenderResponse,
  MaritalStatusesResponse,
  UserResponse,
} from '../../axios';
import useFetch from '../../hooks/useFetch';
import { useGendersApi } from '../../hooks/useGendersApi';
import { useMaritalStatusesApi } from '../../hooks/useMaritalStatusesApi';
import { useToast } from '../../hooks/useToast';
import { useUserApi } from '../../hooks/useUserApi';
import { useParams } from 'react-router-dom';

const EditUserProfile = () => {
  const usersApi = useUserApi();
  const showToast = useToast();
  const { id } = useParams();
  const {
    data: user,
    isLoading: userIsLoading,
    error: profileError,
  } = useFetch<UserResponse | null>(
    ['user', id],
    getFetchUser(usersApi, Number(id))
  );

  const genderApi = useGendersApi();
  const getGenders = async (): Promise<GenderResponse[] | null> => {
    const response = await genderApi.gendersGet(0, 10);

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
    const response = await maritalStatusesApi.maritalStatusesGet(0, 10);

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

  if (userIsLoading || gendersAreLoading || maritalStatusesAreLoading) {
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

  return (
    <>
      <div className="flex flex-col gap-6 pt-4  w-full">
        Profile
        <div className="flex flex-col lg:flex-row gap-8 w-full min-h-full">
          <UserSummary user={user} />
          <EditUserProfileForm
            genders={genders!}
            user={user!}
            maritalStatuses={maritalStatuses!}
          />
        </div>
      </div>
    </>
  );
};

export default EditUserProfile;
