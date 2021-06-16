import React, { useState, useEffect, useMemo} from "react";
import EmployeeService from "../services/EmployeeService";
import { useTable } from "react-table";

const EmployeesList = (props) => {
  const [employees, setEmployees] = useState([]);
  //const employeesRef = useRef();

  //employeesRef.current = employees;

  useEffect(() => {
    retrieveEmployees();
  }, []);

  // const onChangeSearchName = (e) => {
  //   const searchName = e.target.value;
  //   setSearchName(searchName);
  // };

  const retrieveEmployees = () => {
    EmployeeService.getAll()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveEmployees();
  };

  const removeAllEmployees = () => {
    EmployeeService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const openEmployee = (rowIndex) => {
    // const EmpID = employeesRef.current[rowIndex].EmpID;

    props.history.push("/employees/" + rowIndex);
  };

  {/*
  const deleteEmployee = (rowIndex) => {
    //const EmpID = employeesRef.current[rowIndex].EmpID;

    EmployeeService.remove(rowIndex)
      .then((response) => {
        props.history.push("/employees");

        let newEmployees = [...employeesRef.current];
        newEmployees.splice(rowIndex, 1);

        setEmployees(newEmployees);
      })
      .catch((e) => {
        console.log(e);
      });
  };
*/}

  const columns = useMemo(
    () => [
      {
        Header: "Employee-ID",
        accessor: "EmpID",
      },
      {
        Header: "First Name",
        accessor: "First_name",
      },
      {
        Header: "Last Name",
        accessor: "Last_name",
      },
    {
      Header: "Contact",
      accessor: "Contact",
    },
     
      {
        Header: "Action",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.original.EmpID;
          console.log(props.row.original.EmpID);
          return (
            <div>
              <span onClick={() => openEmployee(rowIdx)}>
                <h6 className="btn btn-sm btn-primary">Edit</h6>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: employees,
  });

  return (
    <div className="list row">
    <div className="col-md-12 list">
      <table
        className="table table-striped table-bordered"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    <div className="col-md-8">
      <button className="btn btn-sm btn-danger" onClick={removeAllEmployees}>
        Remove All
      </button>
    </div>
  </div>
  );
};

export default EmployeesList;