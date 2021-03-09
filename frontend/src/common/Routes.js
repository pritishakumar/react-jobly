import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CompaniesList from "../companies/CompaniesList";
import CompanyDetail from "../companies/CompanyDetail";
import JobsList from "../jobs/JobsList";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import ProfileForm from "../profile/ProfileForm";
import Home from "../home/Home";

function Routes() {
  return (
    <div className="Routes">
      <Switch>
        <Route exact path="/companies">
            <CompaniesList />
        </Route>
        <Route exact path="/companies/:handle">
            <CompanyDetail />
        </Route>
        <Route exact path="/jobs">
            <JobsList />
        </Route>
        <Route exact path="/login">
            <LoginForm />
        </Route>
        <Route exact path="/signup">
            <SignUpForm />
        </Route>
        <Route exact path="/profile">
            <ProfileForm />
        </Route>
        <Route exact path="/">
            <Home />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;