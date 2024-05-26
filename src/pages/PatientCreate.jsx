import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Button, TextField, Container, Typography, Grid, IconButton } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function PatientCreate() {
  const [inputErrorList, setInputErrorList] = useState({});
  const [patient, setPatient] = useState({
    healthCondition: '',
    note: '',
    email: '',
    password: '',
    fullName: '',
    address: '',
    phone: '',
    isActive: 1
  });

  const history = useHistory();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      healthCondition: patient.healthCondition,
      note: patient.note,
      email: patient.email,
      password: patient.password,
      fullName: patient.fullName,
      address: patient.address,
      phone: patient.phone,
      isActive: patient.isActive
    };

    axios.post('http://127.0.0.1:8000/api/admin/patients/create', data)
      .then((res) => {
        toast.success('Add patient successfully');
        setTimeout(() => {
          history.push('/admin/patients');
        }, 2000);
        setPatient({
          healthCondition: '',
          note: '',
          email: '',
          password: '',
          fullName: '',
          address: '',
          phone: '',
          isActive: 1
        });
        setInputErrorList({});
      })
      .catch(function (err) {
        if (err.response) {
          if (err.response.status === 400) {
            setInputErrorList(err.response.data.errors);
          }
        }
        toast.error('Have an error');
        console.error('Error adding patient:', err);
      });
  };

  return (
    <div>
      <Container>
        <ToastContainer />
        <div className="flex">
            <IconButton className="justify-content" component={Link} to="/admin/patients" aria-label="back">
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" gutterBottom>
                Add patient
            </Typography>
        </div>
        <div>
        <form onSubmit={handleSubmit}>
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
                        error={!!inputErrorList.fullName}
                        helperText={inputErrorList.fullName && inputErrorList.fullName[0]}
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
                        error={!!inputErrorList.email}
                        helperText={inputErrorList.email && inputErrorList.email[0]}
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
                        error={!!inputErrorList.password}
                        helperText={inputErrorList.password && inputErrorList.password[0]}
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
                        error={!!inputErrorList.phone}
                        helperText={inputErrorList.phone && inputErrorList.phone[0]}
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
                        error={!!inputErrorList.address}
                        helperText={inputErrorList.address && inputErrorList.address[0]}
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
                        error={!!inputErrorList.healthCondition}
                        helperText={inputErrorList.healthCondition && inputErrorList.healthCondition[0]}
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
                        error={!!inputErrorList.note}
                        helperText={inputErrorList.note && inputErrorList.note[0]}
                    />
                </Grid>

           
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Add Patient
                    </Button>
                </Grid>
            </Grid>
        </form>
        </div>
      </Container>
    </div>
  );
}

export default PatientCreate;
