import React, { useContext } from "react";
import JoblyApi from "../helper/api";
import AuthFunctionsContext from "../context/AuthFunctionsContext";
import UserContext from "../context/UserContext";

function JobCard({ job }) {
  const user = useContext(UserContext);
  const { refreshUser } = useContext(AuthFunctionsContext);
  
  const { id, title, salary, equity } = job[0];

  const handleApply = async (evt) => {
    const jobId = evt.target.parentElement.dataset.id;
    const username = user.username;
    const resultApply = await JoblyApi.applyJob(username, jobId);
    refreshUser();
  }

  return (
    <div className="JobCard" data-id={id}>
      <p>{title}</p>
      <p>{salary}</p>
      <p>{equity}</p>
      {(user.applications && user.applications.includes(id)) ? 
        <button disabled>Applied</button> :
        <button onClick={handleApply}>Apply</button>}
    </div>
  );
}

export default JobCard;