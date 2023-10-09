// import React, { useState } from 'react';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     // Make an API call to your backend to authenticate the user
//     const response = await fetch('http://localhost:3000/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       // Store the JWT token in local storage or cookies
//       localStorage.setItem('jwtToken', data.token);
//       // Notify the parent component that the user has logged in
//       onLogin();
//     } else {
//       // Handle authentication error
//       // Display an error message to the user
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;
// import React, { useState } from 'react';
// import axios from 'axios';
// import './login.css'; // Import your CSS file

// const Login = ({ onLogin,showSignupForm }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/auth/login', {
//         username: username,
//         password: password,
//       });

//       const token = response.data.token;

//       // Store the token in local storage
//       localStorage.setItem('jwtToken', token);

//       // Call the onLogin function passed from App.js
//       onLogin();
//     } catch (error) {
//       console.error('Login error:', error);
//     }
//   };
//   const handleSignupClick = (e) => {
//     e.preventDefault(); // Prevent the default behavior of the anchor tag
//     showSignupForm();
//   };
//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         className="login-input"
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         className="login-input"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button className="login-button" onClick={handleLogin}>
//         Login
//       </button>

      
//         <p>Don't have an account?</p>
//         <a href="/signup" onClick={handleSignupClick}>Sign Up</a>
      
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [userRole, setUserRole] = useState('backofficer'); // Default role
  const [loginAlert, setLoginAlert] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username: username,
        password: password,
      });

      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      onLogin();
      setLoginAlert({ type: 'success', message: 'Login successful' });
    } catch (error) {
      console.error('Login error:', error);
      setLoginAlert({ type: 'error', message: 'Login failed' });
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        username: signupUsername,
        password: signupPassword,
        userRole: userRole, // Include the selected user role in the request
      });

      if (response.status === 201) {
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
