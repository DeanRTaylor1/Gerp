import Loading from '../../Components/Loader/Loading';
import EditUserProfileForm from '../../Components/forms/EditUserProfileForm';
import UserSummary from '../../Components/forms/UserSummary';
import { getFetchUser } from '../../api/users';
import { GenderResponse, UserResponse } from '../../axios';
import useFetch from '../../hooks/useFetch';
import { useGendersApi } from '../../hooks/useGendersApi';
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
    console.log(response.data.data);

    return response.data.data || null;
  };

  const {
    data: genders,
    isLoading: gendersAreLoading,
    error: genderError,
  } = useFetch<GenderResponse[] | null>(['genders'], getGenders);

  if (userIsLoading || gendersAreLoading) {
    return (
      <div className="w-full h-full flex justify-center mt-10">
        <Loading />
      </div>
    );
  }
  if (profileError) {
    showToast('Error loading your profile.');
  }
  if (genderError) {
    showToast('Error loading genders.');
  }

  return (
    <>
      <div className="flex flex-col gap-6 pt-4 px-2 w-full">
        Profile
        <div className="flex flex-col lg:flex-row gap-8 w-full min-h-full">
          <UserSummary user={user} />
          <EditUserProfileForm genders={genders!} user={user!} />
        </div>
      </div>
    </>
  );
};

export default EditUserProfile;
