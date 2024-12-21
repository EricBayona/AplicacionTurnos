import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
// import Home from "./Pages/home"
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import UserProfile from "./components/Users/UserProfile";
import Booking from "./components/Appointments/Booking";
import AppointmentsList from "./components/Appointments/AppointmentsList";
import AdminDashboard from "./components/Admin/AdminDashboard";
import RoleBasedRoute from "./components/RoleBasedRoute";
import AddDoctor from "./components/Admin/AddDoctors";
import AppointmentsCalendar from "./components/Appointments/Calendar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calendar" element={<AppointmentsCalendar/>} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/appointments" element={<AppointmentsList />} />
        <Route
          path="/admin"
          element={
            <RoleBasedRoute requiredRole="admin">
              <AdminDashboard />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/add-doctor"
          element={
            <RoleBasedRoute requiredRole="admin">
              <AddDoctor/>
            </RoleBasedRoute>
          }

        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
