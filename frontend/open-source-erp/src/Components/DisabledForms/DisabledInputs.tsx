import React from 'react';
import InputField from '../Inputs/InputField';
import { InputIconSlot, InputSize, InputType } from '../Inputs/Input.enum';

export interface FieldConfig {
  name: string;
  icon: string;
  placeholder: string;
  value: string | undefined;
  type?: InputType;
  additionalClasses?: string;
}

interface DisabledInputsProps {
  fields: FieldConfig[];
  vertical: boolean;
}

const DisabledInputs: React.FC<DisabledInputsProps> = ({
  fields,
  vertical,
}) => {
  if (vertical) {
    return (
      <>
        {fields.map((field) => (
          <InputField
            key={field.name}
            name={field.name}
            size={InputSize.Med}
            slot={InputIconSlot.Pre}
            type={field.type || InputType.Text}
            disabled={true}
            placeholder={field.placeholder}
            icon={field.icon}
            value={field.value}
            additionalClasses={field.additionalClasses}
          />
        ))}
      </>
    );
  }

  return (
    <div className="md:flex md:flex-wrap md:-mx-2 w-full">
      {fields.map((field) => (
        <div key={field.name} className="md:w-1/2 px-2">
          <InputField
            name={field.name}
            size={InputSize.Med}
            slot={InputIconSlot.Pre}
            type={field.type || InputType.Text}
            disabled={true}
            placeholder={field.placeholder}
            icon={field.icon}
            value={field.value}
            additionalClasses={field.additionalClasses}
          />
        </div>
      ))}
    </div>
  );
};

export default DisabledInputs;
