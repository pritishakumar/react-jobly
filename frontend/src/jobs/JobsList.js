import React, { useState, useEffect, useContext } from 'react';
import JobCard from './JobCard';
import JoblyApi from "../helper/api";
import AuthFunctionsContext from "../context/AuthFunctionsContext";
import { withRouter, Redirect } from "react-router-dom";

function JobsList() {
	const { ensureLoggedIn } = useContext(AuthFunctionsContext);
  
	const [ jobsList, setJobsList ] = useState([]);

  useEffect(() => {
    const unauthorized = ensureLoggedIn();
    if (unauthorized) {<Redirect to="/login" />}
	}, []);

	useEffect(() => {
		const getJobs = async () => {
			const results = await JoblyApi.getAll("jobs");
			setJobsList(results);
		};
		getJobs();
	}, []);


	if (!jobsList.length) {
		return <p>Loading...</p>;
	}
	return (
		<div className="JobsList">
			<p>JobsList</p>
			{jobsList.map(job => (
        <JobCard 
          key = {job.id}
          job = {[job]} />
      ))}
		</div>
	);
}

export default withRouter(JobsList);
