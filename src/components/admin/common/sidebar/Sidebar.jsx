import React from 'react';
import './Sidebar.css';
import {Link} from "react-router-dom";

const Sidebar = () => {
    return (<div className="sidebar">
        <ul>
            <li><Link to="/admin/">
                <span className="icon"><i className="fa fa-tachometer"/></span>
                <span className="title">Dashboard</span>
            </Link></li>
            <li><Link to="/admin/order">
                <span className="icon"><i class="fa fa-shopping-bag" aria-hidden="true"></i></span>
                <span className="title">Booking</span>
            </Link></li>
            <li><Link to="/admin/supplier">
                <span className="icon"><i className="fa fa-female" aria-hidden="true"/></span>
                <span className="title">Ticket</span>
            </Link></li>
            <li><Link to="/admin/requisition">
                <span className="icon"><i className="fa fa-car" aria-hidden="true"/></span>
                <span className="title">sample</span>
            </Link></li>
        </ul>
    </div>);
}

export default Sidebar;