// Header.js
import React from 'react';
import './header.css';
import logo from '../../../../assets/logo/logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <div className="menu-icon">
                <i className="fa fa-bars" />
            </div>
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
                <h3>Ticket Reservation Office</h3>
            </div>
            <div className="menu-container">
                <ul>
                    <li>
                        <p className="logout">
                            <i className="fa fa-sign-out logoutIcon" aria-hidden="true" />
                        </p>
                    </li>
                    <li>
                        <Link to="/client">
                            <i className="fas fa-user" />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
