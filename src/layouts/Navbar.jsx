import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import Logo from "../components/Logo"; 
import { color } from "@mui/system";

const Navbar = () => {
  return (
    <Box
      sx={{
        width: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh'
      }}
    >
      <Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          
        <Avatar
            src="https://react-adb-mui.netlify.app/alex.jpg" 
            alt="Admin Avatar"
            sx={{ width: 90, height: 90 }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Typography 
          variant="h6"
          sx={{
            color: '#3DA58A',
            fontSize: '0.875rem', 
            textAlign: 'center',
            marginBottom: 1
          }}  >
            MAIN ADMIN
          </Typography>
           
          </Box>
        <Divider />
        <List>
          <ListItem button component={Link} to="/" sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon sx={{ minWidth: 35 }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/admin/statistic" sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon sx={{ minWidth: 35 }}>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Statistic" />
          </ListItem>
          <ListItem button component={Link} to="/admin/doctors" sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon sx={{ minWidth: 35 }}>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary="Doctors" />
          </ListItem>
          <ListItem button component={Link} to="/admin/patients" sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon sx={{ minWidth: 35 }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Patients" />
          </ListItem>
          <ListItem button component={Link} to="/admin/appointments" sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon sx={{ minWidth: 35 }}>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Appointments" />
          </ListItem>
        </List>
      </Box>
     
    </Box>
  );
};

export default Navbar;
