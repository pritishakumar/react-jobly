import React, { useContext } from "react";
import JoblyApi from "../helper/api";
import App from '../App';

function JobCard({ job }) {
  const { applications } = useContext(App.UserContext);
  const { refreshUser } = useContext(App.AuthFunctionsContext);
  
  const { id, title, salary, equity } = job[0];
  const appliedStatus = applications.includes(id);

  const handleApply = async (evt) => {
    const jobId = evt.target.parentElement.dataset.id;
    const username = "testuser";
    const resultApply = await JoblyApi.applyJob(username, jobId);
    refreshUser();
  }

  return (
    <div className="JobCard" data-id={id}>
      <p>{title}</p>
      <p>{salary}</p>
      <p>{equity}</p>
      {(appliedStatus) ? 
        <button disabled>Applied</button> :
        <button onClick={handleApply}>Apply</button>}
    </div>
  );
}

export default JobCard;