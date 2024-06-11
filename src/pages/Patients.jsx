import React from "react";
import axios from "axios";
import { format } from "date-fns";
// import { get } from "https";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useState, useEffect } from "react";
import {  useHistory, useLocation } from "react-router-dom";
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
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
function Patients() {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const [reload, setReload] = useState(false);

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
  }, [reload]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const InActive = async (id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/admin/users/status/block/${id.id}`).then(setReload(!reload));
    } catch (error) {
      console.error('Error posting link:', error);
    }
  };
  
  const Active = async (id) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/admin/users/status/active/${id.id}`).then(setReload(!reload));
    } catch (error) {
      console.error('Error posting link:', error);
    }
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
          <TableCell align="left">
          {patient.isActive === "1" ? (
              <Typography style={{ color: "green" }}>active</Typography>
            ) : (
              <Typography style={{ color: "red" }}>inactive</Typography>
            )}
      </TableCell>
      <TableCell align="left">
        <Link to={`/admin/patients/${patient.id}/edit`}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "blue",
              color: "white",
              fontSize: "4",
              "&:hover": { backgroundColor: "darkblue" },
              width: 80,
            }}
          >
            Edit
          </Button>
        </Link>

        <div >
          {patient.isActive == 1 ? (
            <Button
              variant="outlined"
              sx={{
                borderColor: "red",
                fontSize: "12",
                color: "red",
                "&:hover": { borderColor: "darkred", color: "darkred" },
                width: 80,
              }}
onClick={() => InActive({ id: patient.id })}
            >
              Inactive
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "green",
                color: "white",
                "&:hover": { backgroundColor: "darkgreen" },
                width: 80,
              }}
              onClick={() => Active({ id: patient.id })}
            >
              Active
            </Button>
          )}
        </div>

      </TableCell>
        </TableRow>
      );
    });

  return (
    <div>
      <div className="flex justify-between">
      <Typography variant="h4" gutterBottom>
        Management patients
      </Typography>
        <Link to="/admin/patients/create">
          <Button
            variant="contained"
            sx={{ backgroundColor: 'blue', color: 'white', '&:hover': { backgroundColor: 'darkblue' } }}
          >
            Add
          </Button>
        </Link>




      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
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