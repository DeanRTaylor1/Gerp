import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { LoginUserRequest } from '../../axios';
import FormikField from '../Inputs/FormikField';
import SubmitButton from '../buttons/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { useAuthApi } from '../../hooks/useAuthenticationApi';
import { useAuth } from '../../context/useAuth';
import { useToast } from '../../hooks/useToast';
import { Icon } from '@iconify/react';

const LoginRequestSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Password is required'),
});
const SignInForm = () => {
  const authAPi = useAuthApi();
  const { login } = useAuth();
  const showToast = useToast();
  const initialValues: LoginUserRequest = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();

  const handleSubmit = async (
    values: LoginUserRequest,
    formikHelpers: FormikHelpers<LoginUserRequest>
  ) => {
    try {
      formikHelpers.setSubmitting(true);
      const response = await authAPi.authPost(values);
      if (!response.data.data) {
        throw new Error('Something went wrong');
      }
      const access_token = response.data.data.access_token;
      login(access_token);
      formikHelpers.setSubmitting(false);
      navigate('/');
    } catch (error) {
      showToast('Error logging in please try again.');
      console.error({ error });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginRequestSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="mx-auto mb-4 max-w-sm pb-4">
          <FormikField
            name="email"
            type="email"
            placeholder="Email Address"
            icon={<Icon icon="teenyicons:envelope-outline" />}
            additionalClasses="mb-4"
          />
          <FormikField
            name="password"
            type="password"
            placeholder="Password"
            icon={<Icon icon="mdi:password-outline" />}
            additionalClasses="mb-4"
          />

          <SubmitButton label="Login" />
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
