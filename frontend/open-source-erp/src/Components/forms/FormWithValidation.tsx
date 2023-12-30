/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import FormikFieldShoeLace, {
  FormikFieldProps,
} from '../Inputs/FormikFieldShoeLace';
import useTranslator from '../../hooks/useTranslator';
import ShoeLaceCustomButton from '../buttons/ShoeLaceCustomButton';

interface FormWithValidationProps<T extends FormikValues> {
  children: React.ReactNode;
  initialValues: T;
  validationSchema: Yup.ObjectSchema<T>;
  fieldConfigs: FormikFieldProps[];
  onSubmit: (...args: any[]) => void;
}

function FormWithValidation<T extends FormikValues>({
  children,
  initialValues,
  validationSchema,
  fieldConfigs,
  onSubmit,
}: FormWithValidationProps<T>) {
  const translator = useTranslator();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="w-full mt-8 mb-4 items-center justify-center pb-4 flex flex-col md:flex-row md:flex-wrap gap-4 ">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="w-full items-center justify-center  flex flex-col md:flex-row md:flex-wrap gap-4">
              {fieldConfigs.map((fieldConfig, index) => (
                <FormikFieldShoeLace
                  key={fieldConfig.name + index}
                  {...fieldConfig}
                />
              ))}
              {children}
            </div>
            <ShoeLaceCustomButton type="submit" icon="check-lg">
              {translator.global.Submit}
            </ShoeLaceCustomButton>{' '}
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FormWithValidation;
