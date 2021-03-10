import React, { useState, useEffect, useContext } from "react";
import JobCard from "../jobs/JobCard";
import { useParams } from "react-router-dom";
import JoblyApi from "../helper/api";

/** Displays page of detailed company information and the jobs
 * listed
 */
function CompanyDetail() {

  const [ companyInfo, setCompanyInfo ] = useState({});
  const { handle } = useParams();

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