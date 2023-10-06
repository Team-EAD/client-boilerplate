import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from '../pages/admin/dashboard/dashboard'
import ClientLayout from "../layout/ClientLayout";
import BackofficerLayout from '../layout/Backofficerlayout'
import Header from "../components/admin/common/header/Header";
import Sidebar from "../components/admin/common/sidebar/Sidebar";
import ClientHeader from "../components/client/common/header/ClientHeader";
import HomePage from "../pages/client/home/homePage";
import Supplier from "../pages/admin/Supplier/SupplierManagement";
import Order from "../pages/admin/Order/Order";
import Requisition from "../pages/admin/requsition/requisition";
import TicketBooking from "../pages/backofficer/TicketBookingManagement/ticketBooking";
import Traveler from "../pages/backofficer/travelerManagement/traveler";
import Train from "../pages/backofficer/trainManagement/train";


const AppRoutes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path='/client/:path?' exact>
                        <div style={{"height": "auto"}}>
                            <ClientHeader/>
                            <ClientLayout>
                                <main>
                                    <Switch>
                                        <Route path="/client" render={(props) => <HomePage/>} exact/>;
                                    </Switch>
                                </main>
                            </ClientLayout>
                        </div>
                    </Route>

                    <Route path='/backofficer/:path?' exact>
                        <BackofficerLayout class="wrapper">
                            <Header/>
                            <Sidebar/>
                            <Switch>
                                <Route path="/backofficer" render={(props) => <Dashboard/>} exact/>;
                                <Route path="/backofficer/ticketbooking" render={(props) => <TicketBooking/>}/>;
                                <Route path="/backofficer/traveler" render={(props) => <Traveler/>}/>;
                                <Route path="/backofficer/train" render={(props) => <Train/>}/>;
                              
                              
                            </Switch>
                        </BackofficerLayout>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};
export default AppRoutes;
