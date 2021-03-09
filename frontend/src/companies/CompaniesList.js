import React, { useState, useEffect, useContext } from "react";
import CompanyCard from "./CompanyCard";
import SearchBox from "../common/SearchBox";
import JoblyApi from "../helper/api";
import App from '../App';


function CompaniesList() {
  const { ensureLoggedIn } = useContext(App.AuthFunctionsContext);
  ensureLoggedIn();
  const [ loading, setLoading ] = useState(true)
  const [ companiesList, setCompaniesList ] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      const results = await JoblyApi.getAll("companies");
      setCompaniesList(results);
    }
    getCompanies()
  }, [])

  useEffect(() => {
    if (loading){
      if (companiesList.length){
        setLoading(false);
      };
    };
  }, [companiesList])


  if (loading) {
    return <p>Loading...</p>
  }

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

export default CompaniesList;