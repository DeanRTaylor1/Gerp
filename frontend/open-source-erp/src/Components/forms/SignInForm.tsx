import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { LoginUserRequest } from '../../axios';
import FormikField from '../Inputs/FormikField';
import SubmitButton from '../buttons/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { useAuthApi } from '../../hooks/useAuthenticationApi';
import { useAuth } from '../../context/useAuth';


const LoginRequestSchema = Yup.object().shape({
    email: Yup.string().required('Required'),
    password: Yup.string().required('Password is required'),
});
const SignInForm = () => {
    const authAPi = useAuthApi()
    const { login } = useAuth()
    const initialValues: LoginUserRequest = {
        email: '',
        password: '',
    };

    const navigate = useNavigate()

    const handleSubmit = async (values: LoginUserRequest, formikHelpers: FormikHelpers<LoginUserRequest>) => {
        console.log(values);
        try {
            formikHelpers.setSubmitting(false);
            const data = await authAPi.authPost(values)
            if (!data.data.data) {
                throw new Error("Something went wrong")
            }
            const access_token = data.data.data.access_token
            login(access_token)
            navigate('/')
        } catch (error) {
            //TOAST HERE
            console.error({ error })
        }

    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={LoginRequestSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form className='mx-auto mb-4 max-w-sm pb-4'>
                    <FormikField name="email" type="email" placeholder="Email Address"
                        iconSrc="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f190b7e37f878_EnvelopeSimple.svg"
                        additionalClasses="mb-4" />
                    <FormikField name="password" type="password"
                        placeholder="Password"
                        iconSrc="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f19601037f879_Lock-2.svg"
                        additionalClasses="mb-4" />

                    <SubmitButton
                        label="Login"
                    />
                </Form>
            )}
        </Formik>
    );
};

export default SignInForm;
