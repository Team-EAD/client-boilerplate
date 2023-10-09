// import React from 'react';
// import './dashboard.css'

// const Dashboard = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };
// export default Dashboard;

import React from 'react';
import Signup from '../../signUp/signup'; // Import your Signup component

const Dashboard = ({ userRole }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      {userRole === 'backofficer' && <Signup />}
      {/* Other dashboard content */}
    </div>
  );
};

export default Dashboard;
