import React from "react";

interface RadioFormFieldProps {
  heading: string;
  options: string[];
}

export default function RadioFormField({heading, options}: RadioFormFieldProps) {
  return (
    <>
      <p>{heading}</p>
      {options.map(
        (item, index) => { 
          let string_id = index.toString();
          return (
          <>
            <input type="radio" id={item + string_id} name={item + string_id}></input>
            <label htmlFor={item + string_id}>{item}</label>
          </>
        ) 
          
        }
      )}
      
    </>
  );
}
