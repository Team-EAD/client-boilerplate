import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ticketbooking.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from "axios";
import VueSweetalert2 from "sweetalert2";

const TicketBooking = () => {
  // Define and initialize state variables
  const [id, setReservationIds] = useState(""); // State variable for the reservation ID
  const [referenceID, setReferenceID] = useState(''); // State variable for the reference ID
  const [time, setSelectedTime] = useState(''); // State variable for the selected time
  const [reservationDate, setReservationDate] = useState(''); // State variable for the reservation date
  const [maxReservationDate, setMaxReservationDate] = useState(''); // State variable for the maximum allowed reservation date
  const [bookingDates, setBookingDate] = useState(''); // State variable for booking date (initially unused)
  const [numberOfTickets, setNumberOfTickets] = useState(0); // State variable for the number of tickets
  const [departureLocation, setDepartureLocation] = useState(''); // State variable for departure location
  const [destination, setDestination] = useState(''); // State variable for the destination
  const [formErrors, setFormErrors] = useState({}); // State variable for form validation errors
  const [userSearch, setUserSearch] = useState(''); // State variable for user search
  const [listOfReservations, setListOfReservations] = useState([]); // State variable for a list of reservations
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [reservetrainID, setTrainID] = useState(''); 
  const [reservetrainName, setTrainName] = useState(''); 
  //const[trainId,settrainId]=useState('');


  

  const openModal = () => {
    filterSchedules();
    setIsModalOpen(true);
  };
 
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filterSchedules = () => {
    // Make an API request to get the filtered schedules
    Axios.get(`https://localhost:44304/api/TrainSchedule/${departureLocation}/${destination}`)
      .then((response) => {
        setFilteredSchedules(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching filtered schedules', error);
      });
  };
  // Get the current date and format it
  const bookingDate = new Date();
  const dates = `${bookingDate.getDate()}/${bookingDate.getMonth() + 1}/${bookingDate.getFullYear()}`;

  // Handle date change in the reservation date picker
  const handleDateChange = (date) => {
    const currentDate = new Date();
    const maxAllowedDate = new Date(currentDate);
    maxAllowedDate.setDate(currentDate.getDate() + 30); // Adding 30 days to the current date
    setMaxReservationDate(maxAllowedDate);

    if (date > maxAllowedDate) {
      setFormErrors({ reservationDate: 'Reservation date must be within 30 days from today' });
    } else {
      setFormErrors({ reservationDate: '' });
    }

    setReservationDate(date);
  };








  // Handle form submission
  



  // Create a new reservation
  const createReservation =(TrainSchedule) => {
    alert(TrainSchedule.id);
    const id=TrainSchedule.id;
    Axios.post(`https://localhost:44304/api/TrainSchedule/reserve/${id}`)
    .then((response) => {
      // Handle the response here (e.g., update the UI, show a success message, etc.)
      console.log('Reservation updated successfully');
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error('Error updating reservation:', error);
    });
    
    // Send a POST request to create a reservation
    Axios.post("https://localhost:44304/api/TicketReservation", {
      referenceID,
      time,
      reservetrainID:TrainSchedule.trainID,
      reservetrainName:TrainSchedule.trainName,
      reservationDate,
      bookingDate,
      numberOfTickets,
      departureLocation,
      destination
    })
      .then((response) => {
        if (response.status === 200) {
          // Check if the reservation was successful and add it to the list
          setListOfReservations([
            ...listOfReservations,
            {
      referenceID,
      time,
      reservetrainID,
      reservetrainName,
      reservationDate,
      bookingDate,
      numberOfTickets,
      departureLocation,
      destination
            },
          ]);

          VueSweetalert2.fire({
           
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1000,
            icon: 'success',
            title: 'Reservation added to the System',
          }).then(function () {
            // Redirect the user
            //alert(reservetrainID);
            window.location.reload();
            
          });
        }
      })
      .catch((error) => {
        alert('Maximum limit of reservation'); // Handle any errors
        window.location.reload();
      });
  };

  // Load reservations from the API using useEffect
  useEffect(() => {
    Axios.get("https://localhost:44304/api/TicketReservation").then((response) => {
      setListOfReservations(response.data);
    });
  }, []);

  
  

  
  // Load reservation details for editing
  const loadPackageDetailsEdit = (TicketReservation) => {
    // Disable certain buttons and set details for editing
    document.getElementById("reg").setAttribute("disabled", "true");
    document.getElementById("delete").setAttribute("disabled", "true");
    setReservationIds(TicketReservation.id);
    setReferenceID(TicketReservation.referenceID);
    const dates = new Date(TicketReservation.reservationDate);
    dates.setDate(dates.getDate() - 1);
    setReservationDate(dates);
    const times = new Date(TicketReservation.time);
    setSelectedTime(times);
    setTrainID(TicketReservation.reservetrainID);
    setTrainName(TicketReservation.reservetrainName);
    setDepartureLocation(TicketReservation.departureLocation);
    setDestination(TicketReservation.destination);
    setNumberOfTickets(TicketReservation.numberOfTickets);
  };

  // Load reservation details for deletion

  

  const loadPackageDetailsDelete = (TicketReservation) => {
    // Disable certain buttons and set details for deletion

    document.getElementById("reg").setAttribute("disabled", "true");
    document.getElementById("edit").setAttribute("disabled", "true");
    setReservationIds(TicketReservation.id);
    setReferenceID(TicketReservation.referenceID);
    const dates = new Date(TicketReservation.reservationDate);
    dates.setDate(dates.getDate() - 1);
    setReservationDate(dates);
    const times = new Date(TicketReservation.time);
    setSelectedTime(times);
    setDepartureLocation(TicketReservation.departureLocation);
    setTrainID(TicketReservation.reservetrainID);
    setTrainName(TicketReservation.reservetrainName);
    setDestination(TicketReservation.destination);
    setNumberOfTickets(TicketReservation.numberOfTickets);
  };




  // Update a reservation
  function updateReservation(e) {
   
    e.preventDefault();
    const newPackage = {
      id,
      referenceID,
      time,
      bookingDate,
      reservetrainID,
      reservetrainName,
      reservationDate,
      numberOfTickets,
      departureLocation,
      destination
    };

    Axios.put(`https://localhost:44304/api/TicketReservation/${id}`, newPackage)
      .then((response) => {
        // Check if the response is successful (status code 200)
        if (response.status === 200) {
          VueSweetalert2.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1800,
            icon: 'success',
            title: "successfully Update the schedule", // Assuming the response has a "message" property
          }).then(function () {
            // Redirect the user
            window.location.reload();
          });
        }
      })
      .catch((err) => {
        alert("You can't update at least 5 days before the reservation date");
        window.location.reload();
      });
  };

  // Delete a reservation
  const deleteReservation = () => {

    Axios.delete(`https://localhost:44304/api/TicketReservation/${id}`)
      .then((response) => {
        if (response.status === 200) {
          VueSweetalert2.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1800,
            icon: 'success',
            title: "succesfully Cancel the schedule", // Assuming the response contains the success message
          }).then(function () {
            // Redirect the user
            window.location.reload();
          });
        }
      })
      .catch((err) => {
        alert("You can't delete at least 5 days before the reservation date");
        window.location.reload();
      });
  };

  return (
    <div className="ticket-booking-container">
      <h1 className="fw-bold">Ticket Booking Management</h1>
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
                  <div className="col-5">
                    <input
                      type="text"
                      value={referenceID}
                      className="form-control"
                      placeholder="Reference ID"
                      onChange={(e) => {
                        setReferenceID(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-5">
                    <input
                      name="Dateposted"
                      className="form-control"
                      placeholder="Reservation Date"
                      type="text"
                      value={dates}
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-5">
                    <DatePicker
                      selected={reservationDate}
                      type="date"
                      onChange={handleDateChange}
                      value={reservationDate}
                      minDate={new Date()} // Prevent choosing past dates
                      className="form-control"
                      placeholderText="Reservation Date"
                    />
                    <p className="alert-txt">{formErrors.reservationDate}</p>
                  </div>
                  <div className="col">
                    <DatePicker
                      id="timepicker-placeholder"
                      placeholderText="Choose a time"
                      selected={time}
                      onChange={(date) => setSelectedTime(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      value={time}
                    />
                  </div>
                  <div className="col"></div>
                </div>
                <div className="row mt-4">
                  <div className="col">
                  <select
                    value={departureLocation}
                    name="type"
                    className="form-select"
                    placeholder='Depature Location'
                    aria-label="role" 
                    onChange={(event) => {
                      setDepartureLocation(event.target.value);
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
                    <div className="col">
                    <select
                    value={destination}
                    name="type"
                    className="form-select"
                    placeholder='Destination Location'
                    aria-label="role" 
                    onChange={(event) => {
                      setDestination(event.target.value);
                    }}
                  >
                    < option value="" disabled selected >
                     Destination Location
                    </option>
                    <option value="Galle">Galle</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Ambalangoda">Ambalangoda</option>
                    <option value="Nuwara">Nuwara</option>
                    <option value="Matara">Matara</option>
                  </select>
                      <p className="alert-txt">{formErrors.Location}</p>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-4">
                    <input
                      type="number"
                      id="passengerCount"
                      name="passengerCount"
                      placeholder="Number of passengers"
                      min="1"
                      max="100"
                      value={numberOfTickets}
                      step="1"
                      style={{ width: '200px' }}
                      onChange={(e) => {
                        setNumberOfTickets(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="d-flex justify-content-around align-items-center">
                    <button
                      type="button"
                      className="btn btn-primary btnRegister"
                      onClick={openModal}
                      id="reg"
                    >
                      Check
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btnUpdate"
                      id="edit"
                      onClick={updateReservation}
                    >
                      Update
                    </button>
                    <button type="button" className="btn btn-danger btnDelete" id="delete" onClick={deleteReservation}>
                      Cancel
                    </button>
                  </div>
                  {isModalOpen && ( // Modal component
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>Available Train Schedules</h3>

            <div> <h5> {departureLocation}   <span className="icon"><i className="fa fa-train" aria-hidden="true" /></span>  {destination}      </h5>  </div>
            {
  


      <div className="table-responsive">
      <table className="table table-striped custom-table" id="assignLabsTable">
     <thead>
       <tr>
         <th scope="col">Train ID</th>
         <th scope="col">Train Name</th>
         <th scope="col">Depature</th>
         <th scope="col">Destination</th>
         <th scope="col">Depature Time</th>
         <th scope="col">Arrival Time</th>
         <th scope="col">Action</th>
         <th scope="col" />
       </tr>
     </thead>
     <tbody>
     {Array.isArray(filteredSchedules) && filteredSchedules.length > 0 ? (
          filteredSchedules.map((TrainSchedule, i) => (
      <tr key={i} className="crs-tr" data-status="active">
        <td className="crs-td">{TrainSchedule.trainID}</td>
        <td className="crs-td">{TrainSchedule.trainName}</td>
        <td className="crs-td">{TrainSchedule.origin}</td>
        <td className="crs-td">{TrainSchedule.destination}</td>
        <td className="crs-td">{TrainSchedule.depatureTime}</td>
        <td className="crs-td">{TrainSchedule.arrivalTime}</td>
        <td>
        <button
          className="btn btn-primary btnRegister"
                 id="bbokbtn" 
                 type="submit"
                 style={{ padding: '2px 2px', width:'80px' ,height:"30px",// You can adjust the padding values
                 fontSize: '12px',}}
                  onClick={() => {
                    createReservation(TrainSchedule);
                    
                 }}
          >
        Book
      </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8">No schedules found.</td>
    </tr>
  )}
</tbody>
   </table>
 </div>






            }
          </div>
        </div>
      )}
                </div>
              </form>
            </div>
            <div className="row mt-5 px-3">
              <h6 className="mb-0 fw-bold mt-2 mb-2 fs-5">Current Reservations</h6>
              <div className="row mb-5">
                <div className="d-flex justify-content-end align-items-center">
                  <div className="d-flex justify-content-center align-items-center">
                    <input
                      id="searchID"
                      type="text"
                      className="form-control col-8 me-5 px-5"
                      placeholder="Reference ID"
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
                      <th scope="col">Reservation ID</th>
                      <th scope="col">Reference ID</th>
                      <th scope="col">Booking Date</th>
                      <th scope="col">Reservation Date</th>
                      <th scope="col">Train No</th>
                      <th scope="col">Train Name</th>
                      <th scope="col">Passengers</th>
                      <th scope="col">From</th>
                      <th scope="col">To</th>
                      <th scope="col">Action</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {listOfReservations &&
                      listOfReservations
                        .filter((value) => {
                          if (userSearch === "") {
                            return value;
                          } else if (
                            value.referenceID
                              .toLowerCase()
                              .includes(userSearch.toLowerCase())
                          ) {
                            return value;
                          }
                        })
                        .map((TicketReservation, i) => (
                          <tr class="crs-tr" data-status="active">
                            <td className="crs-td">{TicketReservation.id}</td>
                            <td className="crs-td">{TicketReservation.referenceID}</td>
                            <td className="crs-td">
                              {TicketReservation.bookingDate}
                            </td>
                            <td className="crs-td">
                              {TicketReservation.reservationDate}
                            </td>
                            <td className="crs-td">{TicketReservation.reservetrainID}</td>
                            <td className="crs-td">{TicketReservation.reservetrainName}</td>
                            <td className="crs-td">{TicketReservation.numberOfTickets}</td>
                            <td className="crs-td">{TicketReservation.departureLocation}</td>
                            <td className="crs-td">{TicketReservation.destination}</td>
                            <td>
                              <i
                                className="fa-solid fa-pen me-3 text-primary d-inline fa-2x"
                                onClick={() => {
                                  loadPackageDetailsEdit(TicketReservation);
                                }}
                              />
                              <i
                                className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline fa-2x"
                                onClick={() => {
                                  loadPackageDetailsDelete(TicketReservation);
                                }}
                              />
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

export default TicketBooking; 