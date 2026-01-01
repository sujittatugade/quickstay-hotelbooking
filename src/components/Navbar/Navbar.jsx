import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../config/api.js";
import { toast } from "react-toastify";

function Navbar() {
  const { openSignIn } = useClerk();
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [backendUserId, setBackendUserId] = useState(null);
  const hasSavedUser = useRef(false);

  const saveUser = async (name, email) => {
    try {
      const res = await api.post("/addUser", {
        fullName: name,
        email,
      });
      setBackendUserId(res.data.id);
      localStorage.setItem("userId", res.data.id);
    } catch {
      toast.error("User sync failed");
    }
  };

  useEffect(() => {
    if (!isSignedIn || !user || hasSavedUser.current) return;

    const name =
      user.fullName || `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
    const email = user.primaryEmailAddress?.emailAddress;

    if (name && email) {
      saveUser(name, email);
      hasSavedUser.current = true;
    }
  }, [isSignedIn, user]);

  const go = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => go("/")}>
        Quick<span>S</span>t<span>a</span>y
      </div>

      <ul className={`nav-links ${open ? "open" : ""}`}>
        <li onClick={() => go("/")}>Home</li>
        <li onClick={() => go("/rooms")}>Rooms</li>
        <li onClick={() => go("/contact-us")}>Contact</li>

        {isSignedIn ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<EventAvailableIcon sx={{ width: 16 }} />}
                onClick={() =>
                  backendUserId
                    ? navigate(`/my-bookings/${backendUserId}`)
                    : toast.error("User loading")
                }
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button className="login-btn" onClick={openSignIn}>
            Login
          </button>
        )}
      </ul>

      <div className="menu-toggle" onClick={() => setOpen(!open)}>
        {open ? <CloseIcon /> : <MenuIcon />}
      </div>
    </nav>
  );
}

export default Navbar;
