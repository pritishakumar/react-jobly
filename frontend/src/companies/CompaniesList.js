import React, { useState, useEffect, useContext, useCallback } from "react";
import CompanyCard from "./CompanyCard";
import SearchBox from "../common/SearchBox";
import JoblyApi from "../helper/api";
import AuthFunctionsContext from "../context/AuthFunctionsContext";
import { withRouter, Redirect } from "react-router-dom";


function CompaniesList() {
  const [ companiesList, setCompaniesList ] = useState([]);
  const ensureLoggedIn = useContext(AuthFunctionsContext).ensureLoggedIn;

  useEffect(() => {
    const notAuthorized = ensureLoggedIn();
    if (notAuthorized) { <Redirect to="/login" />}
    }, [])

  useEffect(() => {
    const getCompanies = async () => {
      const results = await JoblyApi.getAll("companies");
      setCompaniesList(results);
    }
    getCompanies()
  }, [])

  if (!companiesList.length) {
    return <p>Loading...</p>
  } else {
    return (
      <div className="CompaniesList">
        <SearchBox 
          type="companies" 
          setFunction={setCompaniesList}/>
        {companiesList.map(company => (
          <CompanyCard 
            key={company.handle}
            company = {[company]} 
          />
        ))}
      </div>
    );
  }
}

export default CompaniesList;