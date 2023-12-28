import { UserResponse } from '../../axios';
import { useAuth } from '../../context/useAuth';
import useFetch from '../../hooks/useFetch';
import { useToast } from '../../hooks/useToast';
import { useUserApi } from '../../hooks/useUserApi';
import Card from '../../layout/Card';
import Loading from '../Loader/Loading';

function UserSummary() {
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

  if (isLoading) return <Loading />;
  if (error) {
    showToast('Error loading users.');
    return null;
  }

  return (
    <Card className="min-h-[90%]">
      <section className="min-w-72 h-[450px] flex flex-col gap-4 items-center">
        {user && `${user.firstName} ${user.lastName}`}
        <div className="flex justify-center items-center w-40 h-40 rounded-full overflow-hidden">
          <img
            src={(user as UserResponse).avatar}
            className="w-full h-full object-cover rounded-full"
            alt="User Avatar"
          />
        </div>
      </section>
    </Card>
  );
}

export default UserSummary;
