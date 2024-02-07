import React, {useState, useEffect} from "react";

import JoblyApi from "../api/api";
import LoadingSpinner from "../LoadingSpinner";

/**Show page with the list of jobs */

function JobList() {
    const [jobs, setJobs] = useState(null);

    useEffect(function getAllJobsOnMount() {
       
        search();
      }, []);

    //Activated by the search form on submit.  Relaods jobs
    async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if (!jobs) return <LoadingSpinner />;

    return(
        <div>
            <Search searchFor={search}/>
            {jobs.length
            ? <JobCardList jobs={jobs} />
            : <p className="lead">Sorry, no results were found!</p>
            }
        </div>

    );
}

export default JobList;