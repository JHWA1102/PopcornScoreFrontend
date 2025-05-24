import React from "react";
import { Link } from 'react-router-dom';
import './Navigation.css'
import { useEffect, useState } from "react";
import { fetchUser } from '../api/UserAPI';
import login from '../routes/Login';
import signup from '../routes/SignUp';

function Navigation() {
    const [username, setUsername] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     const token = localStorage.getItem('accessToken');
    //     const storedUsername = localStorage.getItem('username');


    //     // if (ACCESS_TOKEN) {
    //     //     fetchUser()
    //     //     .then((response) => {
    //     //         setUser(response);
    //     //     }).catch((error) => {
    //     //         console.log(error);
    //     //     });
    //     // }
    //     if (token && storedUsername) {
    //         setIsLoggedIn(true);
    //         setUsername(storedUsername);
    //     } else {
    //         setIsLoggedIn(false);
    //         setUsername(null);
    //     }
    // }, []);

    useEffect(() => {
    const interval = setInterval(() => {
        const token = localStorage.getItem('accessToken');
        const storedUsername = localStorage.getItem('username');
        if (token && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        } else {
            setIsLoggedIn(false);
            setUsername(null);
        }
    }, 1000); // 1초마다 확인

    return () => clearInterval(interval); // cleanup
    }, []);

    const handleLogout = async () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUsername(null);
        window.location.href = '/popcornscore';
    }

    return (
        <div className="nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            {isLoggedIn && username ? (
                <>
                    <span style={{ pointerEvents: 'none', color: 'gray', marginLeft: '10px' }}>
                        {username} 님
                    </span>
                    <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    {/* <Link to="/signup" style={{ marginLeft: '10px' }}>Sign Up</Link> */}
                </>
            )}   
            {/* {ACCESS_TOKEN && user ? <Link to="/signup">signup</Link> : <Link to="/login">login</Link>} */}
        </div>
    )
}

export default Navigation;