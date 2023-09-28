import { useContext, useState } from 'react';
import './comment.scss';
import { AuthContext } from '../../context/authContext';
import { authReq } from '../../requestMethods';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import moment from 'moment';


const Comments = ({ postId }) => {

    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["comments"], () =>
      authReq.get("/comments?postId=" + postId).then((res) => {
        return res.data;
      })
    );

    const [desc, setDesc] = useState("");      

    const queryClient = useQueryClient();

    const mutation = useMutation((newComment) => {
        return authReq.post("/comments", newComment);
    },
    {
        onSuccess: () => {
            queryClient.invalidateQueries(["comments"]);
        }
    }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ desc, postId });
        setDesc("");
    };

    console.log(data);

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input value={desc} onChange={(e) => setDesc(e.target.value)} type="text" placeholder="Write a comment" />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
        ? "loading..."
        : data?.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
}

export default Comments
