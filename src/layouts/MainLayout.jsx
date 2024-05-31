import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Doctors from "../pages/Doctors";
import Patients from "../pages/Patients";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import Appointments from "../pages/Appointments";
import PatientCreate from "../pages/PatientCreate";
import PatientEdit from "../pages/PatientEdit";
import DoctorCreate from "../pages/DoctorCreate";
import DoctorEdit from "../pages/DoctorEdit";
import Statistic from "../pages/Statistic";
const MainLayout = () => {
  return (
    <div className="container" >
      <Switch>
        {/* <Route exact path="/" component={Search} /> */}
        <Route exact path="/admin/dashboard" component={Dashboard} />
        <Route exact path="/admin/doctors" component={Doctors} />
        <Route exact path="/admin/doctors/create" component={DoctorCreate} />
        <Route exact path="/admin/doctors/:id/edit" component={DoctorEdit} />
        <Route exact path="/admin/patients" component={Patients} />
        <Route exact path="/admin/patients/create" component={PatientCreate} />
        <Route exact path="/admin/patients/:id/edit" component={PatientEdit} />
        <Route exact path="/admin/appointments" component={Appointments} />
        <Route exact path="/admin/statistic" component={Statistic} />
        <Route path="/*" component={NotFound}></Route>
      </Switch>
    </div>
  );
};
export default MainLayout;
