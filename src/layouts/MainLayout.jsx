import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Doctors from "../pages/Doctors";
import Patients from "../pages/Patients";
import NotFound from "../pages/NotFound";
const MainLayout = () => {
  return (
    <div className="container">
      <Switch>
        {/* <Route exact path="/" component={Search} /> */}
     
        <Route exact path="admin/doctors" component={Doctors}></Route>
        <Route exact path="admin/patients" component={Patients} />
        <Route path="/*" component={NotFound}></Route>
      </Switch>
    </div>
  );
};
export default MainLayout;
