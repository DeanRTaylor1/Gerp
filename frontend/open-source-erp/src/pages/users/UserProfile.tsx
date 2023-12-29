import Loading from '../../Components/Loader/Loading';
import UserProfileSummary from '../../Components/forms/UserProfileSummary';
import UserSummary from '../../Components/forms/UserSummary';
import { UserResponse } from '../../axios';
import { useAuth } from '../../context/useAuth';
import useFetch from '../../hooks/useFetch';
import { useToast } from '../../hooks/useToast';
import { useUserApi } from '../../hooks/useUserApi';

const UserProfile = () => {
  const usersApi = useUserApi();
  const showToast = useToast();
  const { payload } = useAuth();

  const fetchUser = async (): Promise<UserResponse | null> => {
    const response = await usersApi.usersUserIdGet(payload.user_id!);
    console.log(response.data.data);
    return response.data.data || null;
  };

  const {
    data: user,
    isLoading,
    error,
  } = useFetch<UserResponse | null>(['user'], fetchUser);

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center mt-10">
        <Loading />
      </div>
    );
  if (error) {
    showToast('Error loading your profile.');
  }

  return (
    <>
      <div className="flex flex-col gap-6 pt-4 px-2">
        Profile
        <div className="flex flex-col lg:flex-row gap-8 min-h-full">
          <UserSummary user={user} />
          <UserProfileSummary user={user} />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
