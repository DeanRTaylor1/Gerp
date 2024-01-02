import * as Yup from 'yup';

import { CreateDepartmentRequest } from '../../../axios';
import { useDepartmentsApi } from '../../../hooks/useDepartmentsApi';
import { useQueryClient } from '@tanstack/react-query';
import { FormikHelpers } from 'formik';
import { useToast } from '../../../hooks/useToast';
import useTranslator from '../../../hooks/useTranslator';
import { Translator } from '../../../locales/Translator';
import { handleApiError } from '../../../utils/error';
import { FormikFieldProps } from '../../Inputs/FormikFieldCustom';
import { InputType } from '../../Inputs/Input.enum';
import FormWithValidation from '../FormWithValidation';
import { ModalContainerProps } from '../../modals/FormModal';

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

const AddDepartmentForm: React.FC<ModalContainerProps> = ({ closeFn }) => {
  const queryClient = useQueryClient();

  const initialValues: CreateDepartmentRequest = {
    departmentName: '',
  };

  const showToast = useToast();
  const translator = useTranslator();
  const departmentsApi = useDepartmentsApi();

  const handleSubmit = async (
    values: CreateDepartmentRequest,
    formikHelpers: FormikHelpers<CreateDepartmentRequest>
  ) => {
    try {
      formikHelpers.setSubmitting(true);
      await departmentsApi.departmentsPost(values);
      showToast(translator.global.success, 'success');
      formikHelpers.setSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ['departments'] });

      closeFn();
    } catch (error) {
      handleApiError(error, showToast, translator);
    }
  };

  return (
    <>
      <FormWithValidation<CreateDepartmentRequest>
        initialValues={initialValues}
        validationSchema={PutUserProfileSchema}
        fieldConfigs={getFieldConfigsForDepartment(translator)}
        onSubmit={handleSubmit}
        stretchFields={true}
      ></FormWithValidation>
    </>
  );
};

export default AddDepartmentForm;
