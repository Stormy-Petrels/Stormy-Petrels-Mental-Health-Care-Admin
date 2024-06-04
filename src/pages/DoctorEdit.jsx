import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextField,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function DoctorEdit() {
  let { id } = useParams();
  const [majors, setMajors] = useState([]);
  const [doctor, setDoctor] = useState({
    email: "",
    password: "",
    fullName: "",
    address: "",
    phone: "",
    description: "",
    major: "",
  });

  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/doctor/profile/${id}`)
      .then((res) => {
        setDoctor(res.data.doctor);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching doctor profile");
      });
  }, [id]);

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

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      id: id,
      email: doctor.email,
      password: doctor.password,
      fullName: doctor.fullName,
      address: doctor.address,
      phone: doctor.phone,
      description: doctor.description,
      majorId: doctor.major, 
    };
  
    axios
      .post(`http://127.0.0.1:8000/api/updateProfile/doctor`, data)
      .then((res) => {
        toast.success("Update doctor successfully");
        setTimeout(() => {
          history.push("/admin/doctors");
        }, 1500);
      })
      .catch((err) => {
        toast.error("Error updating doctor");
        console.error("Error updating doctor", err);
      });
  };
  
  return (
    <div>
      <Container>
        <ToastContainer />
        <div className="flex ">
        <IconButton className="justify-content" component={Link} to="/admin/doctors" aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" gutterBottom>
                Edit doctor
            </Typography>
        </div>
        <div>
          <form onSubmit={handleUpdate}>
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel shrink>Major</InputLabel>
                  <Select
                    name="major"
                    value={doctor.major}
                    onChange={handleInput}
                    displayEmpty
                  >
                    {majors.map((major) => (
                      <MenuItem key={major.id} value={major.id}>
                        {major.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Edit Doctor
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default DoctorEdit;
