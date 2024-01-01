import * as Yup from 'yup';

import { CreateDepartmentRequest, UserRequest } from '../../../axios';
import { useDepartmentsApi } from '../../../hooks/useDepartmentsApi';
import { useQueryClient } from '@tanstack/react-query';
import { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../hooks/useToast';
import useTranslator from '../../../hooks/useTranslator';
import Card from '../../../layout/Card';
import { Translator } from '../../../locales/Translator';
import { handleApiError } from '../../../utils/error';
import { FormikFieldProps } from '../../Inputs/FormikFieldCustom';
import { InputType } from '../../Inputs/Input.enum';
import FormWithValidation from '../FormWithValidation';
import { finalPagesList } from '../../../router/pages';

const PutUserProfileSchema = Yup.object().shape({
  departmentName: Yup.string().required('Department name is required'),
});

const getFieldConfigsForDepartment = (
  translator: Translator
): Array<FormikFieldProps> => {
  const fieldConfigs: Array<FormikFieldProps> = [
    {
      name: 'departmentName',
      label: translator.global.department,
      icon: 'buildings',
      placeholder: translator.global.department,
      type: InputType.Text,
      additionalClasses: 'mb-4',
    },
  ];

  return fieldConfigs;
};

const AddDepartmentForm: React.FC = () => {
  const queryClient = useQueryClient();

  const initialValues: CreateDepartmentRequest = {
    departmentName: '',
  };

  const showToast = useToast();
  const navigate = useNavigate();
  const translator = useTranslator();
  const departmentsApi = useDepartmentsApi();

  const handleSubmit = async (
    values: CreateDepartmentRequest,
    formikHelpers: FormikHelpers<UserRequest>
  ) => {
    try {
      formikHelpers.setSubmitting(true);
      await departmentsApi.departmentsPost(values);
      showToast(translator.global.success, 'success');
      formikHelpers.setSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ['departments'] });

      navigate(finalPagesList['Manage Departments'].path!);
    } catch (error) {
      handleApiError(error, showToast, translator);
    }
  };

  return (
    <Card overrideClasses="flex flex-col gap-4 justify-center items-center max-w-[60%] w-full h-fit p-4 shadow-md rounded-lg h-fit p-4 shadow-md rounded-lg">
      <h3 className="mt-4 text-3xl font-bold  md:text-5xl">
        {`${translator.global.create} ${translator.global.department}`}
      </h3>{' '}
      <FormWithValidation<CreateDepartmentRequest>
        initialValues={initialValues}
        validationSchema={PutUserProfileSchema}
        fieldConfigs={getFieldConfigsForDepartment(translator)}
        onSubmit={handleSubmit}
        stretchFields={true}
      ></FormWithValidation>
    </Card>
  );
};

export default AddDepartmentForm;
