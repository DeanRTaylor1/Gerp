/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';
import {
  GenderResponse,
  MaritalStatusesResponse,
  PutProfileRequest,
  UserRequest,
  UserResponse,
} from '../../axios';

import Card from '../../layout/Card';
import { FormikFieldProps } from '../Inputs/FormikFieldCustom';
import FormWithValidation from './FormWithValidation';
import { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import useTranslator from '../../hooks/useTranslator';
import { useProfilesApi } from '../../hooks/useProfilesApi';
import { useQueryClient } from '@tanstack/react-query';
import { handleApiError } from '../../utils/error';
import { InputType } from '../Inputs/Input.enum';
import {
  getCountryOptions,
  getNationalityOptions,
} from '../../utils/countries';

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
  dependents: Yup.number()
    .integer('Dependents must be an integer')
    .positive('Must be positive'),
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
const getFieldConfigsForUserProfile = (
  genders: Array<GenderResponse>,
  maritalStatuses: Array<MaritalStatusesResponse>
): Array<FormikFieldProps> => {
  const fieldConfigs: Array<FormikFieldProps> = [
    {
      name: 'genderId',
      label: 'Gender',
      icon: 'gender-ambiguous',
      placeholder: 'Gender',
      type: InputType.Text,
      additionalClasses: 'mb-4',
      isSelect: true,
      options: genders.map((gender) => ({
        value: String(gender.id)!,
        label: gender.genderName!,
      })),
    },
    {
      name: 'nationality',
      label: 'Nationality',
      icon: 'globe-europe-africa',
      placeholder: 'Nationality',
      type: InputType.Text,
      additionalClasses: 'mb-4',
      isSelect: true,
      options: getNationalityOptions(),
    },
    {
      name: 'departments',
      label: 'Department',
      icon: 'buildings',
      placeholder: 'Department',
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'dateOfBirth',
      label: 'Date of Birth',
      icon: 'calendar2-event',
      placeholder: 'Date of Birth',
      type: InputType.Date,
      additionalClasses: 'mb-4',
    },
    {
      name: 'maritalStatusId',
      label: 'Marital Status',
      icon: 'heart-half',
      placeholder: 'Marital Status',
      type: InputType.Text,
      additionalClasses: 'mb-4',
      isSelect: true,
      options: maritalStatuses.map((status) => ({
        value: String(status.id)!,
        label: status.statusName!,
      })),
    },
    {
      name: 'dependents',
      label: 'Dependents',
      icon: 'diagram-2',
      placeholder: 'Dependents',
      type: InputType.Number,
      additionalClasses: 'mb-4',
    },
    {
      name: 'addressLine1',
      label: 'Address Line 1',
      icon: 'house',
      placeholder: 'Address Line 1',
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'addressLine2',
      label: 'Address Line 2',
      icon: 'house',
      placeholder: 'Address Line 2',
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'city',
      label: 'City',
      icon: 'buildings',
      placeholder: 'City',
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'state',
      label: 'State/Province',
      icon: 'buildings',
      placeholder: 'State/Province',
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'postalCode',
      label: 'Postal Code',
      icon: 'envelope-open',
      placeholder: 'Postal Code',
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
    {
      name: 'country',
      label: 'Country',
      icon: 'globe-europe-africa',
      placeholder: 'Country',
      type: InputType.Text,
      additionalClasses: 'mb-4',
      isSelect: true,
      options: getCountryOptions(),
    },
  ];

  return fieldConfigs;
};

const EditUserProfileForm: React.FC<EditUserProfileFormProps> = ({
  genders,
  user,
  maritalStatuses,
}) => {
  console.log({ user });
  const queryClient = useQueryClient();

  const initialValues: PutProfileRequest = {
    id: user.profileId || 0,
    userId: user.id || 0,
    genderId: genders.find((gender) => gender.genderName === user.gender)?.id,
    dateOfBirth: new Date(user.dateOfBirth!).toISOString().split('T')[0] || '',
    nationality: user.nationality || '',
    maritalStatusId:
      maritalStatuses.find(
        (maritalStatus) => maritalStatus.statusName === user.maritalStatus
      )?.id ||
      maritalStatuses.find(
        (maritalStatus) => maritalStatus.statusName === 'Single'
      )?.id ||
      1,
    dependents: user.dependents || 0,
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

  const showToast = useToast();
  const navigate = useNavigate();
  const translator = useTranslator();
  const profileApi = useProfilesApi();

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
    try {
      formikHelpers.setSubmitting(true);
      await profileApi.profilesPut(finalData);
      showToast(translator.global.success, 'success');
      formikHelpers.setSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/profile');
    } catch (error) {
      handleApiError(error, showToast, translator);
    }
  };

  return (
    <Card overrideClasses=" max-w-full w-full h-fit p-4 shadow-md rounded-lg h-fit p-4 shadow-md rounded-lg">
      <h3 className="bg-transparent">Edit Profile</h3>
      <FormWithValidation<PutProfileRequest>
        initialValues={initialValues}
        validationSchema={PutUserProfileSchema}
        fieldConfigs={getFieldConfigsForUserProfile(genders, maritalStatuses)}
        onSubmit={handleSubmit}
      ></FormWithValidation>
    </Card>
  );
};

export default EditUserProfileForm;
