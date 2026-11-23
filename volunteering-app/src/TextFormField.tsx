interface TextFormFieldProps {
  label: string; // Label that precedes the input form.
  placeholder: string; // Placeholder text inside of the form.
  
  sensitive: boolean; // If true, masks all data inputted.
  
  required: boolean; // If true, adds the "required" attribute to the form, meaning that-
                    // the form cannot be submitted if this field is blank.
}

TextFormField.defaultProps = {
  label: "Label",
  placeholder: "",
  sensitive: false,
  required: true
}
//TODO: Add a toggleVisibility function that allows switching between 'password' & 'text' types dynamically.
export default function TextFormField({label, placeholder, sensitive, required}: TextFormFieldProps) {

  return (
    // We're returning a div here so that each FormField displays on its own line
    <div className="test">
      <label htmlFor={label}>{label + ": "} </label>
      <input
        type={sensitive ? 'password' : 'text'}
        id={label}
        placeholder={placeholder}
        name={label}
        required={required}
      ></input>
      <p className="error-message"></p>
    </div>
  );
}
