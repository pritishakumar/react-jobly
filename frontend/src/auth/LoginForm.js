import React, { useState, useEffect, useContext }  from "react";
import { useHistory, Redirect } from "react-router-dom";
import AuthFunctionsContext from "../context/AuthFunctionsContext";

function LoginForm() {
  const { ensureLoggedOut, login } = useContext(AuthFunctionsContext)
  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [ formData, setFormData ] = useState(INITIAL_STATE);
  const history = useHistory();

  useEffect(() => {
    const notAuthorized = ensureLoggedOut();
    if (notAuthorized) { <Redirect to="/companies" />}
    }, [])


  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = async (evt) => {
		evt.preventDefault();
		const result = await login(formData);
    if (result) {
      history.push("/companies")
    } else {
      alert("Error: login unsuccessful");
      setFormData(INITIAL_STATE);
    }	
	};

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
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
			<button>Login</button>
    </form>
  );
}

export default LoginForm;