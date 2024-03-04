import {BaseSyntheticEvent} from "react";

const InputField = ({id, label, type, placeholder, autoComplete, value, onChange, error} : {
    id: string,
    label: string,
    type: string,
    placeholder?: string,
    autoComplete?: string,
    value?: string,
    onChange: (e : BaseSyntheticEvent) => void,
    error?: string | null
}) => {
    return (

        <div className="max-w-96">
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-text-light">
                {label}
            </label>
            <div className="mt-2">
                <input
                    formNoValidate={true}
                    onChange={onChange}
                    id={id}
                    name={id}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    value={value}
                    className="block w-full rounded-md border-0 py-1.5 font-semibold bg-body-bg-hover text-text-light placeholder:text-text-gray focus:ring-2 focus:ring-inset focus:ring-accent text-small"
                />
                {error !== null && (
                    <p className="text-small text-text-light font-bold bg-red-900 text-center rounded">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
};

export default InputField;
