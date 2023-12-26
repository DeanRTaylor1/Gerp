import { useTheme } from "../../hooks/useTheme";

interface SelectProps {
    title: string;
    value: string;
    onChange: (item: string) => void
    additionalClasses?: string;
    options: string[]
}
const Select: React.FC<SelectProps> = ({ title, value, onChange, additionalClasses, options }) => {
    const { getStyles } = useTheme();
    const selectStyle = getStyles('selectDropdown');
    return (
        <div className="flex gap-2">
            <label className="flex gap-2 items-center justify-center">
                {title}
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`ml-1 ${selectStyle} ${additionalClasses}`}
                >
                    {options.map((option) => {
                        return (
                            <option value={option}>{option}</option>
                        )
                    })}
                </select>
            </label>
        </div >
    );
}

export default Select