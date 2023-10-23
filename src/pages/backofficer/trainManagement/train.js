import 'bootstrap/dist/css/bootstrap.min.css';
import './train.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import VueSweetalert2 from "sweetalert2";
import { useState, useEffect } from "react";
import Axios from "axios";

const Train = () => {
  // Define state variables
  const [id, setid] = useState('');
  const [trainID, setTrainID] = useState('');
  const [trainName, setTrainName] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [depatureTime, setDepartureTime] = useState(''); // Use null for Date objects
  const [arrivalTime, setArrivalTime] = useState('');     // Use null for Date objects
  const [userSearch, setUserSearch] = useState('');
  const [listOfSchedules, setListOfSchedules] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  // Function to create a new schedule

  const createSchedule = () => {
    Axios.post("https://localhost:44304/api/TrainSchedule", {
      
      trainID,
      trainName,
      origin,
      destination,
      depatureTime,
      arrivalTime


    }).then((response) => {
      setListOfSchedules([
        ...listOfSchedules,
        {
          trainID,
          trainName,
          origin,
          destination,
          depatureTime,
          arrivalTime
      
        },
      ]);
    });
    VueSweetalert2.fire({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1000,
        icon: 'success',
        title: 'Train details added to the System',
    }).then(function () {
      // Redirect the user
      window.location.href = "/backofficer/train";
    });
  };

  const loadscheduleDetailsedit = (TrainSchedule) => {

    document.getElementById("reg").setAttribute("disabled", "true");
    document.getElementById("delete").setAttribute("disabled", "true");
    setid(TrainSchedule.id);
    setTrainID(TrainSchedule.trainID);
    setTrainName(TrainSchedule.trainName);
    setOrigin(TrainSchedule.origin);
    setDestination(TrainSchedule.destination);
    const dtimes = new Date(TrainSchedule.depatureTime);
    setDepartureTime(dtimes);

    const atimes = new Date(TrainSchedule.arrivalTime);

    setArrivalTime(atimes);

    
  };

  const loadscheduleDetailsdelete = (TrainSchedule) => {

    document.getElementById("reg").setAttribute("disabled", "true");
    document.getElementById("edit").setAttribute("disabled", "true");
    setid(TrainSchedule.id);
    setTrainID(TrainSchedule.trainID);
    setTrainName(TrainSchedule.trainName);
    setOrigin(TrainSchedule.origin);
    setDestination(TrainSchedule.destination);
    const dtimes = new Date(TrainSchedule.depatureTime);
    setDepartureTime(dtimes);

    const atimes = new Date(TrainSchedule.arrivalTime);

    setArrivalTime(atimes);

    
  };


 // Update a reservation
 function updateSchedule(e) {
  e.preventDefault();
  const newPackage = {
      id,
      trainID,
      trainName,
      origin,
      destination,
      depatureTime,
      arrivalTime
  };

  Axios.put(`https://localhost:44304/api/TrainSchedule/${id}`, newPackage)
    .then((response) => {
      // Check if the response is successful (status code 200)
      if (response.status === 200) {
        VueSweetalert2.fire({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 1800,
          icon: 'success',
          title: "successfully update schedule", // Assuming the response has a "message" property
        }).then(function () {
          // Redirect the user
          window.location.reload();
        });
      }
    })
    .catch((err) => {
      alert("error");
      window.location.reload();
    });
};
const deleteschedule = () => {
  Axios.get(`https://localhost:44304/api/TrainSchedule/${id}`)
    .then((response) => {
      const trainSchedule = response.data; // Assuming that the API response contains the train schedule data

      if (trainSchedule.reserve === true) {
        alert("Train schedule is reserved and cannot be deleted.");
      } else {
        // Train schedule is not reserved, proceed with deletion
        Axios.delete(`https://localhost:44304/api/TrainSchedule/${id}`)
          .then((response) => {
            if (response.status === 200) {
              VueSweetalert2.fire({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 1800,
                icon: 'success',
                title: "Successfully canceled the schedule",
              }).then(function () {
                // Redirect the user
                window.location.reload();
              });
            }
          })
          .catch((err) => {
            window.location.reload();
          });
      }
    })
    .catch((err) => {
      console.error("Error fetching train schedule data:", err);
    });
};



  // Fetch the list of schedules when the component mounts
  useEffect(() => {
    Axios.get("https://localhost:44304/api/TrainSchedule")
      .then((response) => {
        setListOfSchedules(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  }, []);









  return (
    <div className="ticket-booking-container">
      <h1 className="fw-bold">Train Management</h1>
      <div className="row mt-5 ps-3">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="row">
            {/* Content for the left side */}
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          {/* Content for the right side */}
        </div>
      </div>
      <div className="row mt-5 px-3">
        <form>
          <div className="row mt-4">
            <div className="col">
              <input
                type="text"
                value={trainID}
                className="form-control"
                placeholder="Train No"
                onChange={(e) => {
                  setTrainID(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <input
                type="text"
                value={trainName}
                className="form-control"
                placeholder="Train Name"
                onChange={(e) => {
                  setTrainName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <DatePicker
                id="departure-time-picker"
                placeholderText="Departure Time"
                selected={depatureTime}
                onChange={(date) => setDepartureTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
            <div className="col">
              <DatePicker
                id="arrival-time-picker"
                placeholderText="Arrival Time"
                selected={arrivalTime}
                onChange={(date) => setArrivalTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
            <select
                    value={origin}
                    name="type"
                    className="form-select"
                    placeholder='Depature Location'
                    aria-label="role" 
                    onChange={(event) => {
                      setOrigin(event.target.value);
                    }}
                  >
                    < option value="" disabled selected  >
                     Depature Location
                    </option>
                    <option value="Galle">Galle</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Ambalangoda">Ambalangoda</option>
                    <option value="Nuwara">Nuwara</option>
                    <option value="Matara">Matara</option>
                  </select>
            </div>
            <div className="col">
            <select
                    value={destination}
                    name="type"
                    className="form-select"
                    placeholder='Depature Location'
                    aria-label="role" 
                    onChange={(event) => {
                      setDestination(event.target.value);
                    }}
                  >
                    < option value="" disabled selected  >
                    Destination Location
                    </option>
                    <option value="Galle">Galle</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Ambalangoda">Ambalangoda</option>
                    <option value="Nuwara">Nuwara</option>
                    <option value="Matara">Matara</option>
                  </select>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              {/* Add any additional fields as needed */}
            </div>
          </div>
          <div className="row mt-5">
            <div className="d-flex justify-content-around align-items-center">
              <button
                type="button"
                className="btn btn-primary btnRegister"
                onClick={createSchedule}
                id="reg"
              >
                Add
              </button>
              <button
              id="edit"
                type="button"
                className="btn btn-secondary btnUpdate" onClick={updateSchedule}
              >
                Update
              </button>
              <button type="button" className="btn btn-danger btnDelete" id="delete"  onClick={deleteschedule}>
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="row mt-5 px-3">
        <h6 className="mb-0 fw-bold mt-2 mb-2 fs-5">Current Schedules</h6>
        <div className="row mb-5">
          <div className="d-flex justify-content-end align-items-center">
            <div className="d-flex justify-content-center align-items-center">
              <input
                id="searchID"
                type="text"
                className="form-control col-8 me-5 px-5"
                placeholder="Train No"
                onChange={(e) => {
                  setUserSearch(e.target.value);
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
          <table className="table table-striped custom-table" id="assignLabsTable">
            <thead>
              <tr>
                <th scope="col">Train Schedule ID</th>
                <th scope="col">Train ID</th>
                <th scope="col">Train Name</th>
                <th scope="col">Departure Time</th>
                <th scope="col">Arrival Time</th>
                <th scope="col">Origin</th>
                <th scope="col">Destination</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {listOfSchedules &&
                listOfSchedules
                  .filter((value) => {
                    if (userSearch === "") {
                      return value;
                    } else if (
                      value.trainID
                        .toLowerCase()
                        .includes(userSearch.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((TrainSchedule, i) => (
                    <tr className="crs-tr" data-status="active" key={i}>
                      <td className="crs-td">{TrainSchedule.id}</td>
                      <td className="crs-td">{TrainSchedule.trainID}</td>
                      <td className="crs-td">{TrainSchedule.trainName}</td>
                      <td className="crs-td">{TrainSchedule.depatureTime}</td>
                      <td className="crs-td">{TrainSchedule.arrivalTime}</td>
                      <td className="crs-td">{TrainSchedule.origin}</td>
                      <td className="crs-td">{TrainSchedule.destination}</td>
                      <td className="crs-td">{TrainSchedule.reserve ? 'Reserve' : 'Not Reserve'}</td>
                      <td>
                        <i className="fa-solid fa-pen me-3 text-primary d-inline fa-2x" onClick={() => {
                           loadscheduleDetailsedit(TrainSchedule);
                        }} />
                        <i className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline fa-2x" onClick={() => {
                         loadscheduleDetailsdelete(TrainSchedule);
                        }} />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Train;
