import { authReq } from '../../requestMethods';
import SinglePost from '../singlePost/SinglePost';
import './post.scss';
import { useQuery } from '@tanstack/react-query';


const Post = () => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    authReq.get("/posts").then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
      {error
        ? "Fetch Post Error..."
        : isLoading
        ? "loading..."
        : data.map((post) => <SinglePost key={post.id} post={post} />)}
    </div>
  );
}

export default Post
