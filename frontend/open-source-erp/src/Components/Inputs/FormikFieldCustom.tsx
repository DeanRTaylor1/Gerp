import React from 'react';
import { useField } from 'formik';
import SlInput, {
  type SlInputEvent,
} from '@shoelace-style/shoelace/dist/react/input/index.js';
import { useTheme } from '../../hooks/useTheme';
import type SlInputElement from '@shoelace-style/shoelace/dist/components/input/input.js';
import { InputIconSlot, InputType } from './Input.enum';
import { Option } from './FormikSelectCustom';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon/index.js';

export interface FormikFieldProps {
  name: string;
  label: string;
  type: InputType;
  placeholder: string;
  maxLength?: number;
  icon?: string;
  additionalClasses?: string;
  isSelect?: boolean;
  options?: Option[];
}

export const LabelComponent: React.FC<{ label: string }> = ({ label }) => (
  <div className="absolute top-[-20px] left-0">{label}</div>
);

const FormikFieldCustom: React.FC<FormikFieldProps> = ({
  name,
  type,
  label,
  placeholder,
  icon,
}) => {
  const [field, meta, helpers] = useField(name);
  const themeState = useTheme();
  const inputFormFieldThemeErrors = themeState.getColorClasses(
    'inputFormFieldThemeErrors'
  );

  const handleChange = (event: SlInputEvent) => {
    let data: number | string = (event.target as SlInputElement).value;
    switch (type) {
      case InputType.Number:
        data = Number(data);
        break;
      case InputType.Text:
        break;
    }

    console.log({ data });

    helpers.setValue(data);
  };

  return (
    <div className={`relative w-full md:w-[45%]`}>
      <SlInput
        label={label}
        type={type}
        placeholder={placeholder}
        value={field.value}
        onSlInput={handleChange}
      >
        <SlIcon name={icon} slot={InputIconSlot.Pre}></SlIcon>
      </SlInput>
      {meta.touched && meta.error ? (
        <div className={inputFormFieldThemeErrors}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikFieldCustom;
