/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { LoginUserRequest, LoginUserResponse } from '../../axios';
import FormikField from '../Inputs/FormikField';
import SubmitButton from '../buttons/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { useAuthApi } from '../../hooks/useAuthenticationApi';
import { useAuth } from '../../context/useAuth';
import { useToast } from '../../hooks/useToast';
import { Icon } from '@iconify/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { handleApiError } from '../../utils/error';
import useTranslator from '../../hooks/useTranslator';

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
  const queryClient = useQueryClient();
  const translator = useTranslator();

  const loginUser = async (loginData: LoginUserRequest) => {
    return authAPi.authPost(loginData);
  };

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: AxiosResponse<LoginUserResponse, any>) => {
      const access_token = data?.data?.data?.access_token;
      login(access_token!);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/');
    },
    onError: (error) => {
      handleApiError(error, showToast, translator);
    },
  });

  const handleSubmit = async (
    values: LoginUserRequest,
    formikHelpers: FormikHelpers<LoginUserRequest>
  ) => {
    formikHelpers.setSubmitting(true);
    loginMutation.mutate(values, {
      onSettled: () => {
        formikHelpers.setSubmitting(false);
      },
    });
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
