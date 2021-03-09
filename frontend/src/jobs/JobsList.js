import React, { useState, useEffect, useContext } from 'react';
import JobCard from './JobCard';
import JoblyApi from "../helper/api";
import App from '../App';

function JobsList() {
	const { ensureLoggedIn } = useContext(App.AuthFunctionsContext);
  ensureLoggedIn();
	const [ loading, setLoading ] = useState(true);
	const [ jobsList, setJobsList ] = useState([]);

	useEffect(() => {
		const getJobs = async () => {
			const results = await JoblyApi.getAll("jobs");
			setJobsList(results);
		};
		getJobs();
	}, []);

	useEffect(
		() => {
			if (loading) {
				if (jobsList.length) {
					setLoading(false);
				}
			}
		},
		[ jobsList ]
	);

	if (loading) {
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
