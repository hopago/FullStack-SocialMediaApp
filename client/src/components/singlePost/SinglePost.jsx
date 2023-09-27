import './singlepost.scss';
import { 
    FavoriteBorderOutlined, FavoriteOutlined, MoreHorizOutlined, ShareOutlined, TextsmsOutlined 
} from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';


const SinglePost = ({ post }) => {

    // Temporary
    const [liked, setLiked] = useState(false);
    const [commentOpen, setCommentOpen] = useState(false);

  return (
    <div className="single">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link to={`/profile/${post.userId}`} className="link">
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHorizOutlined />
        </div>
        <div className="content">
          <img src={post.img} alt="" />
          <p>{post.desc}</p>
        </div>
        <div className="info">
          <div className="item">
            {liked ? (
              <FavoriteOutlined
                onClick={() => setLiked(false)}
              />
            ) : (
              <FavoriteBorderOutlined
                onClick={() => setLiked(true)}
              />
            )}
            123 likes
          </div>
          <div className="item">
            <TextsmsOutlined
              onClick={() => setCommentOpen(!commentOpen)}
            />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlined />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default SinglePost
