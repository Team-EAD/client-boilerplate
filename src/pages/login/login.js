

import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom';

const Login = ({ onLogin, showSignupForm, loginError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [userRole, setUserRole] = useState('backofficer'); // Default role
  const [loginAlert, setLoginAlert] = useState(loginError || null);
  const history = useHistory(); 

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:44304/api/auth/login', {
        username: username,
        password: password,
      });
  
      const token = response.data.token;
      const userRole = response.data.roles;
  
      console.log('Response Data:', response.data); // Log the entire response data
      console.log('User Role:', userRole);
  
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userRole', userRole);
      setUserRole(userRole); // Set the user role
  
      if (userRole === 'backofficer') {
        history.push('/backofficer');
      } else if (userRole === 'travelagent') {
        history.push('/travelagent');
      }
  
      onLogin();
    } catch (error) {
      console.error('Login error:', error);
      setLoginAlert({ type: 'error', message: 'Login failed' });
    }
  };
  

  const handleSignup = async () => {
    try {
      const response = await axios.post('https://localhost:44304/api/auth/register', {
        username: signupUsername,
        password: signupPassword,
        userRole: userRole,
      });

      if (response.status === 200) {
        setShowSignup(false);
        console.log('Signup successful');
      } else {
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="login-container">
      {showSignup ? (
        <div className="signup-form">
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
          <label htmlFor="userRole">Select User Role:</label>
          <select
            id="userRole"
            className="login-input"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="backofficer">Back Officer</option>
            <option value="travelagent">Travel Agent</option>
          </select>
          <button className="login-button" onClick={handleSignup}>
            Sign Up
          </button>
          <p>
            Already have an account?{' '}
            <a href="#" onClick={() => setShowSignup(false)}>
              Back to Login
            </a>
          </p>
        </div>
      ) : (
        <div className="login-form">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          {loginAlert && (
            <div className={`alert alert-${loginAlert.type}`}>
              {loginAlert.message}
            </div>
          )}
          <p>
            Don't have an account?{' '}
            <a href="#" onClick={() => setShowSignup(true)}>
              Sign Up
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
