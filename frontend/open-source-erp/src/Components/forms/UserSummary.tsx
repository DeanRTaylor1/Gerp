import { UserResponse } from '../../axios';
import { useAuth } from '../../context/useAuth';
import useFetch from '../../hooks/useFetch';
import { useToast } from '../../hooks/useToast';
import { useUserApi } from '../../hooks/useUserApi';
import Card from '../../layout/Card';
import InputField from '../Inputs/InputField';
import Loading from '../Loader/Loading';
import { InputIconSlot, InputSize, InputType } from '../Inputs/Input.enum';

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
      <section className="min-w-64 h-[450px] flex flex-col gap-4 items-center">
        {user && `${user.firstName} ${user.lastName}`}
        <div className="flex justify-center items-center w-40 h-40 rounded-full overflow-hidden">
          <img
            src={(user as UserResponse).avatar}
            className="w-full h-full object-cover rounded-full"
            alt="User Avatar"
          />
        </div>
        <div className="w-[90%]">
          <InputField
            name="username"
            size={InputSize.Med}
            slot={InputIconSlot.Pre}
            type={InputType.Text}
            disabled={true}
            placeholder="Username"
            icon="person-circle"
            value={user?.username}
            additionalClasses="mb-4"
          />
          <InputField
            name="email"
            size={InputSize.Med}
            slot={InputIconSlot.Pre}
            type={InputType.Email}
            disabled={true}
            placeholder="Email Address"
            icon="envelope"
            value={user?.email}
            additionalClasses="mb-4"
          />
          <InputField
            name="email"
            size={InputSize.Med}
            slot={InputIconSlot.Pre}
            type={InputType.Email}
            disabled={true}
            placeholder="Email Address"
            icon="envelope"
            value={user?.email}
            additionalClasses="mb-4"
          />
          <InputField
            name="status"
            size={InputSize.Med}
            slot={InputIconSlot.Pre}
            type={InputType.Text}
            disabled={true}
            placeholder="Status"
            icon="power"
            value={user?.status}
            additionalClasses="mb-4"
          />
        </div>
      </section>
    </Card>
  );
}

export default UserSummary;
