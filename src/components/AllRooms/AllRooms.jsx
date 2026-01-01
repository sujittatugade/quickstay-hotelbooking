import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./AllRooms.css";
import { facilityIcons } from "../../assets/assets";
import { Button, Drawer, IconButton, useMediaQuery } from "@mui/material";
import { CurrencyRupee, FilterList, Close } from "@mui/icons-material";
import api from "../../config/api";
import { useNavigate } from "react-router-dom";

function AllRooms() {
  const [rooms, setRooms] = useState([]);
  const [popularFilter, setPopularFilter] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [toggleFilter, setToggleFilter] = useState(false);

  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms/all");

        const data = res.data;

        if (Array.isArray(data)) setRooms(data);
        else if (Array.isArray(data?.data)) setRooms(data.data);
        else if (Array.isArray(data?.rooms)) setRooms(data.rooms);
        else setRooms([]);
      } catch (error) {
        console.error("Failed to fetch rooms", error);
        setRooms([]);
      }
    };

    fetchRooms();
  }, []);

  const handlePopularFilter = (filter) => {
    setPopularFilter((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const handlePriceFilter = (range) => {
    setSelectedPrice((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const clearFilters = () => {
    setPopularFilter([]);
    setSelectedPrice([]);
  };

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const matchType =
        popularFilter.length === 0 || popularFilter.includes(room.roomType);

      const matchPrice =
        selectedPrice.length === 0 ||
        selectedPrice.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return room.pricePerNight >= min && room.pricePerNight <= max;
        });

      return matchType && matchPrice;
    });
  }, [rooms, popularFilter, selectedPrice]);

  const FiltersUI = () => (
    <div className="filter-container">
      <div className="filter-heading">
        <h2>Filters</h2>
        <span className="clear-btn" onClick={clearFilters}>
          Clear
        </span>
      </div>

      <hr className="divider" />

      <div className="filters-container">
        <div className="popular-filter">
          <h4>Popular Filters</h4>
          {["Single Bed", "Double Bed", "Family Suite", "Luxury Bed"].map(
            (filter) => (
              <label key={filter} className="filter-option">
                <input
                  type="checkbox"
                  checked={popularFilter.includes(filter)}
                  onChange={() => handlePopularFilter(filter)}
                />
                <span>{filter}</span>
              </label>
            )
          )}
        </div>

        <div className="price-filter">
          <h4>Price Filters</h4>
          {["700-5000", "5000-8000", "8000-15000"].map((price) => (
            <label key={price} className="filter-option">
              <input
                type="checkbox"
                checked={selectedPrice.includes(price)}
                onChange={() => handlePriceFilter(price)}
              />
              <span className="price-label">
                <CurrencyRupee fontSize="small" />
                {price}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        background:
          "linear-gradient(rgba(17,46,28),rgb(52,114,75),rgba(82,211,129))",
      }}>
      <Navbar />

      <div className="allRooms">
        <div className="roomsAndFilters">
          <div className="leftPart">
            <h2>Hotel Rooms</h2>
            <p>Take advantage of our limited-time offer</p>

            {isMobile && (
              <Button
                variant="contained"
                startIcon={<FilterList />}
                sx={{ mb: 2 }}
                onClick={() => setToggleFilter(true)}>
                Filters
              </Button>
            )}

            {filteredRooms.length === 0 && (
              <p style={{ marginTop: 20 }}>No rooms found</p>
            )}

            {filteredRooms.map((room) => (
              <div key={room.id}>
                <div className="hotel-card">
                  <div className="hotel-image">
                    <img
                      src={
                        room.images?.length
                          ? `data:image/jpeg;base64,${room.images[0].image}`
                          : "/no-image.png"
                      }
                      alt="room"
                    />
                  </div>

                  <div className="hotel-info">
                    <div className="hotel-info-sub">
                      <div className="hotel-title">
                        <span>{room.roomType}</span>
                      </div>

                      <div className="rating">
                        <p>200+ reviews</p>
                      </div>

                      <div className="hotel-services">
                        {room.amenities?.map((amenity, i) => (
                          <div key={i} className="aminities">
                            <img
                              src={facilityIcons[amenity.name]}
                              alt={amenity.name}
                            />
                            <p>{amenity.name}</p>
                          </div>
                        ))}
                      </div>

                      <div className="hotel-price">
                        ₹{room.pricePerNight} / Night
                      </div>
                    </div>

                    <Button
                      variant="contained"
                      onClick={() => navigate(`/room-detail/${room.id}`)}>
                      Book Now
                    </Button>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>

          {!isMobile && (
            <div className="rightPart">
              <FiltersUI />
            </div>
          )}
        </div>
      </div>

      <Drawer
        anchor="right"
        open={toggleFilter}
        onClose={() => setToggleFilter(false)}>
        <div
          style={{
            position: "sticky",
            marginTop: 30,
            top: 0,
            zIndex: 10,
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            borderBottom: "1px solid #ddd",
          }}>
          <IconButton
            onClick={() => setToggleFilter(false)}
            style={{ float: "right" }}></IconButton>
          <FiltersUI />
        </div>
      </Drawer>

      <Footer />
    </div>
  );
}

export default AllRooms;
