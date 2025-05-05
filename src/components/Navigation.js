import React from "react";
import { Link } from 'react-router-dom';
import './Navigation.css'
import { useEffect, useState } from "react";
import { fetchUser } from '../api/UserAPI';
import login from '../routes/Login';
import signup from '../routes/SignUp';

function Navigation() {
    const [user, setUser] = useState({});
    const ACCESS_TOKEN = localStorage.getItem('accessToken');

    useEffect(() => {
        if (ACCESS_TOKEN) {
            fetchUser()
            .then((response) => {
                setUser(response);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [ACCESS_TOKEN]);

    const handleLogout = async () => {
        localStorage.clear();
    }

    return (
        <div className="nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            {ACCESS_TOKEN? <Link to="/signup">signup</Link> : <Link to="/login">login</Link>}
        </div>
    )
}

export default Navigation;