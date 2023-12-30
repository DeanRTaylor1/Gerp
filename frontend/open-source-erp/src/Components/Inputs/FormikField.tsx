import React from 'react';
import { Field, useField } from 'formik';

interface FormikFieldProps {
  name: string;
  type: string;
  placeholder: string;
  icon: React.ReactElement;
  maxLength?: number;
  additionalClasses?: string;
}

const FormikField: React.FC<FormikFieldProps> = ({
  name,
  type,
  placeholder,
  icon,
  maxLength,
  additionalClasses = '',
}) => {
  const [field, meta] = useField(name); // Use Formik's useField hook

  return (
    <div className={`relative w-[350px] ${additionalClasses}`}>
      <div className="text-[#333333] absolute bottom-0 left-[5%] right-auto top-[33%] inline-block">
        {icon}
      </div>
      <Field
        {...field}
        type={type}
        as="input"
        className={`mb-4 block h-9 w-full border ${
          meta.touched && meta.error ? 'border-red-500' : 'border-black'
        } bg-[#f2f2f7] px-3 py-6 pl-14 text-sm text-[#333333]`}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      {meta.touched && meta.error ? (
        <div className="absolute right-0 top-0 mt-5 mr-4 text-red-500 text-xs italic">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default FormikField;
