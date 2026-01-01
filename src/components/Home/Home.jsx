import Navbar from "../Navbar/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import OurLocation from "../OurLocation/OurLocation";
import OurSuiteSpot from "../OurSuiteSpot/OurSuiteSpot";
import GridImages from "../GridImages/GridImages";
import Footer from "../Footer/Footer.jsx";

function Home() {
  return (
    <div>
      <div className="hotel_banner">
        <Navbar />

        <div className="middle-container">
          <div className="welcome_block">Welcome Home</div>
          <div className="middle-container-paragraph">
            Experience luxury and comfort with us. A boutique hotel experience
            at our Cape Town hotel and Johannesburg hotel, where hearty home
            comforts meet world-class luxury hospitality.
          </div>
        </div>
      </div>
      <OurLocation />
      <OurSuiteSpot />
      <GridImages />
      <div className="facility-container">
        <div className="facility">
          <div className="service">
            <h1>Service</h1>
            <p>
              Get that hearty, homey feeling with dedicated customer care
              throughout your booking process and stay.
            </p>
          </div>
          <div className="service">
            <h1>Personalisation</h1>
            <p>
              Customise your hotel experience with our add-ons like furbaby
              extras, sleep menu & kiddies cots.
            </p>
          </div>
          <div className="service">
            <h1>Convenience</h1>
            <p>
              Our locations, amenities and customer service ensures total
              convenience and comfort.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
