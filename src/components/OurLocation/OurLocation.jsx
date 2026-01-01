import left_arrow from "../../assets/left-arrow.png";
import right_arrow from "../../assets/right-arrow.png";
import sliderData from "../Data/Data";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "./OurLocation.css";
import { useNavigate } from "react-router-dom";
function OurLocation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < sliderData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <div className="our-locations">
        <div className="location-heading">
          <h1>Our Locations</h1>
        </div>
        <div className="location-paragraph">
          With prime locations in Mumbai and New Delhi, Home Suite Hotels India
          is your premier Mumbai hotel and New Delhi hotel—perfect for both
          business and leisure. Immerse yourself in a vibrant, modern ambiance
          with thoughtfully designed spaces, world-class amenities, and
          personalized service tailored for today’s savvy traveler. Savor
          authentic Indian flavors, indulge in premium comforts, and experience
          hospitality that feels like a true home-away-from-home in both cities.
        </div>
      </div>
      <div className="Slider">
        <div
          className={`left-part ${currentIndex === 0 ? "disable-image" : ""}`}>
          <img src={left_arrow} onClick={handlePrev} alt="Prev" />
        </div>
        <div className="middle-part">
          <div className="middle-left-part">
            <span>{sliderData[currentIndex].title}</span>
            <h1>{sliderData[currentIndex].heading}</h1>
            <p>{sliderData[currentIndex].description}</p>
            <Button onClick={() => navigate("/rooms")}>
              EXPLORE THIS HOTEL
            </Button>
          </div>
          <div className="middle-right-part">
            <img src={sliderData[currentIndex].image} alt="" />
          </div>
        </div>
        <div
          className={`right-part ${
            currentIndex === sliderData.length - 1 ? "disable-image" : ""
          }`}>
          <img src={right_arrow} onClick={handleNext} alt="Next" />
        </div>
      </div>
    </div>
  );
}

export default OurLocation;
