import React from "react";

//Component that handles alerts

function Alert({type = "danger", message = []}) {
    return (
        <div>
            {message.map(error => (
                <p key = {error}> {error}</p>
                
            ))}
        </div>
    )

}

export default Alert