// Sidebar.js
import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            
            <ul>
                <li>
                    <Link to="/admin/">
                        <span className="icon"><i className="fa fa-dashboard" /></span>
                        <span className="title">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/backofficer/ticketbooking">
                        <span className="icon"><i className="fa fa-ticket" aria-hidden="true"></i></span>
                        <span className="title">Ticket-Booking</span>
                    </Link>
                </li>
                <li>
                    <Link to="/backofficer/traveler">
                        <span className="icon"><i className="fa fa-female" aria-hidden="true"/></span>
                        <span className="title">Traveler</span>
                    </Link>
                </li>
                <li>
                    <Link to="/backofficer/train">
                        <span className="icon"><i className="fa fa-train" aria-hidden="true"/></span>
                        <span className="title">Train</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
