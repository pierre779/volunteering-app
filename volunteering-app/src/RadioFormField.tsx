import React from "react";

interface RadioFormFieldProps {
  heading: string;
  options: string[];
  required: boolean;
}

export default function RadioFormField({heading, options, required}: RadioFormFieldProps) {
  return (
    <>
      <p>{heading}</p>
      {options.map(
        (item, index) => { 
          let string_id = index.toString();
          return (
          <div key={item}>
            <input type="radio" id={item + string_id} name="account-type" value={item} required={required}></input>
            <label htmlFor={item + string_id}>{item}</label>
          </div>
        ) 
          
        }
      )}
      
    </>
  );
}
