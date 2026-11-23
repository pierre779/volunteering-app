// THIS COMPONENT IS DEFUNCT FOR NOW

interface FormFieldProps {
  label: string; // Label that precedes the input form
  placeholder: string; // Placeholder text inside of the form
  type: string; // Type of form (This only works with text, expanding past this might be out of scope)
  
  required: boolean; // If true, adds the "required" attribute to the form, meaning that
                    // the form cannot be submitted if this field is blank
}

export default function FormField({label, placeholder, type, required}: FormFieldProps) {
  return (
    // We're returning a div here so that each FormField displays on its own line
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
