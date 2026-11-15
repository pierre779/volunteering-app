import React, { Fragment } from "react";

interface FormFieldProps {
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
}

export default function FormField({label, placeholder, type, required}: FormFieldProps) {
  return (
    <div className="test">
      <label htmlFor={label}>{label + ": "} </label>
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        name={label}
        required={required}
      ></input>
    </div>
  );
}
