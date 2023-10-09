// import React, { useState, useEffect } from 'react';
// import './App.css'; // Import your styles
// import Login from './pages/login/login'; // Import your Login component
// import Dashboard from './pages/admin/dashboard/dashboard'; // Import your Dashboard component
// import Signup from './pages/signUp/signup'; // Import your Signup component
// import Sidebar from './components/admin/common/sidebar/Sidebar'; // Import your Sidebar component

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState('');
//   const [showAlert, setShowAlert] = useState(false);

//   useEffect(() => {
//     // Check if a JWT token is stored in localStorage
//     const jwtToken = localStorage.getItem('jwtToken');

//     if (jwtToken) {
//       // Token found, user is authenticated
//       setIsLoggedIn(true);
//       // Fetch the user's role from your backend using the token
//       // For simplicity, I'm assuming you have an API endpoint to get user role
//       fetchUserRole(jwtToken);
//     } else {
//       // No token found, user is not authenticated
//       setIsLoggedIn(false);
//     }
//   }, []);

//   const fetchUserRole = async (token) => {
//     try {
//       const response = await fetch('http://localhost:3000/auth/userrole', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUserRole(data.userRole);
//       } else {
//         // Handle error when fetching user role
//         console.error('Error fetching user role:', response.statusText);
//       }
//     } catch (error) {
//       // Handle network or other errors
//       console.error('Error during user role fetch:', error);
//     }
//   };

//   const handleLogin = async () => {
//     // Implement your login logic here (e.g., make an API call to your backend)
    
//     // Simulate a successful login
//     setIsLoggedIn(true);
//     setShowAlert(true);
//     localStorage.setItem('jwtToken', '<your-jwt-token>');
//     // Fetch the user's role after login
//     fetchUserRole('<your-jwt-token>');
//   };

//   const handleLogout = () => {
//     // Remove the JWT token from storage or cookies
//     localStorage.removeItem('jwtToken');
//     setIsLoggedIn(false);
//     // Clear the user role when logging out
//     setUserRole('');
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Ticket Reservation Office</h1>
//         {isLoggedIn ? (
//           <>
//             <button onClick={handleLogout}>Logout</button>
//             {userRole === 'backofficer' && <Signup />}
//           </>
//         ) : (
//           <>
//             <Login onLogin={handleLogin} />
//             {showAlert && (
//               <div className="alert">
//                 Login successful! Redirecting to the dashboard...
//               </div>
//             )}
//           </>
//         )}
//       </header>
//       <main className="App-main">
//         {isLoggedIn ? (
//           <>
//             {userRole === 'backofficer' && <Sidebar userRole={userRole} />}
//             <Dashboard />
//           </>
//         ) : (
//           <p>Please log in to access the dashboard.</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default App;
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import Login from './pages/login/login';
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import Sidebar from './components/admin/common/sidebar/Sidebar';
// import Dashboard from './pages/admin/dashboard/dashboard';
// import Signup from './pages/signUp/signup';
// import TicketBooking from './pages/backofficer/TicketBookingManagement/ticketBooking';
// import Profile from './pages/travelAgent/profileManagement/profile';
// import Header from './components/admin/common/header/Header';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState('');

//   useEffect(() => {
//     const jwtToken = localStorage.getItem('jwtToken');

//     if (jwtToken) {
//       setIsLoggedIn(true);
//       fetchUserRole(jwtToken);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   const fetchUserRole = async (token) => {
//     try {
//       const response = await axios.get('http://localhost:3000/auth/userrole', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = response.data;
//       setUserRole(data.userRole);
//     } catch (error) {
//       console.error('Error fetching user role:', error);
//     }
//   };

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('jwtToken');
//     setIsLoggedIn(false);
//     setUserRole('');
//   };

//   // Custom function to render the appropriate redirection route based on user role
//   const renderRedirectRoute = () => {
//     if (userRole === 'backofficer') {
//       return <Redirect to="/backofficer" />;
//     } else if (userRole === 'travelagent') {
//       return <Redirect to="/travelagent/profile" />;
//     } else {
//       return null; // Handle other roles or cases as needed
//     }
//   };

//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//          <Header/>
//           {isLoggedIn ? (
//             <>
//               <button onClick={handleLogout}>Logout</button>
//               {renderRedirectRoute()}
//             </>
//           ) : (
//             <>
//               <Login onLogin={handleLogin} />
//             </>
//           )}
//         </header>
//         <main className="App-main">
//           {isLoggedIn ? (
//             <>
//               <Sidebar userRole={userRole} />
//               <Route path="/backofficer" component={Dashboard} />
//               <Route path="/backofficer/ticketbooking" component={TicketBooking} />
//               {/* Add more routes as needed */}
//               <Route path="/travelagent/profile" component={Profile} />
//             </>
//           ) : (
//             <p>Please log in to access the dashboard.</p>
//           )}
//         </main>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/login/login';
import axios from 'axios'; // Import axios for making HTTP requests
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom'; // Import useHistory for navigation
import Sidebar from './components/admin/common/sidebar/Sidebar';
import Dashboard from './pages/admin/dashboard/dashboard';
import Signup from './pages/signUp/signup';
import Profile from './pages/travelAgent/profileManagement/profile'; // Import Profile component
import Header from './components/admin/common/header/Header'; // Import Header component
import Train from './pages/backofficer/trainManagement/train';
import TicketBooking from './pages/backofficer/TicketBookingManagement/ticketBooking';
import Traveler from './pages/backofficer/travelerManagement/traveler';
import DummySidebar from './components/admin/common/dummySidebar/dummySidebar';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState(''); // Define username state
  const [password, setPassword] = useState(''); // Define password state
  const [showSignup, setShowSignup] = useState(false);
  const history = useHistory(); // Define history for navigation

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      setIsLoggedIn(true);
      fetchUserRole(jwtToken);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Define onLogin function
  const onLogin = () => {
    // You can perform any necessary actions after login here
  };

  const fetchUserRole = async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/auth/userrole', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      setUserRole(data.userRole);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/auth/login', {
//         username: username,
//         password: password,
//       });

//       const token = response.data.token;

//       localStorage.setItem('jwtToken', token);

//       await fetchUserRole(token);

//       if (userRole === 'backofficer') {
//         history.push('/backofficer');
//       } else if (userRole === 'travelagent') {
//         history.push('/travelagent');
//       }

//       onLogin();
//     } catch (error) {
//       console.error('Login error:', error);
//     }
//   };
const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      username: username,
      password: password,
    });

    const token = response.data.token;

    localStorage.setItem('jwtToken', token);

    // Fetch the user role and set it before redirection
    const userRoleResponse = await fetchUserRole(token);

    if (userRoleResponse === 'backofficer') {
        window.location.href = '/backofficer';
    //   history.push('/backofficer');
      setUserRole('backofficer'); // Set userRole here
    } else if (userRoleResponse === 'travelagent') {
      history.push('/travelagent');
      setUserRole('travelagent'); // Set userRole here
    }

    onLogin();
  } catch (error) {
    console.error('Login error:', error);
  }
};
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    setUserRole('');
  };

  const renderRedirectRoute = () => {
    if (userRole === 'backofficer') {
      return <Redirect to="/backofficer" />;
    } else if (userRole === 'travelagent') {
      return <Redirect to="/travelagent" />;
    } else {
      return null;
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
          <DummySidebar/>
          {isLoggedIn ? (
            <>
             
              {renderRedirectRoute()}
            </>
          ) : (
            <>
             <Login
                onLogin={handleLogin}
                // Add a prop to toggle the signup form visibility
                showSignupForm={() => setShowSignup(true)}
              />
              {showSignup && <Signup/>} 
            </>
          )}
        </header>
        <main className="App-main">
          {isLoggedIn ? (
            <>
              <Sidebar userRole={userRole} />
              <Route path="/backofficer" component={Dashboard} />
              <Route path="/backofficer/ticketbooking" component={TicketBooking} />
              <Route path="/travelagent/profile" component={Profile} />
              <Route path="/backofficer/train" component={Train} />
              <Route path="/backofficer/traveler" component={Traveler} />
              <Route path="/signup" component={Signup} />

            </>
          ) : (
            
            <></>
            
          )}
        </main>
        
      </div>
    </Router>
  );
};

export default App;
