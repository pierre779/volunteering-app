import React, {useState, useEffect} from 'react'
import FormField from './FormField'
import RadioFormField from './RadioFormField'

// TODO: When submit button is pressed, 
// take all inputted form data, pack it all into a JSON file, 
// and send a request with the JSON file as the body to the back-end

const types = ["Volunteer", "Organizer"]

const handleSubmit = (event : any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('Email');
    const password = formData.get('Password');
    const account_type = formData.get('account-type');
    console.log(email);
    console.log(password);
    console.log(account_type);
}

function SignIn() {

    return (
    <>
        <div className="main-cont">
            <div className="form-cont">
                <form onSubmit={handleSubmit}>
                    {/* NOTE: THE ONLY TYPE THAT WORKS RIGHT NOW IS 'text', maybe will expand functionality */}
                    <FormField label='Email' placeholder='example@gmail.com' type='text' required={true}/>
                    <FormField label='Password' placeholder='' type='text' required={true}/>
                    <RadioFormField heading='Account Type: ' options={types} required={true}/>
                    <button type="submit">Submit</button>
                </form>
                
            </div>
        </div>
    </>
    ) 
}

export default SignIn