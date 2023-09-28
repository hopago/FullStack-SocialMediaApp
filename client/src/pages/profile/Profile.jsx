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
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { authReq } from "../../requestMethods";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation } from "react-router-dom";
import Update from "../../components/update/Update";


const Profile = () => {

  const { currentUser } = useContext(AuthContext);

  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["user"], () => 
    authReq.get("/users/find/" + userId).then((res) => {
      return res.data[0];
    })
  );

  const { isLoading: relationShipIsLoading, data: relationshipData } = useQuery(["relationships"], () =>
    authReq.get("/relationships?followedUserId=" + userId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (followed) => {
      if (followed) return authReq.delete("/relationships?userId=" + userId);
      return authReq.post('/relationships', { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationships"]);
      }
    }
  );

  const handleFollow = async () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={"/upload/" + data.coverPic} alt="" className="cover" />
            <img src={"/upload/" + data.profilePic} alt="" className="profilePic" />
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
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <Place />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <Language />
                    <span>{data.website}</span>
                  </div>
                </div>
                {relationShipIsLoading ? (
                  "loading..."
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdateForm(true)}>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Unfollow"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlined />
                <MoreVert />
              </div>
            </div>
            <Post userId={userId} />
          </div>
        </>
      )}
      {openUpdateForm && <Update setOpenUpdateForm={setOpenUpdateForm} user={data} />}
    </div>
  );
};

export default Profile;
