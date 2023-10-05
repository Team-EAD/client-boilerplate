import React, {useEffect, useState} from "react";
import "./requsition.css";
import Axios from "axios";
import axios from "axios";
import VueSweetalert2 from "sweetalert2";

function Requisition() {
    const [orders, setOrders] = useState([]);
    const [orderID, setOrderID] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8080/pci-backend/v1/pci/admin/order/all/").then((response) => {
            setOrders(response.data);
        });
    }, []);

    const updateAcceptAction = (order) => {
        const updateOrder = {
            "orderId": parseInt(order.orderId),
            "companyName": order.companyName,
            "supplierName": order.supplierName,
            "deliveryAddress": order.deliveryAddress,
            "referenceNumber": order.referenceNumber,
            "dates": order.dates,
            "quantity": order.quantity,
            "descriptionAgreedPrice": order.descriptionAgreedPrice,
            "status": "accept"
        }
        axios.put("http://localhost:8080/pci-backend/v1/pci/admin/order/update/", updateOrder).then((response) => {
            if (response.data.status === "success") {
                VueSweetalert2.fire({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    icon: 'success',
                    title: 'Your Order details Updated to the System',
                });
            }
        })
    }

    const displayAllReq = () => {
        return orders.map((order) => {
            return (<tr itemScope="row" id={order.orderId} key={order.orderId}>
                <td>
                    {order.orderId}
                </td>
                <td>
                    {order.supplierName}
                </td>
                <td> {order.dates}</td>
                <td> {order.quantity}</td>
                <td> {order.deliveryAddress}</td>
                <td>
                    <i style={{"cursor": "pointer"}}
                       className={order.status === "accept" ? "fa-solid fa-square-check me-3 text-success d-inline d-block"
                           : "fa-solid fa-square-check me-3 text-success d-inline d-none"}
                       onClick={() => {
                           updateAcceptAction(order)
                       }}
                    />
                    <i style={{"cursor": "pointer"}}
                       className={order.status === "pending" || order.status === "" ? "fa-solid fa-square-check me-3 text-success d-inline d-block"
                           : "fa-solid fa-square-check me-3 text-success d-inline d-none"}
                       onClick={() => {
                           updateAcceptAction(order)
                       }}
                    />
                    <i style={{"cursor": "pointer"}}
                       className={order.status === "pending" || order.status === "" ?
                           "fa-solid fa-circle-xmark d-inline me-2 text-danger d-inline block" : "fa-solid fa-circle-xmark d-inline me-2 text-danger d-inline d-none"}/>

                    <i style={{"cursor": "pointer"}}
                       className={order.status === "reject" ?
                           "fa-solid fa-circle-xmark d-inline me-2 text-danger d-inline d-block" : "fa-solid fa-circle-xmark d-inline me-2 text-danger d-inline d-none"}/>
                </td>
            </tr>)
        });
    };

    // const searchReq = () => {
    //     if (client_ID === null || client_ID === undefined || client_ID === "") {
    //         alert("Please insert the client ID");
    //     } else {
    //         axios.get(`http://localhost:8000/api/client/${client_ID}`).then((response) => {
    //             let searchedReq = [];
    //             searchedReq.push(response.data)
    //             setOrders(searchedReq);
    //         })
    //     }
    // };


    return (
        <div>
            <div className="main_container">
                <div className="item fw-bold">Requisition Management</div>
                <div className="item">
                    <div className="row mt-5 ps-3">
                        <div className="row">
                            <div className=" col-lg-6 col-md-12 col-sm-12">
                                <div className="row"></div>
                            </div>
                            <div className=" col-lg-3 col-md-5 col-sm-12">
                                <div className="row"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 px-3">
                        <h6 className="mb-0 fw-bold mt-2 mb-2">Current Requisition</h6>
                        {/*<div className="row mb-5">*/}
                        {/*    <div className="d-flex justify-content-end align-items-center">*/}
                        {/*        <div className="d-flex justify-content-center align-items-center">*/}
                        {/*            <input*/}
                        {/*                id="searchID"*/}
                        {/*                type="text"*/}
                        {/*                className="form-control col-8 me-5 px-5"*/}
                        {/*                placeholder="Requisition ID"*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*        <div>*/}
                        {/*            <input*/}
                        {/*                type="button"*/}
                        {/*                className="form-control btnSearch text-white" onChange={(e) => {*/}
                        {/*                setOrderID(e.target.value);*/}
                        {/*            }}*/}
                        {/*                value="Search"*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="table-responsive">
                            <table
                                className="table table-striped custom-table"
                                id="assignLabsTable"
                            >
                                <thead>
                                <tr>
                                    <th scope="col">Order ID</th>
                                    <th scope="col">Supplier Name</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Delivery Address</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    displayAllReq()
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Requisition;
