import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import NavBar from "./common/NavBar";
import Routes from "./common/Routes";
import JoblyApi from "./helper/api";
import AuthFunctionsContext from "./context/AuthFunctionsContext";
import UserContext from "./context/UserContext";
import decode from 'jwt-decode';
import './App.css';

function App() {
  const [ currentUser, setCurrentUser ] = useState({});
  const [ token, setToken ] = useState("")

  const authFunctions = {
    ensureLoggedIn: () => {
      if (!localStorage.getItem("token")){
        return true;
      }
      if (!token){
        setToken(existing => localStorage.getItem("token"));
      }
      if (!currentUser){
        authFunctions.refreshUser(decode(localStorage.getItem("token")).username);
      }
    },
    ensureLoggedOut: () => {
      if(localStorage.getItem("token")){
        return true;
      }},
    login: async (data) => {
      const resultToken = await JoblyApi.login(data);
      setToken(data => resultToken);
      JoblyApi.token = resultToken;
      localStorage.setItem("token", resultToken)
      const currUser = await authFunctions.refreshUser(decode(resultToken).username)
      return resultToken;
    },
    signup: async (data) => {
      const resultToken = await JoblyApi.signup(data);
      setToken(resultToken);
      JoblyApi.token = resultToken;
      localStorage.setItem("token", resultToken);
      const currUser = await authFunctions.refreshUser(decode(resultToken).username)
      return resultToken;
    },
    logout: () => {
      localStorage.removeItem("token");
      setCurrentUser({});
      setToken("");
    },
    refreshUser: async (username) => {
      if (!username) {username = currentUser.username}
      const result = await JoblyApi.fetchUser(username)
      setCurrentUser(existing => result)
  }};


  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={currentUser}>
          <AuthFunctionsContext.Provider value={authFunctions}>
            <NavBar />
            <Routes />
          </AuthFunctionsContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
