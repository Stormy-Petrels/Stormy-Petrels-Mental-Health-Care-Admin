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
import Loading from "../components/Loading";
function Patients() {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/admin/patients`)
      .then((res) => {
        console.log(res);
        setPatients(res.data.payload);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <div className="flex">
        <Loading />
        <p>Loading</p>
      </div>
    );
  }
  var patientDetails = "";
  patientDetails = patients
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
          <Link to="/">
            <Button
              variant="contained"
              sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'darkgreen' } }}
            >
              Active
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="outlined"
              sx={{ borderColor: 'red', color: 'red', '&:hover': { borderColor: 'darkred', color: 'darkred' } }}
            >
              Inactive
            </Button>
          </Link>
        </div>
      </TableCell>
      <TableCell align="right">
        <Link to={`/admin/patients/${patient.id}/edit`}>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'blue', color: 'white', '&:hover': { backgroundColor: 'darkblue' } }}
          >
            EDIT
          </Button>
        </Link>
      </TableCell>
        </TableRow>
      );
    });

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl mb-4">Management patients</h1>
        <Button variant="contained"><Link to="/admin/patients/create">ADD</Link></Button>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: 100 }}>
                  Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: 50 }}>
                  Email
                </TableCell>
                <TableCell align="left" style={{ minWidth: 70 }}>
                  Phone
                </TableCell>
                <TableCell align="left" style={{ minWidth: 50 }}>
                  Address
                </TableCell>
                <TableCell align="left" style={{ minWidth: 100 }}>
                  Health Condition
                </TableCell>
                <TableCell align="left" style={{ minWidth: 100 }}>
                  Note
                </TableCell>
                <TableCell align="left" style={{ minWidth: 70 }}>
                  Status
                </TableCell>
                <TableCell align="center" style={{ minWidth: 100 }}>
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
