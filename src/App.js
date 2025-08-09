import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
import Navbar from "./components/layout/Navbar.js";
// import "./styles/main.css";
import "./output.css";
import UserProvider, { UserContext } from "./contexts/UserContext.js";
import { useContext } from "react";
import DashboardLayout from "./components/layout/DashboardLayout.js";
import JobList from "./pages/dashboard/JobList.js";
import StatusPieChart from "./components/dashboard/StatusPieChart.js";
import Home from "./pages/Home.js";


function AppRoutes() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar />
      {/* Public routes */}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        {/* Protected dashboard layout and nested routes */}
        <Route
          path="/dashboard"
          element={user ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route path="jobs" element={<JobList />} />
          <Route path="charts" element={<StatusPieChart />} />
        </Route>
      </Routes>
    </>
  );
}
function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;
