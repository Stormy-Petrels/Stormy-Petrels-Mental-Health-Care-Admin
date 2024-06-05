import "./App.css";
import Navbar from "./layouts/Navbar";
import MainLayout from "./layouts/MainLayout";
import Grid from "@mui/material/Grid";
import AnimaCursor from './components/AnimaCursor';
import AuthLayout from "./layouts/AuthLayout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <div className="flex h-screen">
            <AnimaCursor />
            <div className="bg-slate-200 p-2">
              <Navbar />
            </div>
            <div className="flex-1 p-6">
              <MainLayout />
            </div>
          </div>
        </Route>
        <Route path="/">
          <AuthLayout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
