import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, TextField, Container } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
function PatientEdit() {
    let {id} = useParams();
    
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
          })
          .catch((err) => {
            toast.error('Have an error');
            console.error('Error adding patient:', err);
          });
      };
      

  return (
    <div>
      <Container>
        <ToastContainer />
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl mb-4">Edit patient</h1>
          <Button variant="contained">
            <Link to="/admin/patients">Back</Link>
          </Button>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="fullName"
              value={patient.fullName}
              onChange={handleInput}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              value={patient.email}
              onChange={handleInput}
              type="email"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              name="password"
              value={patient.password}
              onChange={handleInput}
              type="password"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Phone"
              name="phone"
              value={patient.phone}
              onChange={handleInput}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Address"
              name="address"
              value={patient.address}
              onChange={handleInput}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Health Condition"
              name="healthCondition"
              value={patient.healthCondition}
              onChange={handleInput}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Note"
              name="note"
              value={patient.note}
              onChange={handleInput}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Add Patient
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default PatientEdit;
