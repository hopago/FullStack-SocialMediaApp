import './singlepost.scss';
import { 
    FavoriteBorderOutlined, FavoriteOutlined, MoreHorizOutlined, ShareOutlined, TextsmsOutlined 
} from '@mui/icons-material';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import moment from 'moment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authReq, baseReq } from '../../requestMethods';
import { AuthContext } from '../../context/authContext';


const SinglePost = ({ post }) => {

    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["likes", post.id], () =>
      baseReq.get("/likes?postId=" + post.id).then((res) => {
        return res.data;
      })
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(
      (liked) => {
        if (liked) return authReq.delete("/likes?postId=" + post.id);
        if (!liked) return authReq.post("/likes", { postId: post.id });
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["likes"]);
        },
      }
    );

    const deleteMutation = useMutation(
      (postId) => {
        return authReq.delete("/posts/" + postId);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["posts"]);
        },
      }
    );

    const handleLike = () => {
      mutation.mutate(data.includes(currentUser.id));
    };

    // 모든 moreHorizon 바가 열리는 현상 해결
    const handleDelete = () => {
      deleteMutation.mutate(post.id);
      setMenuOpen(false);
    };  

  return (
    <div className="single">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/" + post.profilePic} alt="" />
            <div className="details">
              <Link to={`/profile/${post.userId}`} className="link">
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizOutlined
            style={{ cursor: "pointer" }}
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && post.userId === currentUser.id && (
            <button style={{ cursor: "pointer" }} onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
        <div className="content">
          <img src={"/upload/" + post.img} alt="" />
          <p>{post.desc}</p>
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading..."
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlined style={{ color: "red" }} onClick={handleLike} />
            ) : (
              <FavoriteBorderOutlined onClick={handleLike} />
            )}
            {data?.length > 0 && data.length} likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlined />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlined />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default SinglePost
