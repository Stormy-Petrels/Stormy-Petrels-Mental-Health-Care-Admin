import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Button, TextField, Container, Typography, IconButton, Grid } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from 'react-router-dom';
import {FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function DoctorCreate() {
  const [inputErrorList, setInputErrorList] = useState({});
  const [majors, setMajors] = useState([]);
  const [doctor, setDoctor] = useState({
    description: '',
    major: '',
    email: '',
    password: '',
    fullName: '',
    address: '',
    phone: '',
    isActive: 1
  });
  const history = useHistory();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/major")
      .then((res) => {
        setMajors(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching majors:", err);
        toast.error("Error fetching majors");
      });
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      description: doctor.description,
      major: doctor.major,
      email: doctor.email,
      password: doctor.password,
      fullName: doctor.fullName,
      address: doctor.address,
      phone: doctor.phone,
      isActive: doctor.isActive
    };

    axios.post('http://127.0.0.1:8000/api/admin/doctors/create', data)
      .then((res) => {
        toast.success('Add doctor successfully');
        setTimeout(() => {
          history.push('/admin/doctors');
        }, 2000);
        setDoctor({
          description: '',
          major: '',
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
        console.error('Error adding doctor:', err);
      });
  };

  return (
    <div>
      <Container>
        <ToastContainer />
        <div className="flex">
            <IconButton className="justify-content" component={Link} to="/admin/doctors" aria-label="back">
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" gutterBottom>
                Create doctor
            </Typography>
        </div>
        <div>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
               
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Full Name"
                        name="fullName"
                        value={doctor.fullName}
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
                        value={doctor.email}
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
                        value={doctor.password}
                        onChange={handleInput}
                        type="password"
                        fullWidth
                        margin="normal"
                        required
                        error={!!inputErrorList.password}
                        helperText={inputErrorList.password && inputErrorList.password[0]}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        label="Phone"
                        name="phone"
                        value={doctor.phone}
                        onChange={handleInput}
                        fullWidth
                        margin="normal"
                        required
                        error={!!inputErrorList.phone}
                        helperText={inputErrorList.phone && inputErrorList.phone[0]}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Address"
                        name="address"
                        value={doctor.address}
                        onChange={handleInput}
                        fullWidth
                        margin="normal"
                        required
                        error={!!inputErrorList.address}
                        helperText={inputErrorList.address && inputErrorList.address[0]}
                    />
                </Grid>

       
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Description"
                        name="description"
                        value={doctor.description}
                        onChange={handleInput}
                        fullWidth
                        margin="normal"
                        error={!!inputErrorList.description}
                        helperText={inputErrorList.description && inputErrorList.description[0]}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Major</InputLabel>
                        <Select
                            name="major"
                            value={doctor.major}
                            onChange={handleInput}
                        >
                            {majors.map(major => (
                                <MenuItem key={major.id} value={major.id}>
                                    {major.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Add Doctor
                    </Button>
                </Grid>
            </Grid>
        </form>
        </div>
      </Container>
    </div>
  );
}

export default DoctorCreate;
