import { useState } from "react";
import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import axios from "axios";

const Login = ({setToken}) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    // const axios = require('axios');

    function setToken(userToken) {
        sessionStorage.setItem('token', JSON.stringify(userToken));
    }

    // async function loginUser(credentials) {
    //     return fetch('http://localhost:8080/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(credentials)
    //     })
    //     .then(data => data.json())
    // }

    async function loginUser(credentials) {
        console.log(credentials);
        try {
            const response = await axios.post('http://localhost:3000/members/sign-up', credentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error; // You may handle errors as needed
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);

        console.log("통과!");

        const handleSubmit = async e => {
            e.preventDefault();
            const token = await loginUser({
                username,
                password
            });
            setToken(token);
        }
    }

    // 원본
    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     const token = await loginUser({
    //         username,
    //         password
    //     });
    //     setToken(token);
    // }

    return(
        <form onSubmit={handleSubmit}>
            <img src={`${process.env.PUBLIC_URL}/assets/img4.png`} style={{width: "200px", height: "100px", display: "block", margin: "20px auto 0px auto"}} />
            <label>
                <input className="login_input_box" type="text" onChange={e => setUserName(e.target.value)} placeholder="아이디를 입력해주세요."/>
            </label>
            <label>
                <br></br>
                <input className="login_input_box" type="password"  onChange={e => setPassword(e.target.value)} placeholder="비밀번호를 입력해주세요." />
            </label>
            <div>
                <button type="submit" style={{display: "block", width: "100%", height: "30px", textAlign: "center", marginTop: "10px"}}>회원가입</button>
            </div>
        </form>
    );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;