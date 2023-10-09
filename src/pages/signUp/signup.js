import React, { useState } from 'react';

const Signup = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('backofficer'); // Default role

  const handleSignup = async () => {
    try {
      // Create a user object with the provided username, password, and userRole
      const user = {
        username,
        password,
        userRole,
      };

      // Make a POST request to the backend for user signup
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Signup successful, obtain the JWT token from the response
        const { token } = await response.json();

        // Store the token in localStorage or a secure storage method
        localStorage.setItem('token', token);

        // Redirect the user to the appropriate dashboard based on userRole
        if (userRole === 'backofficer') {
          history.push('/backofficer/dashboard');
        } else if (userRole === 'travelagent') {
          history.push('/travelagent/dashboard');
        }
      } else {
        // Handle signup errors (e.g., display an error message)
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select onChange={(e) => setUserRole(e.target.value)} value={userRole}>
        <option value="backofficer">Back Officer</option>
        <option value="travelagent">Travel Agent</option>
      </select>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;

