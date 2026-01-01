import "./Footer.css";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

function Footer() {
  return (
    <>
      <footer className="footer">
        <span>Quick Stay</span>
        <p>Copyright © 2025 . All rights reservered.</p>
        <div className="icons">
          <Facebook
            sx={{
              fill: "none",
              stroke: "blue",
              strokeWidth: 0.7,
              fontSize: 30,
            }}
          />
          <Twitter
            sx={{
              fill: "blue",
              stroke: "none",
              strokeWidth: 0.7,
              fontSize: 30,
            }}
          />
          <Instagram
            sx={{
              fill: "none",
              stroke: "#aa2c71f1",
              strokeWidth: 0.7,
              fontSize: 30,
            }}
          />
          <LinkedIn
            sx={{
              fill: "blue",
              stroke: "blue",
              strokeWidth: 0.7,
              fontSize: 30,
            }}
          />
        </div>
      </footer>
    </>
  );
}

export default Footer;
