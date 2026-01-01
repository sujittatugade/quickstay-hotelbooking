import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import api from "../../config/api.js";
import "./MyBooking.css";
import { Button } from "@mui/material";

function MyBooking() {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const bookingRes = await api.get(`/bookings/user/${id}`);

        const mergedData = await Promise.all(
          bookingRes.data.map(async (booking) => {
            const roomRes = await api.get(`/rooms/${booking.roomId}`);

            return {
              ...booking,
              room: roomRes.data,
            };
          })
        );

        setBookings(mergedData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchBookings();
  }, [id]);

  const handleBookingCancel = async (bookingId) => {
    try {
      await api.put(`/bookings/cancel-booking/${bookingId}`);

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "CANCELED" } : b))
      );
    } catch (error) {
      console.error("Cancel booking failed", error);
    }
  };

  return (
    <div className="my-booking-container">
      <Navbar />

      <div className="my-booking">
        <h1>My Bookings</h1>
        <p>Manage your past, current, and upcoming reservations.</p>

        <div className="table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Hotel</th>
                <th>Room</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="hotel-cell">
                    <img
                      src={`data:image/jpeg;base64,${b.room.images[0].image}`}
                      alt="room"
                    />
                    <span>The Quick Stay</span>
                  </td>

                  <td>{b.room.roomType}</td>
                  <td>{b.checkIn}</td>
                  <td>{b.checkOut}</td>
                  <td>₹ {b.room.pricePerNight}</td>

                  <td>
                    <div className="status-btn">
                      <span className={b.status === "PAID" ? "paid" : "unpaid"}>
                        ● {b.status}
                      </span>
                      {b.status === "UNPAID" && (
                        <Button
                          type="button"
                          onClick={() => handleBookingCancel(b.id)}>
                          Cancel Booking
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MyBooking;
