import React, { Component } from 'react'
import FormField from './FormField'
import RadioFormField from './RadioFormField'

// TODO: When submit button is pressed, 
// take all inputted form data, pack it all into a JSON file, 
// and send a request with the JSON file as the body to the back-end

const types = ["Volunteer", "Organizer"]

function SignIn() {

    return (
    <>
        <div className="main-cont">
            <div className="form-cont">
                <form>
                    {/* NOTE: THE ONLY TYPE THAT WORKS RIGHT NOW IS 'text', maybe will expand functionality */}
                    <FormField label='Email' placeholder='example@gmail.com' type='text'/>
                    <FormField label='Password' placeholder='' type='text'/>
                    <RadioFormField heading='Account Type: ' options={types} />
                </form>
                <button type="submit">Submit</button>
            </div>
        </div>
    </>
    ) 
}

export default SignIn