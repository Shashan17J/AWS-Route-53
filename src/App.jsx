import Dashboard from "./Pages/Dashboard/page";
import { Routes, Route } from "react-router-dom";
import Domain from "./Pages/Domain/page";
import UpdateDNS from "./Pages/UpdateRecord/page";
import AddRecord from "./Pages/AddRecords/page";
import LoginPage from "./Pages/Login/page";
import SignupPage from "./Pages/SignUp/page";
import Navbar from "./Component/Navbar";
import PieChart from "./Pages/ChartAnalytics/page";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/domain" element={<Domain />}></Route>

        <Route path="/dashboard/:zoneId" element={<Dashboard />}></Route>
        <Route path="/analytics/:zoneId" element={<PieChart />}></Route>
        <Route
          path="/update/:zoneId/:name/:recordType"
          element={<UpdateDNS />}
        ></Route>
        <Route path="/add/:zoneId" element={<AddRecord />}></Route>
      </Routes>
    </>
  );
}

export default App;
