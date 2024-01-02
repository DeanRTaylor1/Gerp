/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import * as Yup from 'yup';
import useTranslator from '../../hooks/useTranslator';
import ShoeLaceCustomButton from '../buttons/ShoeLaceCustomButton';
import FormikFieldCustom, {
  FormikFieldProps,
} from '../Inputs/FormikFieldCustom';
import { FormikShoelaceSelect } from '../Inputs/FormikSelectCustom';

interface FormWithValidationProps<T extends FormikValues> {
  children?: React.ReactNode;
  initialValues: T;
  validationSchema: Yup.ObjectSchema<T>;
  fieldConfigs: FormikFieldProps[];
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => Promise<void>;
  stretchFields?: boolean;
}

function FormWithValidation<T extends FormikValues>({
  children,
  initialValues,
  validationSchema,
  fieldConfigs,
  onSubmit,
  stretchFields,
}: FormWithValidationProps<T>) {
  const translator = useTranslator();
  // const handleSubmit = (values: T) => {
  //   console.log({ values });
  //   onSubmit(values);
  // };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="w-full mt-8 mb-4 items-center justify-center pb-4 flex flex-col md:flex-row md:flex-wrap gap-4 ">
          <div
            className={`flex flex-col items-center justify-center gap-8 ${
              stretchFields ? 'w-full' : ''
            }`}
          >
            <div className="w-full items-center justify-center flex flex-col md:flex-row md:flex-wrap gap-4">
              {fieldConfigs.map((fieldConfig, index) => {
                if (fieldConfig.isSelect) {
                  return (
                    <FormikShoelaceSelect
                      key={fieldConfig.name + index}
                      fieldConfig={{ name: fieldConfig.name }}
                      label={fieldConfig.label}
                      icon={fieldConfig.icon}
                      options={fieldConfig.options!}
                    />
                  );
                } else {
                  return (
                    <FormikFieldCustom
                      key={fieldConfig.name + index}
                      {...fieldConfig}
                    />
                  );
                }
              })}
              {children}
            </div>
            <ShoeLaceCustomButton type="submit" icon="check-lg">
              {translator.global.Submit}
            </ShoeLaceCustomButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FormWithValidation;
