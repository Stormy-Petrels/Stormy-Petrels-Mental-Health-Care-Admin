import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from 'react-router-dom';

function DoctorCreate() {
  const [inputErrorList, setInputErrorList] = useState({});
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
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl mb-4">Add doctors</h1>
          <Button variant="contained">
            <Link to="/admin/doctors" style={{ textDecoration: 'none', color: 'white' }}>Back</Link>
          </Button>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
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
            <TextField
              label="Major"
              name="major"
              value={doctor.major}
              onChange={handleInput}
              fullWidth
              margin="normal"
              error={!!inputErrorList.major}
              helperText={inputErrorList.major && inputErrorList.major[0]}
            />
            <Button type="submit" variant="contained" color="primary">
              Add Doctor
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default DoctorCreate;
