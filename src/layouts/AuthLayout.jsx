import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Signin from "../pages/Signin";
import NotFound from "../pages/NotFound";

const AuthLayout = () => {
  return (
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default AuthLayout;
