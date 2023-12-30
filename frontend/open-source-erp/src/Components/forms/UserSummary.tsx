import { UserResponse } from '../../axios';
import Card from '../../layout/Card';
import { InputType } from '../Inputs/Input.enum';
import DisabledInputs from '../DisabledForms/DisabledInputs';
import { valueOrEmptyString } from '../../utils/util';

interface UserSummaryProps {
  user?: UserResponse | null | undefined;
}

function UserSummary({ user }: UserSummaryProps) {
  const fieldConfigs = [
    {
      name: 'username',
      icon: 'person-circle',
      placeholder: 'Username',
      value: valueOrEmptyString(user?.username),
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'email',
      icon: 'envelope',
      placeholder: 'Email Address',
      value: valueOrEmptyString(user?.email),
      type: InputType.Email,
      additionalClasses: 'mb-4',
    },
    {
      name: 'role',
      icon: 'key',
      placeholder: 'Role',
      value: valueOrEmptyString(user?.role),
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'status',
      icon: 'power',
      placeholder: 'Status',
      value: valueOrEmptyString(user?.status),
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
  ];

  return (
    <Card className="min-h-[90%] max-w-[348px] flex flex-col justify-center items-center">
      <section className="min-w-64 max-w-72 h-[450px] flex flex-col gap-4 items-center justify-center">
        {user && `${user.firstName} ${user.lastName}`}
        <div className=" max-w-64 flex justify-center items-center w-40 h-40 rounded-full overflow-hidden">
          <img
            src={(user as UserResponse).avatar}
            className="w-full h-full object-cover rounded-full"
            alt="User Avatar"
          />
        </div>
        <div className="w-[90%]">
          <DisabledInputs vertical={true} fields={fieldConfigs} />
        </div>
      </section>
    </Card>
  );
}

export default UserSummary;
