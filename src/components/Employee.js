import React, { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";

const Employee = props => {
    const initialEmployeeState = {
        EmpID: "",
        First_name: "",
        Last_name: "",
        Salary: "",
        Contact: ""
      };
  const [currentEmployee, setCurrentEmployee] = useState(initialEmployeeState);
  const [message, setMessage] = useState("");

  const getEmployee = EmpID => {
    EmployeeService.get(EmpID)
      .then(response => {
        setCurrentEmployee(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getEmployee(props.match.params.EmpID);
  }, [props.match.params.EmpID]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentEmployee({ ...currentEmployee, [name]: value });
  };

  const updateEmployee = () => {
    EmployeeService.update(currentEmployee.EmpID, currentEmployee)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteEmployee = () => {
    EmployeeService.remove(currentEmployee.EmpID)
      .then(response => {
        console.log(response.data);
        props.history.push("/employees");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentEmployee ? (
        <div className="edit-form">
          <h4>Employee</h4>
          <form>
            <div className="form-group mt-2">
              <label htmlFor="id">EmpID</label>
              <input
                type="text"
                className="form-control"
                id="EmpID"
                name="EmpID"
                value={currentEmployee.EmpID}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="First_name"
                name="First_name"
                value={currentEmployee.First_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="Last Name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="Last_name"
                name="Last_name"
                value={currentEmployee.Last_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="Last Name">Contact</label>
              <input
                type="text"
                className="form-control"
                id="Contact"
                name="Contact"
                value={currentEmployee.Contact}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              
              
            </div>
          </form>

        

          <button className="badge badge-danger mr-2 btn-danger" onClick={deleteEmployee}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success btn-primary mt-3"
            onClick={updateEmployee}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Employee...</p>
        </div>
      )}
    </div>
  );
};

export default Employee;