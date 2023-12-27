import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { UserRequest } from '../../axios';
import FormikField from '../Inputs/FormikField';
import SubmitButton from '../buttons/SubmitButton';
import { useUserApi } from '../../hooks/useUserApi';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import useTranslator from '../../hooks/useTranslator';
import { Icon } from "@iconify/react"


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
            showToast(translator.global.success, "success")
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
                    <FormikField icon={<Icon icon="solar:user-linear" />} name="username" type="text" placeholder={translator.global.username}
                        maxLength={256}
                        additionalClasses="mb-4" />
                    <FormikField icon={<Icon icon="teenyicons:envelope-outline" />} name="email" type="email" placeholder={translator.global.email_address}
                        additionalClasses="mb-4" />
                    <FormikField
                        icon={<Icon icon="mdi:password-outline" />}
                        name="password" type="password"
                        placeholder={translator.global.password}
                        additionalClasses="mb-4" />
                    <FormikField
                        icon={<Icon icon="mdi:card-account-details-outline" />}
                        name="firstName" type="text"
                        placeholder="John"
                        additionalClasses="mb-4" />
                    <FormikField
                        icon={<Icon icon="mdi:card-account-details-outline" />}
                        name="lastName" type="text"
                        placeholder="Smith"
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
