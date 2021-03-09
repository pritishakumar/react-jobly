import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import NavBar from "./common/NavBar";
import Routes from "./common/Routes";
import JoblyApi from "./helper/api";
import './App.css';

function App() {
  const [ currentUser, setCurrentUser ] = useState({});
  const [ token, setToken ] = useState("")

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser, token]);

  const authFunctions = {
    ensureLoggedIn: () => {
      if (!localStorage.getItem("token") || !localStorage.getItem("currentUser")){
        <Redirect to="/login" />
      } else {
        if ((Object.keys(currentUser).length) == 0 || !token){
          setToken(localStorage.getItem("token"));
          setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
        }}},
    ensureLoggedOut: () => {
      if(localStorage.getItem("token") && localStorage.getItem("currentUser")){
        <Redirect to="/companies" />
      }},
    login: async (data) => {
      const resultToken = await JoblyApi.login(data);
      setToken(resultToken.token);
      const resultUser = await JoblyApi.fetchUser(data.username);
      setCurrentUser(resultUser)
      return resultToken.token;
    },
    signup: async (data) => {
      const resultToken = await JoblyApi.signup(data);
      setToken(resultToken.token);
      const resultUser = await JoblyApi.fetchUser(data.username);
      setCurrentUser(resultUser)
      return resultToken.token;
    },
    logout: () => {
      setCurrentUser({});
      setToken("");
    },
    refreshUser: async () => {
      const result = await JoblyApi.fetchUser(currentUser.username)
      setCurrentUser(result.user)
  }};

  const UserContext = React.createContext();
  const AuthFunctionsContext = React.createContext();
  

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{currentUser}}>
          <AuthFunctionsContext.Provider value={{authFunctions}}>
            <NavBar />
            <Routes />
          </AuthFunctionsContext.Provider>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
