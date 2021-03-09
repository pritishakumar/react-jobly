import React, { useState, useEffect, useContext } from "react";
import JobCard from "../jobs/JobCard";
import { useParams } from "react-router-dom";
import JoblyApi from "../helper/api";
import App from '../App';

function CompanyDetail() {
  const { ensureLoggedIn } = useContext(App.AuthFunctionsContext);
  ensureLoggedIn();
  const [ loading, setLoading ] = useState(true);
  const { handle } = useParams();
  const [ companyInfo, setCompanyInfo ] = useState({});
  
  useEffect(() => {
    const loadCompany = async () => {
      const companyObj = await JoblyApi.getCompany(handle);
      setCompanyInfo(companyObj)
    }
    loadCompany();
  }, [])
  
  useEffect(() => {
    if (loading){
      if (Object.keys(companyInfo).length){
        setLoading(false);
      };
    };
  }, [companyInfo])
  
  if (loading) {
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