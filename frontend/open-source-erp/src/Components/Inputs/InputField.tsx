import React from 'react';

interface InputFieldProps {
    type: string;
    name: string;
    placeholder: string;
    iconSrc: string;
    maxLength?: number;
    required?: boolean;
    additionalClasses?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    type,
    name,
    placeholder,
    iconSrc,
    maxLength,
    required,
    additionalClasses,
}) => {
    return (
        <div className={`relative ${additionalClasses}`}>
            <img alt="" src={iconSrc} className="absolute bottom-0 left-[5%] right-auto top-[26%] inline-block" />
            <input
                type={type}
                className="mb-4 block h-9 w-full border border-black bg-[#f2f2f7] px-3 py-6 pl-14 text-sm text-[#333333]"
                maxLength={maxLength}
                name={name}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default InputField;
