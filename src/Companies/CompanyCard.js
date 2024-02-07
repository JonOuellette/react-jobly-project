import React from "react";
import { Link } from "react-router-dom";

/**Shows a "card" containing company information and is rendered by Company List */

function CompanyCard({name, description, logoUrl, handle}) {
    return (
        <Link>
            <div>
                <h6>{name}
                {logoUrl}
                </h6>
                <p><small>{description}</small></p>
            </div>
        </Link>
    )
}

export default CompanyCard