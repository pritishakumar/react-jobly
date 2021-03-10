import React, { useState, useContext }  from "react";
import { useHistory } from "react-router-dom";
import AuthFunctionsContext from "../context/AuthFunctionsContext";

/** Page displays sign up form and handles the logic */
function SignUpForm() {
  const { signup } = useContext(AuthFunctionsContext)

  const INITIAL_STATE = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  };
  const [ formData, setFormData ] = useState(INITIAL_STATE);
  const history = useHistory();
  
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = async (evt) => {
		evt.preventDefault();
		const result = await signup(formData);
    if (result) {
      history.push("/companies")
    } else {
      alert("Error: sign up unsuccessful");
      setFormData(INITIAL_STATE);
    }	
	};

  return (
    <form className="SignUpForm" onSubmit={handleSubmit}>
      <label htmlFor="input-username">Username</label>
        <input name="username" id="input-username"
          value={formData.username} onChange={handleChange}
        />
        <br />
      <label htmlFor="input-password">Password</label>
        <input type="password" name="password" id="input-password"
          value={formData.password} onChange={handleChange}
        />
        <br />
      <label htmlFor="input-firstName">First Name</label>
        <input name="firstName" id="input-firstName"
          value={formData.firstName} onChange={handleChange}
        />
        <br />
      <label htmlFor="input-lastName">Last Name</label>
        <input name="lastName" id="input-lastName"
          value={formData.lastName} onChange={handleChange}
        />
        <br />  
      <label htmlFor="input-email">Email</label>
        <input name="email" id="input-email"
          value={formData.email} onChange={handleChange}
        />
        <br />
			<button>Sign Up</button>
    </form>
  );
}

export default SignUpForm;