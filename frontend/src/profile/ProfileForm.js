import React, { useState, useContext }  from "react";
import { useHistory } from "react-router-dom";
import JoblyApi from "../helper/api";
import App from '../App';


function ProfileForm() {
  const { ensureLoggedIn, refreshUser } = useContext(App.AuthFunctionsContext);
  ensureLoggedIn();
  const INITIAL_STATE = {
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  };
  const [ formData, setFormData ] = useState(INITIAL_STATE);
  const history = useHistory();
  const { username } = useContext(App.UserContext);


  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = async (evt) => {
		evt.preventDefault();
		const results = await JoblyApi.patchUser(formData);
    if (results) { // ~~~~~~~~~~~~~
      history.push("/companies")
    } else {
      alert("Error: update unsuccessful");
      setFormData(INITIAL_STATE);
    }
    refreshUser()
	};

  return (
    <form className="ProfileForm" onSubmit={handleSubmit}>
      <label htmlFor="input-username">Username</label>
        <p>{username}</p>
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
      <label htmlFor="input-password">Confirm password to make changes</label>
        <input type="password" name="password" id="input-password"
          value={formData.password} onChange={handleChange}
        />
        <br />
			<button>Save Changes</button>
    </form>
  );
}

export default ProfileForm;