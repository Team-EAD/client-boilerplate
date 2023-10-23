
import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import './profile.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import VueSweetalert2 from "sweetalert2";


const Profile= () => {

  const [listOftravelers, setlistOftravelers] = useState([]);
  const [userSearch, setuserSearch] = useState("");




  useEffect(() => {
    Axios.get("https://localhost:44304/api/Traveler").then((response) => {
      setlistOftravelers(response.data);
    });
  }, []);
  
  const activeuser = (Traveler) => {

    const id =Traveler.nic

    Axios.post(`https://localhost:44304/api/Traveler/activate/${id}`)
      .then((response) => {
        VueSweetalert2.fire({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 1000,
          icon: 'success',
          title: 'User Activate Succesfully',
        }).then(function () {
          // Redirect the user
          // alert(reservetrainID);
          window.location.reload();
        });
      })
      .catch((error) => {
        alert('Maximum limit of reservation'); // Handle any errors
        window.location.reload();
      });
  };
  
  const deactiveuser = (Traveler) => {

    const id =Traveler.nic

    Axios.post(`https://localhost:44304/api/Traveler/deactivate/${id}`)
      .then((response) => {
        VueSweetalert2.fire({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 1000,
          icon: 'success',
          title: 'User Deactivate Succesfully',
        }).then(function () {
          // Redirect the user
          // alert(reservetrainID);
          window.location.reload();
        });
      })
      .catch((error) => {
        alert('Maximum limit of reservation'); // Handle any errors
        window.location.reload();
      });
  };
  


  return (
    <div className="ticket-booking-container">
      <h1 className="fw-bold">Traveler Profile Management</h1>
      <div className="row mt-5 ps-3">
      <div className="row mt-5 px-3">
          <h6 className="mb-0 fw-bold mt-2 mb-2 fs-5">Current Travelers</h6>
          <div className="row mb-5">
            <div className="d-flex justify-content-end align-items-center">
              <div className="d-flex justify-content-center align-items-center">
                <input
                  id="searchID"
                  type="text"
                  className="form-control col-8 me-5 px-5"
                  placeholder="Traveler"
                 onChange={(e) => {
                  setuserSearch(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="button"
                  className="form-control btnSearch text-white"
                  value="Search"
                />
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table
              className="table table-striped custom-table"
              id="assignLabsTable"
            >
              <thead>
                <tr>
                  <th scope="col">Nic</th>
                  <th scope="col">Image</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">contacts</th>
                  <th scope="col">Country</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {listOftravelers &&
                     listOftravelers
                      .filter((value) => {
                        if (userSearch === "") {
                          return value;
                        } else if (
                          value.firstName
                            .toLowerCase()
                            .includes(userSearch.toLowerCase())
                        ) {
                          return value;
                        }
                      })
                      .map((Traveler, i) => (
                        <tr class="crs-tr" data-status="active">
                          <td className="crs-td">{Traveler.nic}</td>
                          <td className="crs-td">< img src={Traveler.image} class="crsthumimg" alt=""/></td>
                          <td className="crs-td">
                            {Traveler.firstName}
                          </td>
                          <td className="crs-td">
                            {Traveler.lastName}
                          </td>
                          <td className="crs-td">{Traveler.phone}</td>
                          <td className="crs-td">{Traveler.country}</td>
                          <td className="crs-td">{Traveler.isActive ? 'active' : 'deactive'}</td>
                          <td>
                          <i className="fa-solid fa-check-circle me-3 text-success d-inline fa-2x" onClick={() => {
                                activeuser(Traveler)
                    }}/>
                    <i className="fa-solid fa-ban me-3 text-danger d-inline fa-2x" onClick={() => {
                     deactiveuser(Traveler)
                    }}/>
                </td>
                        </tr>
                      ))}
                    
                </tbody>
            </table>
          </div>
        </div>
        </div>
    </div>
  );
};

export default Profile;
