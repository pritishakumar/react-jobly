import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JoblyApi from "../helper/api";

/** Display page listing current jobs */
function JobsList() {
	const [ jobsList, setJobsList ] = useState([]);

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

export default JobsList;
