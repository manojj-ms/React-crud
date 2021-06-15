import React, { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";
import { Link } from "react-router-dom";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveEmployees();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveEmployees = () => {
    EmployeeService.getAll()
      .then(response => {
        setEmployees(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveEmployees();
    setCurrentEmployee(null);
    setCurrentIndex(-1);
  };

  const setActiveEmployee = (employee, index) => {
    setCurrentEmployee(employee);
    setCurrentIndex(index);
  };

  const removeAllEmployees = () => {
    EmployeeService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    EmployeeService.findByName(searchName)
      .then(response => {
        setEmployees(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name"
          value={searchName}
          onChange={onChangeSearchName}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByName}
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <h4>Employees List</h4>

      <ul className="list-group">
        {employees &&
          employees.map((employee, index) => (
            <li
              className={
                "list-group-item " + (index === currentIndex ? "active" : "")
              }
              onClick={() => setActiveEmployee(employee, index)}
              key={index}
            >
              {employee.First_name}
            </li>
          ))}
      </ul>

      <button
        className="m-3 btn btn-sm btn-danger"
        onClick={removeAllEmployees}
      >
        Remove All
      </button>
    </div>
    <div className="col-md-6">
      {currentEmployee ? (
        <div>
          <h4>Employee</h4>
          <div>
            <label>
              <strong>First Name:</strong>
            </label>{" "}
            {currentEmployee.First_name}
          </div>
          <div>
            <label>
              <strong>Last Name:</strong>
            </label>{" "}
            {currentEmployee.Last_name}
          </div>
          <div>
            <label>
              <strong>ID:</strong>
            </label>{" "}
            {currentEmployee.EmpID}
          </div>
          <div>
            <label>
              <strong>Contact:</strong>
            </label>{" "}
            {currentEmployee.Contact}
          </div>
          <Link
            to={"/employees/" + currentEmployee.EmpID}
            className="btn btn-sm btn-primary"
          >
            Edit
          </Link>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Employee...</p>
        </div>
      )}
    </div>
  </div>
);
};

export default EmployeesList;