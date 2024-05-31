import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import Loading from "../components/Loading";

function Doctors() {
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/admin/doctors`)
      .then((res) => {
        setDoctors(res.data.data);
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

  const baseURL = "http://127.0.0.1:8000/images/"; // Adjust this base URL as per your backend setup

  var doctorDetails = doctors
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((doctor) => {
      return (
        <TableRow key={doctor.id}>
          <TableCell align="left">{doctor.fullName}</TableCell>
          <TableCell align="left">
            {doctor.image ? (
              <img
                src={`${baseURL}${doctor.image}`}
                alt={doctor.fullName}
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
            ) : (
              "No Image"
            )}
          </TableCell>
          <TableCell align="left">{doctor.email}</TableCell>
          <TableCell align="left">{doctor.phone}</TableCell>
          <TableCell align="left">{doctor.address}</TableCell>
          <TableCell align="left">{doctor.major}</TableCell>
          <TableCell align="left">{doctor.description}</TableCell>
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
            <Link to={`/admin/doctors/${doctor.id}/edit`}>
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
        <h1 className="font-bold text-3xl mb-4">Management doctors</h1>
        <Button variant="contained"><Link to="/admin/doctors/create">ADD</Link></Button>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: 100 }}>
                  Name
                </TableCell>
                <TableCell align="left" style={{ maxWidth: 90 }}>
                  Avt
                </TableCell>
                <TableCell align="left" style={{ minWidth: 50 }}>
                  Email
                </TableCell>
                <TableCell align="left" style={{ minWidth: 20 }}>
                  Phone
                </TableCell>
                <TableCell align="left" style={{ minWidth: 40 }}>
                  Address
                </TableCell>
                <TableCell align="left" style={{ minWidth: 100 }}>
                  Major
                </TableCell>
                <TableCell align="left" style={{ minWidth: 120 }}>
                  Description
                </TableCell>
                <TableCell align="left" style={{ minWidth: 70 }}>
                  Status
                </TableCell>
                <TableCell align="center" style={{ minWidth: 100 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{doctorDetails}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={doctors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default Doctors;
