import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobCardList from "../Jobs/JobCardList";
import LoadingSpinner from "../LoadingSpinner";

/** Company Detail page.  Renders information about the company as well as the available jobs for that company.
 * Uses the useParams hook to extract the 'handle' url parameter
 */

function CompanyDetail() {

    const { handle } = useParams(); //extracts teh handle parameter from teh url 
    const [company, setCompany] = useState(null);

    //fetch company details when the component mounts or the handle changes
    useEffect(function getCompanyandJobs() {
        async function getCompany() {
            //fetch company details using the API and handle
            setCompany(await JoblyApi.getCompany(handle));
        }
        // Calls getCompany to initiate the operation to fetch company data
        getCompany()
    }, [handle]);

    // shows the loading spinner if company data has not loaded yet
    if (!company) return <LoadingSpinner />;

    return (
        <div className="CompanyDetail col-md-8 offset-md-2">
            <h4>{company.name}</h4>
            <p>{company.description}</p>
            <JobCardList jobs={company.jobs} />

        </div>
    )
}

export default CompanyDetail