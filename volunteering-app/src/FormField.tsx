import React, { Fragment } from "react";

interface FormFieldProps {
  label: string;
  placeholder: string;
  type: string;
}

export default function FormField({label, placeholder, type}: FormFieldProps) {
  return (
    <div className="test">
      <label htmlFor={label}>{label + ": "} </label>
      <input
        type={type}
        id={label}
        placeholder={placeholder}
      ></input>
    </div>
  );
}
