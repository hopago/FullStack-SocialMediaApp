import { useContext } from 'react';
import './comment.scss';
import { AuthContext } from '../../context/authContext';


const Comments = () => {

    const { currentUser } = useContext(AuthContext);

    const comments = [
        {
            id: 1,
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, iusto ipsa nobis nam quos accusantium quia iste animi minus placeat exercitationem quibusdam dolorem dolorum vel, perspiciatis soluta numquam possimus beatae.",
            name: "eGirl",
            userId: 1,
            profilePic: "https://w0.peakpx.com/wallpaper/45/408/HD-wallpaper-tita-bruh-titasama-egirl-thumbnail.jpg"
        },
        {
            id: 2,
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, iusto ipsa nobis nam quos accusantium quia iste animi minus placeat exercitationem quibusdam dolorem dolorum vel, perspiciatis soluta numquam possimus beatae.",
            name: "aGirl",
            userId: 2,
            profilePic: "https://images.pexels.com/photos/1381558/pexels-photo-1381558.jpeg?auto=compress&cs=tinysrgb&w=1600"
        },
        {
            id: 3,
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, iusto ipsa nobis nam quos accusantium quia iste animi minus placeat exercitationem quibusdam dolorem dolorum vel, perspiciatis soluta numquam possimus beatae.",
            name: "eGirl",
            userId: 3,
            profilePic: "https://egirl-reviews.com/wp-content/uploads/2020/07/65960016_405688500155014_172154366671716352_n-e1593796283331-768x662.jpg?ezimgfmt=ng:webp/ngcb1"
        },
    ];

  return (
    <div className="comments">
        <div className="write">
            <img src={currentUser.profilePic} alt="" />
            <input type="text" placeholder='Write a comment' />
            <button>Send</button>
        </div>
        {comments.map(comment => (
            <div className="comment" key={comment.id}>
                <img src={comment.profilePic} alt="" />
                <div className="info">
                    <span>{comment.name}</span>
                    <p>
                        {comment.desc}
                    </p>
                </div>
                <span className='date'>1 min ago</span>
            </div>
        ))}
    </div>
  )
}

export default Comments
