import React from 'react';
import './dashboard.css'

const Dashboard = () => {
    return (
        <div>
            <div className="main_container">
                <div className="item" id='item'>
                    <div className="row mt-4">
                        <div className="col d-flex justify-content-center align-items-center">
                            <div className="col-6 card text-center">
                                1
                            </div>

                        </div>
                        <div className="col d-flex justify-content-center align-items-center">
                            <div className="col-6 card text-center">
                               2
                            </div>

                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col d-flex justify-content-center align-items-center">
                            <div className="col-6 card text-center">
                              3
                            </div>
                        </div>
                        <div className="col d-flex justify-content-center align-items-center">
                            <div className="col-6 card text-center">
                               4
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;