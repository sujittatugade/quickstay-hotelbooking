import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./ContactUs.css";
import { Email, Phone } from "@mui/icons-material";
import api from "../../config/api.js";
import { toast } from "react-toastify";
import Footer from "../Footer/Footer";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await api.post(
        "/enquiry/add-enquiry",
        {
          fullName: name,
          email: email,
          message: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setName("");
      setEmail("");
      setMessage("");
      toast.success("Enquiry Submitted");
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-us">
      <Navbar />

      <section className="contact-section">
        <div className="green-glow"></div>

        <div className="contact-content">
          <h1 className="contact-title">
            Ready to Transform Your Digital Experience?
          </h1>

          <p className="contact-subtitle">
            Let our design team craft a website that elevates your brand. Book a
            free session today.
          </p>
          <div className="contact-details">
            <div className="email">
              <Email />
              <span>tatugadesujit7@gmail.com</span>
            </div>
            <div className="phone">
              <Phone />
              <span>7028177100</span>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <form className="contact-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Eden Johnson"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Eden@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                value={message}
                placeholder="Write your message here..."
                required></textarea>
            </div>

            <div className="form-footer">
              <p>
                By submitting, you agree to our <span>Terms</span> and{" "}
                <span>Privacy Policy</span>.
              </p>
              <button type="submit" onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ContactUs;
