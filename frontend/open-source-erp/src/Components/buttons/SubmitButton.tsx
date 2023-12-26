import React from 'react';
import { useTheme } from '../../hooks/useTheme';

interface SubmitButtonProps {
    label: string;
    icon?: JSX.Element;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
    label,
    icon = (
        <svg className="h-4 w-4 flex-none" fill="currentColor" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg">
            <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
        </svg>
    ),
}) => {
    const { getColorClasses } = useTheme()
    const submitButton = getColorClasses('submitButton')
    return (
        <button
            type="submit"
            className={submitButton}
        >
            <p className="mr-6 font-bold">{label}</p>
            {icon}
        </button>
    );
};

export default SubmitButton;
