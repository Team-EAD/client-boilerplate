import React from "react";
import "./order.css";
import { useState, useEffect } from "react";



function Order() {
  
  const [client_DOB, setClient_DOB] = useState("");


  return (
    <div>
      <div className="main_container">
        <div className="item fw-bold">Add Order</div>
        <div className="item">
          <div className="row mt-5 ps-3">
            <div className="row">
              <div className=" col-lg-6 col-md-12 col-sm-12">
                <div className="row"></div>
              </div>
            </div>
          </div>
          <div className="row mt-5 px-3">
          <form>

              <div className="row mt-4">
                
                <div className="col">
                  <input
                    type="text"
                   
                    className="form-control"
                    placeholder="Package Name"
                    
                  />
                
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                <div className="col">
                  <input
                    type="text"
                   
                    className="form-control"
                    placeholder="Supplier Name"
                    
                  />
                
                </div>
                
                </div>

                <div className="col">
                  <input
                    type="text"
                   
                    className="form-control"
                    placeholder="Reffernece Number"
                   
                  />
                
                </div>
              </div>

              <div className="row mt-4">
                <div className="col">
                  <input
                    type="text"
                   
                    className="form-control"
                    placeholder="Maximum Passengers"
                    
                  />
                 
                </div>
                <div className="col">
                  <input
                    type="text"
                    
                    className="form-control"
                    placeholder="Price"
                    
                  />
             
                </div>
                <div className="col">
                <input name="dateOfBirth"
                                           className="form-control"
                                           placeholder="Date of Birth"
                                           type="text"
                                          
                                           onFocus={(e) => e.target.type = 'date'} id="dateOfBirth" onChange={(e) => {
                                        setClient_DOB(e.target.value)
                                    }}/>
                            
                </div>
              </div>
              
              <div className="row mt-4">
                <div className="col">
                  <div class="form-group">
                    <textarea
                      class="form-control"
                     
                      id="exampleFormControlTextarea1"
                      rows="4"
                      placeholder="Delivery Address"
                     
                    ></textarea>
                  </div>
                </div>
              </div>


              <div className="row mt-5">
                <div className="d-flex justify-content-around align-items-center">
                 
                  <button
                    type="submit"
                    id="reg"
                    className="btn btnRegister "
                   
                  >
                    Add Package
                  </button>
                 
                </div>
              </div>
            </form>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Order;
