import React, { useState, useContext }  from "react";
import { useHistory } from "react-router-dom";
import App from '../App';

function LoginForm() {
  const { ensureLoggedOut, login } = useContext(App.AuthFunctionsContext)
  ensureLoggedOut();
  const INITIAL_STATE = {
    username: "",
    password: "",
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