import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextField,
  Container,
  Typography,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function DoctorCreate() {
  const [inputErrorList, setInputErrorList] = useState({});
  const [majors, setMajors] = useState([]);
  const [doctor, setDoctor] = useState({
    description: "",
    major: "",
    email: "",
    password: "",
    fullName: "",
    address: "",
    phone: "",
    isActive: 1,
    urlImage: null,
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

  const handleImageChange = (e) => {
    setDoctor({ ...doctor, urlImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", doctor.description);
    formData.append("major", doctor.major);
    formData.append("email", doctor.email);
    formData.append("password", doctor.password);
    formData.append("fullName", doctor.fullName);
    formData.append("address", doctor.address);
    formData.append("phone", doctor.phone);
    formData.append("isActive", doctor.isActive);
    formData.append("urlImage", doctor.urlImage);

    axios
      .post("http://127.0.0.1:8000/api/admin/doctors/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Add doctor successfully");
        setTimeout(() => {
          history.push("/admin/doctors");
        }, 2000);
        setDoctor({
          description: "",
          major: "",
          email: "",
          password: "",
          fullName: "",
          address: "",
          phone: "",
          isActive: 1,
          urlImage: null,
        });
        setInputErrorList({});
      })
      .catch(function (err) {
        if (err.response) {
          if (err.response.status === 400) {
            setInputErrorList(err.response.data.errors);
          }
        }
        toast.error("Have an error");
        console.error("Error adding doctor:", err);
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
            to="/admin/doctors"
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" gutterBottom>
            Add doctor
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
                  helperText={
                    inputErrorList.fullName && inputErrorList.fullName[0]
                  }
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
                  helperText={
                    inputErrorList.password && inputErrorList.password[0]
                  }
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
                  helperText={
                    inputErrorList.address && inputErrorList.address[0]
                  }
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
                  helperText={
                    inputErrorList.description && inputErrorList.description[0]
                  }
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
                    {majors.map((major) => (
                      <MenuItem key={major.id} value={major.id}>
                        {major.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ mt: 2 }}
                >
                  <input
                    name="urlImage"
                  
                    type="file"
                    onChange={handleImageChange}
                  />
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
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
