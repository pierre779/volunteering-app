interface RadioFormFieldProps {
  heading: string; // Text that displays above all options
  options: string[]; // List of options to be displayed
  required: boolean; // If true, adds the "required" attribute to the form, meaning that
                      // the form cannot be submitted if this field is blank
}

// NOTE: This implementation is flawed as you will not be able to pick different options in 
// separate RadioFormFields within the same form since the name of every single input option
// is hard-coded to "account-type". 

// I did this purely to save time & get the RadioFormField working in our specific instance. 
// We might have to fix this later.
export default function RadioFormField({heading, options, required}: RadioFormFieldProps) {
  return (
    <>
      <p>{heading}</p>
      {options.map((item, index) => {
        let string_id = index.toString();
        return (
          <div key={item}>
            <input
              type="radio"
              id={item + string_id}
              name="account-type"
              value={item}
              required={required}
            ></input>
            <label htmlFor={item + string_id}>{item}</label>
          </div>
        );
      })}
    </>
  );
}
