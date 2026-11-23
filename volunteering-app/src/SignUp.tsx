// Custom Components
import TextFormField from './TextFormField'


// This constant should hold the URL where we're sending the sign-up data
const apiURL = 'http://localhost:5000/api/v1/signup'

// This function runs when the "Submit" button is pressed
const handleSubmit = (event : any) => {
    // Prevents default behavior of a submit button
    event.preventDefault();

    // Returns an object that holds all data inputted into our fields
    const formData = new FormData(event.currentTarget);

    // Grabs specific data needed from the formData object
    const first_name = formData.get('First Name');
    const last_name = formData.get('Last Name');
    const email = formData.get('Email');
    const password = formData.get('Password');

    // TODO: Encrypt password & put the hash of the encrypted password into the JSON
    // Q: Should we encrypt everything or just the password?
    // The data is turned into a JSON object to be sent over to the back-end
    const signup_JSON = 
        {
            "first_name": first_name,
            "last_name": last_name,
            "email" : email,
            "password": password
        }
    
    // Debug messages
    console.log(email);
    console.log(password);
    
   
    // Creates a function that sends a POST request to our back-end
     const sendData = async ()=> {

        // Send POST request and store response
        const request_result = await fetch(apiURL, {
            method: "POST",
            body: JSON.stringify(signup_JSON),
            headers: {
                // Tells back-end we're sending JSON data
                "Content-Type": "application/json" 
            }
        });

        // If successful response
        if (request_result.ok) {
            // Grab text from response
            const tst = await request_result.text()
            if (tst == "Good") {
                // Sends the user to the dashboard
                // window.location.pathname += 'dashboard'
            }
        } else {
            if (request_result.status == 500) {
                console.log(request_result);
            }

            console.log(request_result);
        }
        return request_result;
    }
    
    
    // Runs the function
    sendData();
}

function validateField(field : any) {
    if (!field.validity.valid) {
        return false;
    }
}

// TODO: Allow to user to go from this page directly to the sign-in page (Likely through a link)
// Sign-Up Panel
export default function SignUp() {

    return (
    <>
        <div className="main-cont">
            <div className="form-cont">
                {/* We use form here because it allows us a suite of functions that lets us collect the data easily */}
                <form onSubmit={handleSubmit}>
                    <TextFormField 
                        label='First Name' 
                        placeholder='John'
                    />
                    <TextFormField 
                        label='Last Name' 
                        placeholder='Doe' 
                    />
                    <TextFormField 
                        label='Email' 
                        placeholder='example@gmail.com' 
                    />
                    {/* TODO: Add ability to toggle password visibility */}
                    <TextFormField 
                        label='Password' 
                        sensitive={true} 
                    />
                    <TextFormField 
                        label='Confirm Password' 
                    />
                    <button type="submit">Create Account</button>
                </form>
                
            </div>
        </div>
    </>
    ) 
}




