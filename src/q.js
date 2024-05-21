// AdminLayout.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FaTachometerAlt, FaUserMd, FaUserInjured, FaCalendarAlt, FaCog } from 'react-icons/fa';

// Pages
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Settings from './pages/Settings';

const AdminLayout = () => {
  return (

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white w-64 p-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Admin</h2>
          </div>
          <nav>
           
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          <Switch>
            <Route path="/admin/dashboard">
              <Dashboard />
            </Route>
            <Route path="/admin/doctors">
              <Doctors />
            </Route>
            <Route path="/admin/patients">
              <Patients />
            </Route>
            <Route path="/admin/appointments">
              <Appointments />
            </Route>
            <Route path="/admin/settings">
              <Settings />
            </Route>
          </Switch>
        </div>
      </div>
    
  );
};

export default AdminLayout;