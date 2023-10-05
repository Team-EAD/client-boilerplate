import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from '../pages/admin/dashboard/dashboard'
import ClientLayout from "../layout/ClientLayout";
import AdminLayout from "../layout/Adminlayout";
import Header from "../components/admin/common/header/Header";
import Sidebar from "../components/admin/common/sidebar/Sidebar";
import ClientHeader from "../components/client/common/header/ClientHeader";
import HomePage from "../pages/client/home/homePage";
import Supplier from "../pages/admin/Supplier/SupplierManagement";
import Order from "../pages/admin/Order/Order";
import Requisition from "../pages/admin/requsition/requisition";


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

                    <Route path='/admin/:path?' exact>
                        <AdminLayout class="wrapper">
                            <Header/>
                            <Sidebar/>
                            <Switch>
                                <Route path="/admin" render={(props) => <Dashboard/>} exact/>;
                                <Route path="/admin/supplier" render={(props) => <Supplier/>}/>;
                                <Route path="/admin/order" render={(props) => <Order/>}/>;
                                <Route path="/admin/requisition" render={(props) => <Requisition/>}/>;
                            </Switch>
                        </AdminLayout>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};
export default AppRoutes;
