import * as Yup from 'yup';
import {
  GenderResponse,
  MaritalStatusesResponse,
  PutProfileRequest,
  UserRequest,
  UserResponse,
} from '../../axios';

import Card from '../../layout/Card';
import {
  FormikFieldProps,
  LabelComponent,
} from '../Inputs/FormikFieldShoeLace';
import FormWithValidation from './FormWithValidation';
import { Field, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import useTranslator from '../../hooks/useTranslator';
import { useProfilesApi } from '../../hooks/useProfilesApi';
import { useTheme } from '../../hooks/useTheme';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

const PutUserProfileSchema = Yup.object().shape({
  id: Yup.number().required('ID is required').integer('ID must be an integer'),
  userId: Yup.number()
    .required('User ID is required')
    .integer('User ID must be an integer'),
  genderId: Yup.number().integer('Gender ID must be an integer'),
  dateOfBirth: Yup.string().required('Date of Birth is required'),
  nationality: Yup.string().required('Nationality is required'),
  maritalStatusId: Yup.number()
    .required('Marital Status ID is required')
    .integer('Marital Status ID must be an integer'),
  dependents: Yup.number().integer('Dependents must be an integer'),
  emergencyContactId: Yup.number().integer(
    'Emergency Contact ID must be an integer'
  ),
  departmentId: Yup.number().integer('Department ID must be an integer'),
  latestContractId: Yup.number().integer(
    'Latest Contract ID must be an integer'
  ),
  addressLine1: Yup.string().required('Address Line 1 is required'),
  addressLine2: Yup.string().nullable().notRequired(),
  city: Yup.string().required('City is required'),
  state: Yup.string().nullable().notRequired(),
  postalCode: Yup.string().nullable().notRequired(),
  country: Yup.string().required('Country is required'),
  addressType: Yup.string().default('residential'),
});

interface EditUserProfileFormProps {
  genders: GenderResponse[];
  user: UserResponse;
  maritalStatuses: MaritalStatusesResponse[];
}

const fieldConfigs: FormikFieldProps[] = [
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    placeholder: 'Enter your date of birth',
  },
  {
    name: 'nationality',
    label: 'Nationality',
    type: 'text',
    placeholder: 'Enter your nationality',
  },

  {
    name: 'dependents',
    label: 'Dependents',
    type: 'number',
    placeholder: 'Enter number of dependents',
  },
  {
    name: 'addressLine1',
    label: 'Address Line 1',
    type: 'text',
    placeholder: 'Enter your address line 1',
  },
  {
    name: 'addressLine2',
    label: 'Address Line 2',
    type: 'text',
    placeholder: 'Enter your address line 2',
  },
  {
    name: 'city',
    label: 'City',
    type: 'text',
    placeholder: 'Enter your city',
  },
  {
    name: 'state',
    label: 'State',
    type: 'text',
    placeholder: 'Enter your state',
  },
  {
    name: 'postalCode',
    label: 'Postal Code',
    type: 'text',
    placeholder: 'Enter your postal code',
  },
  {
    name: 'country',
    label: 'Country',
    type: 'text',
    placeholder: 'Enter your country',
  },
];

const EditUserProfileForm: React.FC<EditUserProfileFormProps> = ({
  genders,
  user,
  maritalStatuses,
}) => {
  console.log({ maritalStatuses });
  const queryClient = useQueryClient();

  const initialValues: PutProfileRequest = {
    id: user.id || 0,
    userId: user.id || 0,
    genderId: genders.find((gender) => gender.genderName === user.gender)?.id,
    dateOfBirth: user.dateOfBirth || '',
    nationality: user.nationality || '',
    maritalStatusId:
      maritalStatuses.find(
        (maritalStatus) => maritalStatus.statusName === user.maritalStatus
      )?.id ||
      maritalStatuses.find(
        (maritalStatus) => maritalStatus.statusName === 'Single'
      )?.id ||
      1,
    dependents: user.dependents,
    emergencyContactId: undefined,
    departmentId: undefined,
    latestContractId: undefined,
    addressLine1: user.addressLine1 || '',
    addressLine2: user.addressLine2 || null,
    city: user.city || '',
    state: user.state || null,
    postalCode: user.postalCode || null,
    country: user.country || '',
    addressType: '',
  };

  const { getStyles } = useTheme();
  const showToast = useToast();
  const navigate = useNavigate();
  const translator = useTranslator();
  const profileApi = useProfilesApi();
  const selectDropdown = getStyles('selectDropdown');

  const handleSubmit = async (
    values: PutProfileRequest,
    formikHelpers: FormikHelpers<UserRequest>
  ) => {
    const finalData = {
      ...values,
      dateOfBirth: new Date(values.dateOfBirth).toISOString(),
      genderId: Number(values.genderId),
      maritalStatusId: Number(values.maritalStatusId),
    };
    console.log(JSON.stringify(finalData));
    try {
      formikHelpers.setSubmitting(true);
      await profileApi.profilesPut(finalData);
      showToast(translator.global.success, 'success');
      formikHelpers.setSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/profile');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          showToast(error.response.data.message);
        }
      } else {
        showToast(translator.global.something_went_wrong);
      }
    }
  };

  return (
    <Card className="pb-0">
      <h3 className="bg-transparent">Edit Profile</h3>
      <FormWithValidation<PutProfileRequest>
        initialValues={initialValues}
        validationSchema={PutUserProfileSchema}
        fieldConfigs={fieldConfigs}
        onSubmit={handleSubmit}
      >
        {' '}
        <div
          className={`relative w-[225px] md:w-[40%] md:max-w-[40%] flex flex-col h-[62px]`}
        >
          <LabelComponent label={'Select Gender'} />
          <Field
            as="select"
            name="genderId"
            className={`${selectDropdown} min-w-[225px] md:w-full h-[38px] mt-2 mb-2`}
          >
            <option value="">Select Gender</option>{' '}
            {genders.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.genderName}
              </option>
            ))}
          </Field>
        </div>
        <div
          className={`relative w-[225px] md:w-[40%] md:max-w-[40%] flex flex-col my-2 h-[62px]`}
        >
          <LabelComponent label={'Select Marital Status'} />
          <Field
            as="select"
            name="maritalStatusId"
            className={`${selectDropdown} min-w-[225px] md:w-full h-[38px] mt-2 mb-2`}
          >
            <option value="">Select Marital Status</option>{' '}
            {maritalStatuses.map((maritalStatus) => (
              <option key={maritalStatus.id} value={maritalStatus.id}>
                {maritalStatus.statusName}
              </option>
            ))}
          </Field>
        </div>
      </FormWithValidation>
    </Card>
  );
};

export default EditUserProfileForm;
