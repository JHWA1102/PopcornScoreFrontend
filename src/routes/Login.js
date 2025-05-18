import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import axios from "axios";
import styles from './Login.module.css';

const Login = ({setToken}) => {
    const [isSignUp, setIsSignUp] = useState(false);

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
        <div>
            <h2>Weekly Coding Challenge #1: Sign in/up Form</h2>
            <div className={`${styles.container} ${isSignUp ? styles['right-panel-active'] : ''}`}>
            <div className={`${styles['form-container']} ${styles['sign-up-container']}`}>
                    <form onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <div className={styles['social-container']}>
                            <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" onChange={e => setUserName(e.target.value)} />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className={`${styles['form-container']} ${styles['sign-in-container']}`}>
                    <form onSubmit={handleSubmit}>
                        <h1>Sign in</h1>
                        <div className={styles['social-container']}>
                            <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    <span>or use your account</span>
                    <input type="text" placeholder="Username" onChange={e => setUserName(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <a href="#">Forgot your password?</a>
                    <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className={styles['overlay-container']}>
                    <div className={styles.overlay}>
                    <div className={`${styles['overlay-panel']} ${styles['overlay-left']}`}>
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className={`${styles.ghost}`} onClick={() => setIsSignUp(false)}>Sign In</button>
                        </div>
                        <div className={`${styles['overlay-panel']} ${styles['overlay-right']}`}>
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className={`${styles.ghost}`} onClick={() => setIsSignUp(true)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <form onSubmit={handleSubmit}>
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
            </form> */}
        </div>
    );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;