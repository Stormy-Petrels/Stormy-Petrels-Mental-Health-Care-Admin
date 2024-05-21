import React from "react";
import Logo from "../components/Logo";
import { Sidebar, Menu, MenuItem } from "react-mui-sidebar";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Sidebar>
      
      <Menu subHeading="">
      <Logo />
        <MenuItem>
          <Link to="/admin/dashboard">
            <span>Dashboard</span>
          </Link>
        </MenuItem>

        <MenuItem>
          <Link to="/admin/doctors">
            <span>Doctors</span>
          </Link>
        </MenuItem>

        <MenuItem>
          <Link to="/admin/patients">
            <span>Patients</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/admin/appointments">
            <span>Appointments</span>
          </Link>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default Navbar;