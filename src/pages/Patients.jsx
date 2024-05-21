import React from "react";
import axios from "axios";
import { format } from "date-fns";
// import { get } from "https";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0); // trạng thái trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(10); // số hàng mỗi trang

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/admin/patients`)
      .then((res) => {
        console.log(res);
        setPatients(res.data.payload);
      })
      .catch((err) => {
        console.error(err); // Để in ra lỗi nếu có
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  var patientDetails = "";
  patientDetails = patients
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // phân trang
    .map((patient) => {
      return (
        <TableRow key={patient.id}>
          <TableCell align="left">{patient.fullName}</TableCell>
          <TableCell align="left">{patient.email}</TableCell>
          <TableCell align="left">{patient.phone}</TableCell>
          <TableCell align="left">{patient.address}</TableCell>
          <TableCell align="left">{patient.healthCondition}</TableCell>
          <TableCell align="left">{patient.note}</TableCell>
          <TableCell align="right">
            <div className="flex justify-center">
              <Link to="/">EDIT</Link>
              <Link to="/">DELETE</Link>
            </div>
          </TableCell>
        </TableRow>
      );
    });

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl mb-4">Management patients</h1>
        <Button variant="contained">Add patient</Button>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: 70 }}>
                  Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: 100 }}>
                  Email
                </TableCell>
                <TableCell align="left" style={{ minWidth: 70 }}>
                  Phone
                </TableCell>
                <TableCell align="left" style={{ minWidth: 50 }}>
                  Address
                </TableCell>
                <TableCell align="left" style={{ minWidth: 170 }}>
                  Health Condition
                </TableCell>
                <TableCell align="left" style={{ minWidth: 170 }}>
                  Note
                </TableCell>
                <TableCell align="center" style={{ minWidth: 170 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{patientDetails}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={patients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default Patients;
