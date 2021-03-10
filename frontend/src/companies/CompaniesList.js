import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import SearchBox from "../common/SearchBox";
import JoblyApi from "../helper/api";

/** Displays list of companies in brief */
function CompaniesList() {
  const [ companiesList, setCompaniesList ] = useState([]);

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