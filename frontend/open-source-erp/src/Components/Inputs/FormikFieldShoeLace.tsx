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

const FormikFieldShoeLace: React.FC<FormikFieldProps> = ({
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
        className={`
        block w-full
        py-1.5 px-3
        border-[var(--sl-input-border-width)] 
        border-[var(--sl-input-border-color)]
        rounded-[var(--sl-input-border-radius-medium)]
        bg-[var(--sl-input-background-color)]
        text-[var(--sl-input-font-size-medium)]
        text-[var(--sl-input-color)]
        placeholder-[var(--sl-input-placeholder-color)]
        ${meta.touched && meta.error ? 'border-red-500' : ''} 
        focus:border-[var(--sl-input-border-color-focus)]
        focus:ring-[var(--sl-input-focus-ring-color)]
        focus:ring-offset-[var(--sl-input-focus-ring-offset)]
    `}
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

export default FormikFieldShoeLace;
