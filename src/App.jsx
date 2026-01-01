import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Snowfall from "react-snowfall";
import "./App.css";
import Home from "./components/Home/Home";
import AllRooms from "./components/AllRooms/AllRooms";
import RoomDetail from "./components/RoomDetail/RoomDetail";
import MyBooking from "./components/MyBooking/MyBooking";
import ContactUs from "./components/ContactUs/ContactUs";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        pauseOnHover
        theme="colored"
      />
      <Snowfall
        snowflakeCount={120}
        radius={[0.5, 3]}
        speed={[0.5, 3]}
        wind={[-0.5, 0.3]}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<AllRooms />} />
        <Route path="/room-detail/:id" element={<RoomDetail />} />
        <Route path="/my-bookings/:id" element={<MyBooking />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
