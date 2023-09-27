import "./navbar.scss";
import {
  DarkModeOutlined,
  HomeOutlined,
  GridViewOutlined,
  EmailOutlined,
  PersonOutlined,
  SearchOutlined,
  NotificationsOutlined,
  WbSunnyOutlined,
} from "@mui/icons-material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";


const Navbar = () => {
  
  const { toggle, darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" className="link">
          <span>Howitter</span>
        </Link>
        <HomeOutlined />
        {!darkMode ? (
          <DarkModeOutlined
            onClick={toggle}
            style={{ cursor: "pointer", color: "#F8DE22" }}
          />
        ) : (
          <WbSunnyOutlined
            onClick={toggle}
            style={{ cursor: "pointer", color: "#F8FF95" }}
          />
        )}
        <GridViewOutlined />
        <div className="search">
          <SearchOutlined />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="right">
        <PersonOutlined />
        <EmailOutlined />
        <NotificationsOutlined />
        <div className="user">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
