import React, { useState, useEffect } from "react";
import "./supplierStyle.css";
import Axios from "axios";

function SupplierManagement() {
  const [supplierId, setsupplierId] = useState("");
  const [supplierName, setcompany_name] = useState("");
  const [supplierAddress, setCompany_address] = useState("");
  const [supplierMobile, setcontacts] = useState("");
  const [supplierEmail, setemail] = useState("");
  const [listOfpackage, setlistOfpackage] = useState([]);
  const [PackageSearch, setpkgSearch] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    sub();
    setIsSubmit(true);
  };

  const validate = () => {
    const errors = {};

    if (!supplierName) {
      errors.supplierName = "Supplier Name is required!";
    }
    if (!supplierAddress) {
      errors.supplierAddress = "Supplier Address is required!";
    }
    if (!supplierMobile) {
      errors.supplierMobile = "Phone is required!";
    } else if (supplierMobile.length !== 10) {
      errors.supplierMobile = "Phone number is invalid!";
    }
    if (!supplierEmail) {
      errors.supplierEmail = "Supplier Email is required!";
    }

    return errors;
  };
  const sub = () => {
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      createSupplier();
    }
  };

  const createSupplier = () => {
    Axios.post("http://localhost/pci-backend/v1/pci/admin/supplier/create/", {
      supplierId,
      supplierName,
      supplierAddress,
      supplierEmail,
      supplierMobile,
    }).then((response) => {
      setlistOfpackage([
        ...listOfpackage,
        {
          supplierId,
          supplierName,
          supplierAddress,
          supplierEmail,
          supplierMobile,
        },
      ]);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost/pci-backend/v1/pci/admin/supplier/all/").then((response) => {
      setlistOfpackage(response.data);
    });
  }, []);

  const loadPackageDetailsedit= (supplier) => {
    document.getElementById("reg").setAttribute("disabled", "true");
    document.getElementById("delete").setAttribute("disabled", "true");
    setsupplierId(supplier.supplierId);
    setcompany_name(supplier.supplierName);
    setemail(supplier.supplierEmail);
    setcontacts(supplier.supplierMobile);
    setCompany_address(supplier.supplierAddress);
  };

  return (
    <div>
      <div className="main_container">
        <div className="item fw-bold">Supplier Management</div>
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

          <div class="card-body">
            <form>
              <div class="form-outline mb-4">
                <input
                  type="text"
                  id="form6Example3"
                  class="form-control"
                  value={supplierName}
                  placeholder="Supplier name"
                  onChange={(event) => {
                    setcompany_name(event.target.value);
                  }}
                />
                  <p class="alert-txt">{formErrors.supplierName}</p>
              </div>

              <div class="form-outline mb-4">
                <input
                  type="text"
                  id="form6Example4"
                  class="form-control"
                  value={supplierEmail}
                  placeholder="Supplier Email"
                  onChange={(event) => {
                    setemail(event.target.value);
                  }}
                />
                  <p class="alert-txt">{formErrors.supplierEmail}</p>
              </div>

              <div class="form-outline mb-4">
                <input
                  type="text"
                  id="form6Example5"
                  class="form-control"
                  value={supplierAddress}
                  placeholder="Supplier Address"
                  onChange={(event) => {
                    setCompany_address(event.target.value);
                  }}
                />
                  <p class="alert-txt">{formErrors.supplierAddress}</p>
              </div>

              <div class="form-outline mb-4">
                <input
                  type="number"
                  id="form6Example6"
                  value={supplierMobile}
                  class="form-control"
                  placeholder="Supplier Phone"
                  onChange={(event) => {
                    setcontacts(event.target.value);
                  }}
                />
                 <p class="alert-txt">{formErrors.supplierMobile}</p>
              </div>

              <div className="row mt-5">
                <div className="d-flex justify-content-around align-items-center">
                  <button
                    type="submit"
                    id="reg"
                    className="btn btnRegister "
                    onClick={handleSubmit}
                  >
                    Add
                  </button>
                  <button type="button" id="edit" className="btn btnUpdate">
                    Update
                  </button>
                  <button type="button" id="delete" className="btn btnDelete">
                    Delete
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="row mt-5 px-3">
            <h6 className="mb-0 fw-bold mt-2 mb-2">Current Suppliers</h6>
            <div className="row mb-5">
              <div className="d-flex justify-content-end align-items-center">
                <div className="d-flex justify-content-center align-items-center">
                  <input
                    id="searchID"
                    type="text"
                    className="form-control col-8 me-5 px-5"
                    placeholder="Supplier Name"
                  />
                </div>
                <div>
                  <input
                    type="button"
                    className="form-control btnSearch text-white"  onChange={(e) => {
                      setpkgSearch(e.target.value);
                    }}
                    value="Search"
                  />
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table
                className="table table-striped custom-table"
                id="assignLabsTable"
              >
                <thead>
                  <tr>
                    <th scope="col">Company ID</th>
                    <th scope="col">Company Name</th>
                    <th scope="col">Company Address</th>
                    <th scope="col">Company Email</th>
                    <th scope="col">Company Phone</th>
                    <th scope="col">Action</th>
                    <th scope="col" />
                  </tr>
                </thead>
             
                <tbody>
                  {listOfpackage &&
                    listOfpackage
                      .filter((value) => {
                        if (PackageSearch === "") {
                          return value;
                        } else if (
                          value.package_name
                            .toLowerCase()
                            .includes(PackageSearch.toLowerCase())
                        ) {
                          return value;
                        }
                      })
                      .map((supplier, i) => (
                        <tr class="crs-tr" data-status="active">
                          <td className="crs-td">{supplier.supplierId}</td>
                          <td className="crs-td">{supplier.supplierName}</td>
                          <td className="crs-td">
                            {supplier.supplierAddress}
                          </td>
                          <td className="crs-td">
                            {supplier.supplierEmail}
                          </td>
                          <td className="crs-td">{supplier.supplierMobile}</td>
                          
                          <td>
                    <i className="fa-solid fa-pen me-3 text-primary d-inline fa-2x" onClick={() => {
                         loadPackageDetailsedit(supplier);}}
                    />
                    <i className="fa-solid fa-trash-can d-inline me-2 text-danger d-inline fa-2x"/>
                </td>
                          
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplierManagement;
