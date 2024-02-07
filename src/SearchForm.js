import React, { useState } from "react";

/** Search form that appears on CompanyList and JobList, calls the searchFor prop that is ran in Companylist and JobList to run the search */

function SearchForm({searchFor}) {
    const [searchTerm, setSearchTerm] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        searchFor(searchTerm.trim() || undefined); // handles is attempting to search for just spaces
        setSearchTerm(searchTerm.trim());
    }

    //updates the form fields
    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <input
                    name="searchTerm"
                    placeholder="Enter search term."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>

    )
}

export default SearchForm;