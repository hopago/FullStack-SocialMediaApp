import { authReq } from '../../requestMethods';
import SinglePost from '../singlePost/SinglePost';
import './post.scss';
import { useQuery } from '@tanstack/react-query';


const Post = ({ userId }) => {

  const { isLoading, error, data } = useQuery(["posts"], () =>
    authReq.get("/posts?userId="+userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
      {error
        ? "Fetching Posts Error..."
        : isLoading
        ? "loading..."
        : data.map((post) => <SinglePost key={post.id} post={post} />)}
    </div>
  );
}

export default Post
