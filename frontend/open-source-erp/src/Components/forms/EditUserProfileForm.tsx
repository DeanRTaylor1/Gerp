import * as Yup from 'yup';
import {
  GenderResponse,
  PutProfileRequest,
  UserRequest,
  UserResponse,
} from '../../axios';

import Card from '../../layout/Card';
import { FormikFieldProps } from '../Inputs/FormikFieldShoeLace';
import FormWithValidation from './FormWithValidation';
import { Field, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import useTranslator from '../../hooks/useTranslator';
import { useProfilesApi } from '../../hooks/useProfilesApi';
import { useTheme } from '../../hooks/useTheme';

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
  addressLine2: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string(),
  postalCode: Yup.string(),
  country: Yup.string().required('Country is required'),
  addressType: Yup.string().default('residential'),
});

interface EditUserProfileFormProps {
  genders: GenderResponse[];
  user: UserResponse;
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
    name: 'maritalStatusId',
    label: 'Marital Status',
    type: 'number',
    placeholder: 'Enter your marital status ID',
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
}) => {
  const initialValues: PutProfileRequest = {
    id: user.id || 0,
    userId: user.id || 0,
    genderId: genders.find((gender) => gender.genderName === user.gender)?.id,
    dateOfBirth: user.dateOfBirth || '',
    nationality: user.nationality || '',
    maritalStatusId: 0,
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
    console.log(values.dateOfBirth);
    console.log(new Date(values.dateOfBirth).toISOString());
    console.log(typeof values.genderId);
    const finalData = {
      ...values,
      dateOfBirth: new Date(values.dateOfBirth).toISOString(),
      genderId: Number(values.genderId),
    };
    try {
      formikHelpers.setSubmitting(true);
      await profileApi.profilesPut(finalData);
      showToast(translator.global.success, 'success');
      formikHelpers.setSubmitting(false);
      navigate('/profile');
    } catch (error) {
      showToast(translator.global.something_went_wrong);
      console.log({ error });
    }
  };

  return (
    <Card>
      <h3 className="bg-transparent">Edit Profile</h3>
      <FormWithValidation<PutProfileRequest>
        initialValues={initialValues}
        validationSchema={PutUserProfileSchema}
        fieldConfigs={fieldConfigs}
        onSubmit={handleSubmit}
      >
        {' '}
        <Field as="select" name="genderId" className={selectDropdown}>
          <option value="">Select Gender</option>{' '}
          {/* Optional default option */}
          {genders.map((gender) => (
            <option key={gender.id} value={gender.id}>
              {gender.genderName}
            </option>
          ))}
        </Field>
      </FormWithValidation>
    </Card>
  );
};

export default EditUserProfileForm;
