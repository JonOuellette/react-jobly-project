import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";

function JobCard({ id, title, salary, equity, companyName }) {
  console.debug("JobCard");

  // Access context for application status and apply function
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  // Initialize applied state to undefined
  const [applied, setApplied] = useState();

  // Update applied status based on the job ID
  useEffect(() => {
    console.debug("JobCard useEffect updateAppliedStatus", "id=", id);
    setApplied(hasAppliedToJob(id));
  }, [id, hasAppliedToJob]);

  /** Apply for a job */
  async function handleApply(evt) {
    evt.preventDefault();
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    <div className="JobCard card">
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <p>{companyName}</p>
        {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
        {equity !== undefined && <div><small>Equity: {equity}</small></div>}
        <button
            className="btn btn-danger font-weight-bold text-uppercase float-right"
            onClick={handleApply}
            disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}

/** Render integer salary like '$1,250,343' */
function formatSalary(salary) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(salary);
}

export default JobCard;
