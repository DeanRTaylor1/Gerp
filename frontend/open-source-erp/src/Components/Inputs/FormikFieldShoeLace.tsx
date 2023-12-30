import React from 'react';
import { Field, useField } from 'formik';
import { useTheme } from '../../hooks/useTheme';

export interface FormikFieldProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  maxLength?: number;
  additionalClasses?: string;
}

export const LabelComponent: React.FC<{ label: string }> = ({ label }) => (
  <div className="absolute top-[-20px] left-0">{label}</div>
);

const FormikFieldShoeLace: React.FC<FormikFieldProps> = ({
  name,
  type,
  label,
  placeholder,
  maxLength,
  additionalClasses = '',
}) => {
  const themeState = useTheme();
  const inputFormFieldTheme = themeState.getColorClasses('inputFormFieldTheme');
  const inputFormFieldThemeErrors = themeState.getColorClasses(
    `inputFormFieldThemeErrors`
  );
  const [field, meta] = useField(name);

  return (
    <div
      className={`relative w-[225px] md:w-[40%] md:max-w-[40%] flex flex-col  ${additionalClasses}`}
    >
      <LabelComponent label={label} />
      <div className="mt-2 mb-4">
        {' '}
        <Field
          {...field}
          type={type}
          as="input"
          className={inputFormFieldTheme}
          maxLength={maxLength}
          placeholder={placeholder}
        />
      </div>

      {meta.touched && meta.error ? (
        <div className={inputFormFieldThemeErrors}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikFieldShoeLace;
