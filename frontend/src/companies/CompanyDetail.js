import React, { useState, useEffect, useContext } from "react";
import JobCard from "../jobs/JobCard";
import { useParams, Redirect } from "react-router-dom";
import JoblyApi from "../helper/api";
import AuthFunctionsContext from "../context/AuthFunctionsContext";

function CompanyDetail() {
  const { ensureLoggedIn } = useContext(AuthFunctionsContext);
  const [ companyInfo, setCompanyInfo ] = useState({});
  const { handle } = useParams();

  useEffect(() => {
    const unauthorized = ensureLoggedIn();
    if (unauthorized) { <Redirect to="/login" />}
    }, [])

  useEffect(() => {
    const loadCompany = async () => {
      const companyObj = await JoblyApi.getCompany(handle);
      setCompanyInfo(companyObj)
    }
    loadCompany();
  }, [])

  
  if (!Object.keys(companyInfo).length) {
    return <p>Loading...</p>
  }

  const { name, description, jobs } = companyInfo;

  return (
    <div className="CompanyDetail">
      <p>{name}</p>
      <p>{description}</p>
      {jobs.map(job => (
        <JobCard 
          key = {job.id}
          job = {[job]} />
      ))}
    </div>
  );
}

export default CompanyDetail;