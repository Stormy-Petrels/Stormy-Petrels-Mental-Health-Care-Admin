import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Container,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setEmailError("");
    setPasswordError("");

    try {
      const response = await axios.post("http://localhost:8000/api/sign-in", {
        email,
        password,
      });

      if (response.data.payload) {
        setMessage("Sign in successfully!");
        localStorage.setItem("authToken", response.data.payload.token);
        localStorage.setItem("user", JSON.stringify(response.data.payload));
        history.push("/admin/dashboard"); 
      }
    } catch (error) {
      if (error.response) {
        const { errors, message } = error.response.data;
        setMessage(message || "Error, please re-enter email or password.");
        if (errors) {
          setEmailError(errors.email ? errors.email.join(", ") : "");
          setPasswordError(errors.password ? errors.password.join(", ") : "");
        }
        if (message === "account has been locked") {
          setMessage("Your account has been locked. Please contact support.");
        } else if (message === "Invalid email or password") {
          setMessage("Invalid email or password.");
        }
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ py: 15 }}>
        <CssBaseline />
        <Paper elevation={6} sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {message && (
                <Alert
                  severity={
                    message.includes("successfully") ? "success" : "error"
                  }
                >
                  {message}
                </Alert>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: "#2C74DF",
                  textTransform: "none",
                  color: "white",
                  fontSize: "1.125rem",
                  textDecoration: "none",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                Sign in
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
