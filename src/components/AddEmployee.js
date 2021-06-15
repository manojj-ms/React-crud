import React, { useState } from "react";
import EmployeeService from "../services/EmployeeService";

const AddEmployee = () => {
  const initialEmployeeState = {
    EmpID: "",
    First_name: "",
    Last_name: "",
    Salary: "",
    Contact: ""
  };
  const [employee, setEmployee] = useState(initialEmployeeState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const saveEmployee = () => {
    var data = {
      EmpID: employee.EmpID,
      First_name: employee.First_name,
      Last_name: employee.Last_name,
      Salary: employee.Salary,
      Contact: employee.Contact,
    };

    EmployeeService.create(data)
      .then(response => {
        setEmployee({
          EmpID: response.data.EmpID,
          First_name: response.data.First_name,
          Last_name: response.data.Last_name,
          Salary: response.data.Salary,
          Contact: response.data.Contact,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newEmployee = () => {
    setEmployee(initialEmployeeState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newEmployee}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="EmpID">Employee-ID</label>
            <input
              type="text"
              className="form-control"
              id="EmpID"
              required
              value={employee.EmpID}
              onChange={handleInputChange}
              name="EmpID"
            />
          </div>

          <div className="form-group">
            <label htmlFor="First_name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="First_name"
              required
              value={employee.First_name}
              onChange={handleInputChange}
              name="First_name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="Last_name"
              required
              value={employee.Last_name}
              onChange={handleInputChange}
              name="Last_name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Contact">Contact</label>
            <input
              type="text"
              className="form-control"
              id="Contact"
              required
              value={employee.Contact}
              onChange={handleInputChange}
              name="Contact"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Salary">Salary</label>
            <input
              type="text"
              className="form-control"
              id="Salary"
              required
              value={employee.Salary}
              onChange={handleInputChange}
              name="Salary"
            />
          </div>

          <button onClick={saveEmployee} className="btn btn-success mt-4">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddEmployee;