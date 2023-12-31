import Card from '../../layout/Card';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import useTranslator from '../../hooks/useTranslator';
import { UserResponse } from '../../axios';
import { dateTimeToDateString, valueOrEmptyString } from '../../utils/util';
import { InputType } from '../Inputs/Input.enum';
import DisabledInputs from '../DisabledForms/DisabledInputs';
import ShoeLaceCustomButton from '../buttons/ShoeLaceCustomButton';

const getDependentsText = (dependents: string | number) => {
  console.log({ dependents });
  if (dependents === null || dependents === undefined || dependents === '')
    return 'Dependents'; // Handle null or undefined
  if (dependents === 0) return '0 dependents'; // Handle zero dependents
  return `${dependents} ${dependents === 1 ? 'dependent' : 'dependents'}`; // Handle 1 or more dependents
};

interface UserProfileSummaryProps {
  user?: UserResponse | null | undefined;
}

function UserProfileSummary({ user }: UserProfileSummaryProps) {
  const navigate = useNavigate();
  const { getColorClasses } = useTheme();
  const primary = getColorClasses('primary');

  const translator = useTranslator();

  const fieldConfigs = [
    {
      name: 'gender',
      icon: 'gender-ambiguous',
      placeholder: 'Gender',
      value: valueOrEmptyString(user?.gender),
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'nationality',
      icon: 'globe-europe-africa',
      placeholder: 'Nationality',
      value: valueOrEmptyString(user?.nationality).split('_').join(' '),
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'departments',
      icon: 'buildings',
      placeholder: 'Department',
      value: valueOrEmptyString(user?.departmentName),
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'dob',
      icon: 'calendar2-event',
      placeholder: 'Status',
      value: dateTimeToDateString(user?.dateOfBirth),
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'marital-status',
      icon: 'heart-half',
      placeholder: 'Marital Status',
      value: valueOrEmptyString(user?.maritalStatus),
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'dependents',
      icon: 'diagram-2',
      placeholder: 'dependents',
      value:
        (user?.dependents && getDependentsText(user?.dependents)) ||
        'Dependents',
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'addressLine1',
      icon: 'house',
      placeholder: 'Address Line 1',
      value: valueOrEmptyString(user?.addressLine1),
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'addressLine2',
      icon: 'house',
      placeholder: 'Address Line 2',
      value: valueOrEmptyString(user?.addressLine2),
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'city',
      icon: 'buildings',
      placeholder: 'City',
      value: valueOrEmptyString(user?.city),
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'state',
      icon: 'buildings',
      placeholder: 'State/Province',
      value: valueOrEmptyString(user?.state),
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'postalCode',
      icon: 'envelope-open',
      placeholder: 'Postal Code',
      value: valueOrEmptyString(user?.postalCode),
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'country',
      icon: 'globe-europe-africa',
      placeholder: 'Country',
      value: valueOrEmptyString(user?.country).split('_').join(' '),
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
  ];

  return (
    <>
      <Card overrideClasses="px-0 max-w-full w-full h-fit p-4 shadow-md rounded-lg">
        <section>
          <div
            className={`pt-4 min-h-full flex flex-col justify-center items-center ${primary}`}
          >
            <div className="flex flex-wrap justify-center items-center gap-4 max-w-full min-w-[350px] px-5 pt-16 py-4 text-center md:px-10 md:py-24 lg:py-0">
              <h3 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl">
                {translator.global.profile}
              </h3>
              <DisabledInputs vertical={false} fields={fieldConfigs} />
              <p className="text-sm text-[#636262] pb-12">
                <ShoeLaceCustomButton
                  onClick={() => navigate(`/profile/edit/${user?.id}`)}
                  icon="pencil-square"
                >
                  {translator.global.edit}
                </ShoeLaceCustomButton>{' '}
              </p>
            </div>
          </div>
        </section>
      </Card>
    </>
  );
}

export default UserProfileSummary;
