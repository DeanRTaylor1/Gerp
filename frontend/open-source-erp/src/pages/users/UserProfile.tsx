import Loading from '../../Components/Loader/Loading';
import UserProfileSummary from '../../Components/forms/UserProfileSummary';
import UserSummary from '../../Components/forms/UserSummary';
import { getFetchUser } from '../../api/users';
import { UserResponse } from '../../axios';
import { useAuth } from '../../context/useAuth';
import useFetch from '../../hooks/useFetch';
import { useToast } from '../../hooks/useToast';
import { useUserApi } from '../../hooks/useUserApi';

const UserProfile = () => {
  const usersApi = useUserApi();
  const showToast = useToast();
  const { payload } = useAuth();

  const {
    data: user,
    isLoading,
    error,
  } = useFetch<UserResponse | null>(
    ['user'],
    getFetchUser(usersApi, payload.user_id)
  );

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
        <div className="flex flex-col justify-center items-center lg:flex-row gap-8 min-h-full w-full">
          <UserSummary user={user} />
          <UserProfileSummary user={user} />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
