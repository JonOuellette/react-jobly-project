import React from "react";
import { Link, NavLink } from "react-router-dom";


function Navigation(){
    
    function loggedInNav(){
        return(
            <ul>
                <li>
                    <NavLink className="nav-link" to="/companies">
                        Companies
                    </NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/jobs">
                        Jobs
                    </NavLink>

                </li>
                <li>
                    <NavLink className="nav-link" to="/profile">
                        Profile
                    </NavLink>
                </li>
                <li>
                    <Link to="/" onClick = {logout}>
                    Log out {currentUser.username}
                    </Link>
                    
                    
                </li>
            </ul>
        )

    }

    function loggedOutNav(){


    }
    
    return(
    
    );
}

export default Navigation