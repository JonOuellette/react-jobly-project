import React, {useState, useEffect} from "react";
import JobCardList from "./JobCardList";
import SearchForm from "../SearchForm"
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
    // if no jobs are loaded in display loading spinner
    if (!jobs) return <LoadingSpinner />;

    return(
        // Renders search component and passes in the searchFor prop
        //if jobs.length is truthy, the JobCardList component is rendered.  If falsy, displays no results found message
        <div className="JobList col-md-8 offset-md-2">
            <SearchForm searchFor={search}/>
            {jobs.length
            ? <JobCardList jobs={jobs} />
            : <p className="lead">Sorry, no results were found!</p>
            }
        </div>

    );
}

export default JobList;