import "./App.css";
import Navbar from "./layouts/Navbar";
import MainLayout from "./layouts/MainLayout";
import Grid from "@mui/material/Grid";
import AnimaCursor from './components/AnimaCursor';
function App() {
  return (
    <div className="flex h-screen">
      <AnimaCursor/>
      <div className="bg-slate-200  p-2">
          <Navbar />
      </div>
      <div className="flex-1 p-6">
        <MainLayout />
      </div>
    </div>
  );
}

export default App;
