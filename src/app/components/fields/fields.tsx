import React from "react";
import "./fields.css";

interface FieldProps {
    id: string;
    className?: string;
    labelDescription: string;
    placeholderText?: string;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<any>) => void;
}

interface LookupFieldProps extends FieldProps {
    options: string[];
}

const LookupField: React.FC<LookupFieldProps> = ({ id, value, className, labelDescription, options, onChange }) => (
    <div className={`fields ${className}`}>
        <label htmlFor={id}>{labelDescription}</label>
        <select id={id} className="select" value={value} onChange={onChange}>
            {options.map((option, index) => (
                <option key={index} value={option} style={{ color: 'black' }}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

const TextField: React.FC<FieldProps> = ({ id, className, labelDescription, placeholderText, value, onChange }) => (
    <div className={`fields ${className}`}>
        <label htmlFor={id}>{labelDescription}</label>
        <input type="text" id={id} className="input" placeholder={placeholderText} value={value} onChange={onChange} />
    </div>
);

const NumberField: React.FC<FieldProps> = ({ id, className, value=0.00 ,labelDescription, placeholderText, onChange }) => (
    <div className={`fields ${className}`}>
        <label htmlFor={id}>{labelDescription}</label>
        <input type="number" id={id} name="valor" value={value} min="1.00" step="1.00" className="input" placeholder={placeholderText} onChange={onChange} />
    </div>
);

const DateField: React.FC<FieldProps> = ({ id, className, value, labelDescription, placeholderText, onChange }) => (
    <div className={`fields ${className}`}>
        <label htmlFor={id}>{labelDescription}</label>
        <input type="date" id={id} name="data" className="input" placeholder={placeholderText} onChange={onChange} />
    </div>
);

export { LookupField, TextField, NumberField, DateField };
