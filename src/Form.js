import React , {useState} from "react";
import './Form.css';

function Form (){
    //state to store form values
    const [formValues , setFormValues] = useState({
        name : '' , email : '' , password : '',
    });
    //state to store error messages
    const [formErrors , setFormErrors] = useState({});

    //state to manage form submissions

    const [isSubmitted , setIsSubmitted] = useState (
        false
    );

    //handle input change

    const handleInputChange = (event) => {
        const { name,value} = event.target;
        setFormValues({
            ...formValues, [name]: value,
        })
    }

    //form validation function

    const validate = (values) => {
        let errors = {};
        // name validation
        if (!values.name) {
            errors.name= "Name Is Required";
        }

        //email validation

        if (!values.email) {
            errors.email="Email Is Required"
        }
        else if(!/\S+@\S+\.\S+/.test(values.email)){
            errors.email="Email Address Is Invalid"
        }

        // password validation

        const passwordRegex = /^(?=.*[A-Z]{2,})(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/ ; 

        if (!values.password){
            errors.password = "Password Is Required"
        }
        else if(!passwordRegex.test(values.password)){
            errors.password = "Password must br atleast 6 characters, containes 2 uppercase letters, 1 number, and 1 symbol"

        }
        return errors;

    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = validate(formValues);

        setFormErrors(errors);

        if(Object.keys(errors).length===0) {
            setIsSubmitted(true);
        }
    }

    return (
        <div className = "Form">
            <div className = "form-container">
            <h2> React Form Validation</h2>
            {isSubmitted ?(
                <div className = "success-message">
                    Form Submitted Successfully
                    </div>
            ):(
                <form onSubmit = {handleSubmit} noValidate>
       <div className="one">
       <div>
                      <input type = "text" name = "name" value = {formValues.name} onChange = {handleInputChange} placeholder="Enter the Name" />
                        {/* <label htmlFor = "name"> Name</label>                     */}
                        {formErrors.name &&
                        <span className="error">{formErrors.name}</span>
                        }

                    </div> 
                    <div>

                  
                       <input type = "email" name = "email" value = {formValues.email} onChange = {handleInputChange} placeholder="Enter the mail id"/>
                        
                      
                        {formErrors.email &&
                        <span className = "error">{formErrors.email}</span>
                        }
                    </div>
                    <div>
                        <input type = "password" name = "password" value = {formValues.password} onChange = {handleInputChange} placeholder="Password"/>
                                         
                        {formErrors.password &&
                        <span className = "error">{formErrors.password}</span>
                        }

                    </div>
       </div>
                    <button type = "submit">Submit</button>
                </form>
            )}
            </div>
        </div>
    )

}

export default Form;