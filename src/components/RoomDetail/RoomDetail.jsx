import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import api from "../../config/api.js";
import "./RoomDetail.css";
import { facilityIcons } from "../../assets/assets";
import SearchHotel from "../SearchHotels/SerachHotel";
import { toast } from "react-toastify";
import { Home, LocationOn, Verified } from "@mui/icons-material";

function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [guests, setGuests] = useState(0);
  const navigate = useNavigate();

  const formatDate = (date) => new Date(date).toISOString().split("T")[0];

  const checkAvailability = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select dates");
      return;
    }

    try {
      const res = await api.get(`/bookings/get-dates/${id}`);

      const overlap = res.data.some((b) => {
        return (
          new Date(startDate) < new Date(b.checkOut) &&
          new Date(endDate) > new Date(b.checkIn)
        );
      });

      if (overlap) {
        toast.error("Room not available");
        setIsAvailable(false);
      } else {
        toast.success("Room available");
        setIsAvailable(true);
      }
    } catch {
      toast.error("Availability check failed");
    }
  };

  const bookRoom = async () => {
    if (isBooking) return;

    const userId = Number(localStorage.getItem("userId"));
    if (!userId) {
      toast.error("Please login to book room");
      return;
    }

    try {
      setIsBooking(true);

      await api.post("/bookings/add-booking", {
        userId,
        roomId: Number(id),
        noOfPeople: guests,
        checkIn: formatDate(startDate),
        checkOut: formatDate(endDate),
      });

      toast.success("Room booked successfully");
      navigate(`/my-bookings/${userId}`);
    } catch {
      toast.error("Booking failed");
    } finally {
      setIsBooking(false);
    }
  };

  useEffect(() => {
    api
      .get(`/rooms/${id}`)
      .then((res) => setRoom(res.data))
      .catch(() => toast.error("Failed to load room"));
  }, [id]);

  useEffect(() => {
    setIsAvailable(false);
  }, [startDate, endDate]);

  return (
    <div className="room-detail">
      <Navbar />

      <div className="hotel-details">
        <div className="images">
          <div className="main-image">
            {room?.images?.length && (
              <img
                src={`data:image/jpeg;base64,${room.images[0].image}`}
                alt="Main"
              />
            )}
          </div>

          <div className="grid-images">
            {room?.images?.map((img, i) => (
              <img
                key={i}
                src={`data:image/jpeg;base64,${img.image}`}
                alt="Room"
              />
            ))}
          </div>
        </div>

        <div className="title-price">
          <span>Experience Luxury Like Never Before</span>
          <span>₹{room?.pricePerNight}/day</span>
        </div>

        <div className="amenities">
          {room?.amenities?.map((a, i) => (
            <div className="amenity" key={i}>
              <img src={facilityIcons[a.name]} alt={a.name} />
              <span>{a.name}</span>
            </div>
          ))}
        </div>
        <div className="search-hotel">
          <SearchHotel
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            guests={guests}
            setGuests={setGuests}
            onCheck={checkAvailability}
            onBook={bookRoom}
            isAvailable={isAvailable}
            isBooking={isBooking}
          />
        </div>
      </div>

      <div className="facilities">
        <div className="clean">
          <Home />
          <span>
            Clean Room <br /> You will have the clean room for you{" "}
          </span>
        </div>
        <div className="enhanced">
          <Verified />
          <span>
            Enhanced Clean <br /> The host has committed to provide clean rooms{" "}
          </span>
        </div>
        <div className="location">
          <LocationOn />
          <span>
            Great Location <br /> 90% of recent guests gave the location a
            5-star rating
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RoomDetail;
