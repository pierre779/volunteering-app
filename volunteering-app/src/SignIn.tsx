// Custom Components
import FormField from './FormField'
import RadioFormField from './RadioFormField'


// Form will automatically update to reflect the values in this list
const types = ["Volunteer", "Organizer"]

// This constant should hold the URL where we're sending the sign-up data
const apiURL = 'http://localhost:5000/api/v1/signup'

// This function runs when the "Submit" button is pressed
const handleSubmit = (event : any) => {
    // Prevents default behavior of a submit button
    event.preventDefault();

    // Returns an object that holds all data inputted into our fields
    const formData = new FormData(event.currentTarget);

    // Grabs specific data needed from the formData object
    const email = formData.get('Email');
    const password = formData.get('Password');
    const account_type = formData.get('account-type');

    // The data is turned into a JSON object to be sent over to the back-end
    const signup_JSON = 
        {
            "email" : email,
            "password": password,
            "account_type": account_type
        }
    
    // Debug messages
    console.log(email);
    console.log(password);
    console.log(account_type);
    
    // TODO: Send a request with the JSON data as the body to the back-end
    // Creates a function that sends a request to our back-end & prints the result
    const fetchData = async ()=> {
        const request_result = await fetch(apiURL, {
            method: "POST",
            body: JSON.stringify(signup_JSON)
        });

        if (request_result.ok) {
            window.location.pathname += '/dashboard'
        } else {
            if (request_result.status == 500) {
                // console.log(request_result.text);
            }
        }
        return request_result;
    }
    
    // Runs the function
    fetchData();

    
}

// Sign-Up Panel
export default function SignUp() {

    return (
    <>
        <div className="main-cont">
            <div className="form-cont">
                {/* We use form here because it allows us a suite of functions that lets us collect the data easily */}
                <form onSubmit={handleSubmit}>
                    {/* NOTE: THE ONLY FORMFIELD TYPE THAT WORKS RIGHT NOW IS 'text', maybe will expand functionality later */}
                    {/* FOR MORE INFO, LOOK AT FormField.tsx */}
                    <FormField 
                        label='Email' 
                        placeholder='example@gmail.com' 
                        type='text' required={true}
                    />
                    <FormField 
                        label='Password' 
                        placeholder='' 
                        type='text' 
                        required={true}
                    />
                    {/* FOR MORE INFO, LOOK AT RadioFormField.tsx */}
                    <RadioFormField 
                        heading='Account Type: ' 
                        options={types} 
                        required={true}
                    />
                    <button type="submit">Submit</button>
                </form>
                
            </div>
        </div>
    </>
    ) 
}

