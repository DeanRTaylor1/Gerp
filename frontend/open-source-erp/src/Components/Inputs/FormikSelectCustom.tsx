import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import SlSelect, {
  type SlChangeEvent,
} from '@shoelace-style/shoelace/dist/react/select/index.js';
import SlOption from '@shoelace-style/shoelace/dist/react/option/index.js';
import type SlSelectElement from '@shoelace-style/shoelace/dist/components/select/select.js';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon/index.js';
import { InputIconSlot } from './Input.enum';
import { FormikFieldProps } from './FormikFieldCustom';

export interface Option {
  value: string;
  label: string;
}

interface FormikShoelaceSelectProps extends Partial<FormikFieldProps> {
  options: Option[];
  multiple?: boolean;
  clearable?: boolean;
  fieldConfig: FieldHookConfig<string>;
}

export const FormikShoelaceSelect: React.FC<FormikShoelaceSelectProps> = ({
  options,
  label,
  fieldConfig,
  icon,
}) => {
  const [field, meta, helpers] = useField<string>(fieldConfig);

  const handleChange = (event: SlChangeEvent) => {
    const value = (event.target as SlSelectElement).value;
    field;
    helpers.setValue(value as string);
  };

  return (
    <>
      {' '}
      <div className="formik-shoelace-select w-full md:w-[45%]">
        <SlSelect
          className="custom-select"
          label={label}
          value={String(field.value)}
          onSlChange={(e) => handleChange(e)}
        >
          <SlIcon name={icon} slot={InputIconSlot.Pre}></SlIcon>

          {options.map((option) => (
            <SlOption key={option.value} value={option.value}>
              {option.label}
            </SlOption>
          ))}
        </SlSelect>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};
