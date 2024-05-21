import React from 'react'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { format } from "date-fns";
import { get } from "https";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
function Patients() {
  return (
    <div>
      <div className="flex justify-between">
          <h1 className="font-bold text-3xl mb-4">Management patients</h1>
          <Button
            
            startIcon={<AddIcon />}
          >
            Add patient
          </Button>
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

              
            </Table>
          </TableContainer>
          <TablePagination
            
          />
        </Paper>
    </div>
  )
}

export default Patients

