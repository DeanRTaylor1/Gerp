import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  icon: JSX.Element;
  maxLength?: number;
  required?: boolean;
  additionalClasses?: string;
}

const SearchInputField: React.FC<InputFieldProps> = ({
  type,
  name,
  placeholder,
  icon,
  maxLength,
  required,
  additionalClasses,
}) => {
  const [value, setValue] = useState('');

  const handleClear = () => {
    setValue('');
  };

  return (
    <div className={`text-[#333333] relative ${additionalClasses}`}>
      <div className="absolute bottom-0 left-[22%] right-auto top-[33%] inline-block">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-md mb-4 block h-9 w-full border border-gray-300 focus:border-black bg-white px-3 py-6 pl-14 text-sm text-[#333333]"
        maxLength={maxLength}
        name={name}
        placeholder={placeholder}
        required={required}
      />
      {value && (
        <div
          className="absolute right-3 top-[33%] cursor-pointer"
          onClick={handleClear}
        >
          <Icon icon="bi:x" />
        </div>
      )}
    </div>
  );
};

export default SearchInputField;
