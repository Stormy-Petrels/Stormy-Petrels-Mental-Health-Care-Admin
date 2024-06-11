import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, TextField, Container, Typography, Grid } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function PatientEdit() {
  let { id } = useParams();

  const [patient, setPatient] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/profile/${id}`)
      .then((res) => {
        console.log(res);
        setPatient(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const history = useHistory();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      email: patient.email,
      password: patient.password,
      fullName: patient.fullName,
      address: patient.address,
      phone: patient.phone,
      image: patient.image,
      healthCondition: patient.healthCondition,
      note: patient.note,
    };

    axios
      .post(`http://127.0.0.1:8000/api/profile/${id}/edit`, data)
      .then((res) => {
        toast.success("Update patient successfully");
        setTimeout(() => {
          history.push("/admin/patients");
        }, 2000);
        setPatient({
          email: "",
          password: "",
          fullName: "",
          address: "",
          phone: "",
          image: "",
          healthCondition: "",
          note: "",
        });
      })
      .catch((err) => {
        toast.error("Have an error");
        console.error("Error adding patient:", err);
      });
  };

  return (
    <div>
      <Container>
        <ToastContainer />
        <div className="flex">
          <IconButton
            className="justify-content"
            component={Link}
            to="/admin/patients"
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" gutterBottom>
            Edit patient
          </Typography>
        </div>
        <div>
          <form onSubmit={handleUpdate}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  value={patient.fullName}
                  onChange={handleInput}
                  fullWidth
                  margin="normal"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Email"
                  name="email"
                  value={patient.email}
                  onChange={handleInput}
                  type="email"
                  fullWidth
                  margin="normal"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Password"
                  name="password"
                  value={patient.password}
                  onChange={handleInput}
                  type="password"
                  fullWidth
                  margin="normal"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={patient.phone}
                  onChange={handleInput}
                  fullWidth
                  margin="normal"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Address"
                  name="address"
                  value={patient.address}
                  onChange={handleInput}
                  fullWidth
                  margin="normal"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Health Condition"
                  name="healthCondition"
                  value={patient.healthCondition}
                  onChange={handleInput}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Note"
                  name="note"
                  value={patient.note}
                  onChange={handleInput}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Update patient
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default PatientEdit;
