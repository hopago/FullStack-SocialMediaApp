import "./profile.scss";
import {
  EmailOutlined,
  FacebookTwoTone,
  GitHub,
  Instagram,
  Language,
  LinkedIn,
  MoreVert,
  Place,
  Twitter,
} from "@mui/icons-material";
import Post from '../../components/post/Post';


const Profile = () => {
  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/597909/pexels-photo-597909.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          className="cover"
        />
        <img
          src="https://images.pexels.com/photos/2272853/pexels-photo-2272853.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="">
              <FacebookTwoTone fontSize="large" />
            </a>
            <a href="">
              <Instagram fontSize="large" />
            </a>
            <a href="">
              <Twitter fontSize="large" />
            </a>
            <a href="">
              <LinkedIn fontSize="large" />
            </a>
            <a href="">
              <GitHub fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>Hopago</span>
            <div className="info">
              <div className="item">
                <Place />
                <span>Seoul</span>
              </div>
              <div className="item">
                <Language />
                <span>Korea</span>
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            <EmailOutlined />
            <MoreVert />
          </div>
        </div>
        <Post />
      </div>
    </div>
  );
};

export default Profile;
