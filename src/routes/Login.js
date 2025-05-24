import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './Login.module.css';

const Login = ({setToken}) => {
    const [isSignUp, setIsSignUp] = useState(false);

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [email, setUserEmail] = useState();

    const navigate = useNavigate();
    // const axios = require('axios');

    // function setToken(userToken) {
    //     sessionStorage.setItem('token', JSON.stringify(userToken));
    // }

    async function loginUser(credentials, isSignUp) {
        const url = isSignUp 
            ? 'http://localhost:3000/members/sign-up'
            : 'http://localhost:3000/members/sign-in';

        console.log(credentials);
        try {
            const response = await axios.post(url, credentials, {
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

    // 2025.05.24 JOY 회원가입 구현 확인
    const handleSubmit = async e => {
        e.preventDefault();
        const credentials = isSignUp
            ? { username, password, email }
            : { username, password };
        
        try {
            const token = await loginUser(credentials, isSignUp);

            // LocalStorage에 저장 : 홈화면에서 버튼 컨트롤 하기 위해서
            localStorage.setItem('accessToken', token.accessToken);
            localStorage.setItem('refreshToken', token.refreshToken);
            localStorage.setItem('username', token.username);

            console.log("통과!");
            console.log(token);
            navigate('/'); // 로그인 완료 후 홈으로 이동
        } catch (error) {
            alert('로그인 또는 회원가입 실패! 다시 시도해주세요.');
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
                        <input type="email" placeholder="Email" onChange={e => setUserEmail(e.target.value)} />
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
        </div>
    );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;