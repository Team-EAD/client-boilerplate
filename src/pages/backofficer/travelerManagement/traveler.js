import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './traveler.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Traveler= () => {
    const [selectedTime, setSelectedTime] = useState(null);
  const [Vacancy_Id, setVacancy_Id] = useState('');
  const [Vacancy_Position, setVacancy_Position] = useState('');
  const [Vacancy_Category, setVacancy_Category] = useState('');
  const [No_of_Positions, setNo_of_Positions] = useState('');
  const [Location, setLocation] = useState('');
  const [Salary, setSalary] = useState('');
  const [Vacancy_Type, setVacancy_Type] = useState('');
  const [Date_Posted, setDate_Posted] = useState('');
  const [Details, setDetails] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = () => {
    // Handle form submission here
  };

  const sendVacancyData = () => {
    // Handle sending vacancy data here
  };

  return (
    <div className="ticket-booking-container">
    <h1 className="fw-bold">Traveler Management</h1>
      <div className="row mt-5 ps-3">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="row">
            {/* <div className="d-flex justify-content-start align-items-center">
              <button id="btn-generate-report" className="btn btnRegister">
                Generate Report
              </button>
            </div> */}
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12"></div>
      </div>
      <div className="row mt-5 px-3">
        <form>
          <div className="row mt-4">
            
            <div className="col">
            <input
                type="text"
                value={Vacancy_Id}
                className="form-control"
                placeholder="Full Name"
                onChange={(e) => {
                  setVacancy_Id(e.target.value);
                }}
              />
              <p className="alert-txt">{formErrors.Vacancy_Id}</p>
            </div>
            <div className="col">
            <input
                name="Dateposted"
                value={Date_Posted}
                className="form-control"
                placeholder="Date Of Birth"
                type="text"
                onFocus={(e) => (e.target.type = 'date')}
                id="Dateposted"
                onChange={(e) => {
                  setDate_Posted(e.target.value);
                }}
              />
              <p className="alert-txt">{formErrors.Date_Posted}</p>
            </div>
            
          </div>
          <div className="row mt-4">
          <div className="col">
          <select name="gender" value={Vacancy_Type} className="form-select" aria-label="role" onChange={(e)=>{ setVacancy_Type(e.target.value);}}>
                                    
                                    <option selected disabled value="0">Gender</option>
                                    <option value="Full Time">Male</option>
                                    <option value="Part Time">Female</option>
                                    
                                </select>
                                <p class="alert-txt">{formErrors.Vacancy_Type}</p>
            </div>
            <div className="col">
            <input
                type="text"
                value={Location}
                className="form-control"
                placeholder="NIC"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <p className="alert-txt">{formErrors.Location}</p>
            </div>
            <div className="col">
            <input
                type="text"
                value={Location}
                className="form-control"
                placeholder=" Address"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <p className="alert-txt">{formErrors.Location}</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <input
                type="text"
                value={Location}
                className="form-control"
                placeholder="E-mail"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <p className="alert-txt">{formErrors.Location}</p>
            </div>
            <div className="col">
            <div className="col">
              <input
                type="text"
                value={Location}
                className="form-control"
                placeholder="Phone Number"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <p className="alert-txt">{formErrors.Location}</p>
            </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
            
            <input
                type="text"
                value={Location}
                className="form-control"
                placeholder="Train Name"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              />
              <p className="alert-txt">{formErrors.Location}</p>
            </div>
            <div className="col">
              <div className="form-group">
                <textarea
                  className="form-control"
                  value={Details}
                  id="exampleFormControlTextarea1"
                  placeholder="Details"
                  rows="3"
                  onChange={(e) => {
                    setDetails(e.target.value);
                  }}
                ></textarea>
                <p className="alert-txt">{formErrors.Details}</p>
              </div>
            </div>

          </div>
          <div className="row mt-5">
            <div className="d-flex justify-content-around align-items-center">
              <button
                type="submit"
                className="btn btn-primary btnRegister"
                onClick={handleSubmit}
              >
                Register
              </button>
              <button
                type="button"
                className="btn btn-secondary btnUpdate"
                onClick={sendVacancyData}
              >
                Update
              </button>
              <button type="button" className="btn btn-danger btnDelete">
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Traveler;