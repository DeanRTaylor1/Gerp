import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { UserRequest } from '../../axios';
import FormikField from '../Inputs/FormikField';
import SubmitButton from '../buttons/SubmitButton';
import { useUserApi } from '../../hooks/useUserApi';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import useTranslator from '../../hooks/useTranslator';


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

    const showToast = useToast()
    const navigate = useNavigate()
    const translator = useTranslator();

    const handleSubmit = async (values: UserRequest, formikHelpers: FormikHelpers<UserRequest>) => {
        try {
            formikHelpers.setSubmitting(true);
            await api.usersPost(values)
            showToast(translator.global.success)
            formikHelpers.setSubmitting(false);
            navigate('/signin')
        } catch (error) {
            showToast(translator.global.something_went_wrong)
            console.log({ error })
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
                    <FormikField name="username" type="text" placeholder={translator.global.username}
                        iconSrc="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f190b7e37f878_EnvelopeSimple.svg"
                        maxLength={256}
                        additionalClasses="mb-4" />
                    <FormikField name="email" type="email" placeholder={translator.global.email_address}
                        iconSrc="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f190b7e37f878_EnvelopeSimple.svg"
                        additionalClasses="mb-4" />
                    <FormikField name="password" type="password"
                        placeholder={translator.global.password}
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
                        label={translator.global.Submit}
                    />
                </Form>
            )}
        </Formik>
    );
};

export default SignUpForm;
