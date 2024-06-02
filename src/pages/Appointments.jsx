import axios from "axios";
import { useState, useEffect } from 'react';
import React from 'react';
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
  Typography,
  TableSortLabel
} from "@mui/material";
import Loading from "../components/Loading";

function Appointment() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc'); // State to manage sort order
  const [orderBy, setOrderBy] = useState('date'); // State to manage the column being sorted

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/appoinment`)
      .then((res) => {
        console.log(res);
        setAppointments(res.data.appointments);
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

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (orderBy === 'date') {
      return order === 'asc'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="flex">
        <Loading />
        <p>Loading</p>
      </div>
    );
  }

  const AppointmentDetails = sortedAppointments
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((appointment) => {
      return (
        <TableRow key={appointment.appointmentId}>
          <TableCell align="left">{appointment.appointmentId}</TableCell>
          <TableCell align="left">{appointment.patientName}</TableCell>
          <TableCell align="left">{appointment.doctorName}</TableCell>
          <TableCell align="left">{appointment.date}</TableCell>
          <TableCell align="left">{appointment.timeStart}</TableCell>
          <TableCell align="left">{appointment.timeEnd}</TableCell>
          <TableCell align="right">
          </TableCell>
        </TableRow>
      );
    });

  return (
    <div>
      <div className="flex justify-between">
        <Typography variant="h4" gutterBottom>
          Management appointment
        </Typography>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: 100 }}>
                  Id
                </TableCell>
                <TableCell align="left" style={{ minWidth: 50 }}>
                  PatientName
                </TableCell>
                <TableCell align="left" style={{ minWidth: 70 }}>
                  DoctorName
                </TableCell>
                <TableCell align="left" style={{ minWidth: 50 }}>
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={order}
                    onClick={() => handleRequestSort('date')}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left" style={{ minWidth: 100 }}>
                  Time Start
                </TableCell>
                <TableCell align="left" style={{ minWidth: 100 }}>
                  Time End
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{AppointmentDetails}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={appointments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default Appointment;
