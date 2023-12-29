import React from 'react';
import SlInput from '@shoelace-style/shoelace/dist/react/input/index.js';
import SlIcon from '@shoelace-style/shoelace/dist/react/icon/index.js';
import { InputIconSlot, InputSize, InputType } from './Input.enum';

export interface InputFieldProps {
  type: InputType;
  name: string;
  size: InputSize;
  value?: string;
  placeholder: string;
  icon: string;
  slot: InputIconSlot;
  disabled: boolean;
  maxLength?: number;
  required?: boolean;
  additionalClasses?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  additionalClasses,
  icon,
  type,
  size,
  slot,
  placeholder,
  value = '',
  disabled,
}) => {
  return (
    <div
      className={`flex justify-left items-center relative w-full ${additionalClasses}`}
    >
      <SlInput
        className="w-full"
        placeholder={placeholder}
        size={size}
        value={value}
        type={type}
        disabled={disabled}
      >
        <SlIcon name={icon} slot={slot}></SlIcon>
      </SlInput>
    </div>
  );
};

export default InputField;
