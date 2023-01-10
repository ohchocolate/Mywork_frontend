// import React from 'react';
// import { googleLogout } from '@react-oauth/google';

// const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

// function Logout({ setUser }) {
//     const onSuccess = () => {
//         googleLogout();  // helper for logging out
//         setUser(null);
//         localStorage.setItem("login", null);  // clearing local storage
//         console.log('Logout made successfully');
//     };

//     return (
//         <div>
//             <googleLogout
//                 clientId={clientId}
//                 buttonText="Logout"
//                 onLogoutSuccess={onSuccess}
//             ></googleLogout>
//         </div>
//     )
// }

// export default Logout;


import { googleLogout } from "@react-oauth/google";
import { Button } from "react-bootstrap";

export default function Logout({ setUser }) {

    const handleLogout = () => {
        googleLogout();  // helper for logging out
        setUser(null);
        localStorage.setItem("login", null);  // clearing local storage
        console.log('Logout made successfully');
    }

    return (
        <div>
            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
        </div>

    )
}