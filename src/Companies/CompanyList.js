import React, {useState, useEffect} from "react";
import SearchForm from "../SearchForm";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../LoadingSpinner";

/** Shows page with the list of companies.  
 * Loads companies from the API.
 * 
 * Routes to /companies
 */

function CompanyList(){
    const [companies, setCompanies] = useState(null);

    useEffect(function getCompaniesOnMount() {
        search();
    }, []);

    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    if (!companies) return <LoadingSpinner/>;

    return (
        <div>
            <SearchForm searchFor={search}/>
            {companies.length ? (
                <div>
                    {companies.map(c => (
                        <CompanyCard
                            key={c.handle}
                            handle={c.handle}
                            name={c.name}
                            description={c.description}
                            logoUrl={c.logoUrl}
                        />
                    ))}
                </div>
            ) : (
                <p> Sorry, no results were found </p>
            )}

        </div>
    );
}

export default CompanyList