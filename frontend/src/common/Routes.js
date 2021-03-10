import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CompaniesList from "../companies/CompaniesList";
import CompanyDetail from "../companies/CompanyDetail";
import JobsList from "../jobs/JobsList";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import ProfileForm from "../profile/ProfileForm";
import Home from "../home/Home";
import PrivateRoute from "./PrivateRoute";

function Routes() {
  return (
    <div className="Routes">
      <Switch>
        <PrivateRoute exact path="/companies">
            <CompaniesList />
        </PrivateRoute>
        <PrivateRoute exact path="/companies/:handle">
            <CompanyDetail />
        </PrivateRoute>
        <PrivateRoute exact path="/jobs">
            <JobsList />
        </PrivateRoute>
        <Route exact path="/login">
            <LoginForm />
        </Route>
        <Route exact path="/signup">
            <SignUpForm />
        </Route>
        <PrivateRoute exact path="/profile">
            <ProfileForm />
        </PrivateRoute>
        <Route exact path="/">
            <Home />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;