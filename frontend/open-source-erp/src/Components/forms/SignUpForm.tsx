import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { UserRequest } from '../../axios';
import FormikField from '../Inputs/FormikField';
import SubmitButton from '../buttons/SubmitButton';
import { useUserApi } from '../../hooks/useUserApi';
import { useNavigate } from 'react-router-dom';


const UserRequestSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    firstName: Yup.string().required('You must enter your first name.'),
    lastName: Yup.string().required('You must enter your last name.'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Password is required'),
});

const SignUpForm = () => {
    const api = useUserApi()
    const initialValues: UserRequest = {
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    };

    const navigate = useNavigate()

    const handleSubmit = async (values: UserRequest, formikHelpers: FormikHelpers<UserRequest>) => {
        console.log(values);
        try {
            formikHelpers.setSubmitting(false);
            await api.usersPost(values)
            navigate('/signin')
        } catch (error) {
            //TOAST HERE
            console.error({ error })
        }

    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={UserRequestSchema}
            onSubmit={handleSubmit}
        >
            {() => (
                <Form className='mx-auto mb-4 max-w-sm pb-4'>
                    <FormikField name="username" type="text" placeholder="Username"
                        iconSrc="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f190b7e37f878_EnvelopeSimple.svg"
                        maxLength={256}
                        additionalClasses="mb-4" />
                    <FormikField name="email" type="email" placeholder="Email Address"
                        iconSrc="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f190b7e37f878_EnvelopeSimple.svg"
                        additionalClasses="mb-4" />
                    <FormikField name="password" type="password"
                        placeholder="Password"
                        iconSrc="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f19601037f879_Lock-2.svg"
                        additionalClasses="mb-4" />
                    <FormikField name="firstName" type="text"
                        placeholder="John"
                        iconSrc="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f19601037f879_Lock-2.svg"
                        additionalClasses="mb-4" />
                    <FormikField name="lastName" type="text"
                        placeholder="Smith"
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

export default SignUpForm;
