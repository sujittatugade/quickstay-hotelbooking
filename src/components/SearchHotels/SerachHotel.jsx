import { Button, TextField } from "@mui/material";
import "./SearchHotel.css";
import { AccountCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CalendarIcon } from "@mui/x-date-pickers";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function SearchHotel({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  guests,
  setGuests,
  onCheck,
  onBook,
  isAvailable,
  isBooking,
}) {
  const [showDates, setShowDates] = useState(false);
  const [showPeople, setShowPeople] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [roomCount, setRoomCount] = useState(1);

  useEffect(() => {
    setGuests(adultCount + childrenCount);
  }, [adultCount, childrenCount, setGuests]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".fromtodates") &&
        !e.target.closest(".calenderContainer")
      ) {
        setShowDates(false);
      }

      if (
        !e.target.closest(".noofpeoples") &&
        !e.target.closest(".noOfPeople-container")
      ) {
        setShowPeople(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="HotelSearchContainer">
      <div className="searchsubcontainer">
        <div className="checkdate-peoples">
          <div className="fromtodates">
            <div className="calender" onClick={() => setShowDates(true)}>
              <CalendarIcon />
              <span>
                {startDate && endDate
                  ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                  : "Check-IN Date - Check-Out Date"}
              </span>

              {startDate && endDate && (
                <CloseIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    setStartDate(null);
                    setEndDate(null);
                  }}
                />
              )}
            </div>

            {showDates && (
              <div className="calenderContainer">
                <DatePicker
                  selected={startDate}
                  onChange={([start, end]) => {
                    setStartDate(start);
                    setEndDate(end);
                    if (start && end) setShowDates(false);
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  minDate={new Date()}
                />
              </div>
            )}
          </div>

          <div className="noofpeoples" onClick={() => setShowPeople(true)}>
            <AccountCircle />
            <span>
              {adultCount} adults · {childrenCount} children · {roomCount} room
            </span>

            {showPeople && (
              <div
                className="noOfPeople-container"
                onClick={(e) => e.stopPropagation()}>
                <TextField
                  label="Adults"
                  type="number"
                  inputProps={{ min: 1 }}
                  value={adultCount}
                  onChange={(e) => setAdultCount(+e.target.value)}
                />

                <TextField
                  sx={{ marginTop: 2 }}
                  label="Children"
                  type="number"
                  inputProps={{ min: 0 }}
                  value={childrenCount}
                  onChange={(e) => setChildrenCount(+e.target.value)}
                />

                <TextField
                  label="Rooms"
                  type="number"
                  inputProps={{ min: 1 }}
                  value={roomCount}
                  onChange={(e) => setRoomCount(+e.target.value)}
                  sx={{ marginTop: 2 }}
                />
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Button
            onClick={onCheck}
            sx={{
              bgcolor: "blue",
              color: "white",
              width: 150,
              "&:hover": { bgcolor: "black" },
            }}>
            Check Availability
          </Button>

          {isAvailable && (
            <Button
              onClick={onBook}
              disabled={isBooking}
              sx={{
                bgcolor: isBooking ? "gray" : "green",
                color: "white",
                width: 150,
                "&:hover": { bgcolor: "darkgreen" },
              }}>
              {isBooking ? "Booking..." : "Book Now"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchHotel;
