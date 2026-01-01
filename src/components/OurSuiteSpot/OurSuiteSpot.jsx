import { MeetingRoom, LocationCity } from "@mui/icons-material";
import wifi from "../../assets/wifi.png";
import generator from "../../assets/generator.png";
import tv from "../../assets/tv.png";
import bed from "../../assets/bed.png";
import hotspot from "../../assets/hotspot.png";
import security from "../../assets/cyber-security.png";
import check_in from "../../assets/check-in.png";
import parking from "../../assets/parking.png";
import cafe from "../../assets/coffee-shop.png";
import "./OurSuiteSpot.css";
function OurSuiteSpot() {
  return (
    <div>
      <div className="our-suits-spot-container">
        <div className="our-suits-spot">
          <div className="left-part-suits-spot">
            <h1>Our Suite Spots</h1>
            <p>
              There are so many reasons why our guests love our hotels and
              suites
            </p>
          </div>
          <div className="right-part-suits-spot">
            <div className="item1">
              <img src={wifi} alt="" />
              <span>FIBRED UP</span>
            </div>
            <div className="item2">
              <img src={generator} alt="" />
              <span>Fully Generated</span>
            </div>
            <div className="item3">
              <img src={tv} alt="" />
              <span>SMART TV & STREAMING</span>
            </div>
            <div className="item4">
              <img src={bed} alt="" />
              <span>HYPNOS MATTRESS</span>
            </div>
            <div className="item5">
              <img src={security} alt="" />
              <span>24 HR SECURITY</span>
            </div>
            <div className="item6">
              <img src={check_in} alt="" />
              <span>CHECK-IN</span>
            </div>
            <div className="item7">
              {" "}
              <img src={parking} alt="" />
              <span>FREE PARKING</span>
            </div>
            <div className="item8">
              <img src={cafe} alt="" />
              <span>CAFE</span>
            </div>
            <div className="item9">
              <LocationCity sx={{ color: "#494949", height: 30, width: 30 }} />
              <span> PERFECTLY LOCATED</span>
            </div>
            <div className="item10">
              <MeetingRoom sx={{ color: "#494949", height: 30, width: 30 }} />
              <span> MEETING ROOMS</span>
            </div>
            <div className="item11">
              <img src={hotspot} alt="" /> <span>LOCAL HOTSPOTS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurSuiteSpot;
