import { useState, useEffect } from "react";
import axios from "axios";

import {getServerLoc} from "../helpers/miscHelpers";
import Post from "./Post";

const PostsColumn = ({query}) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const getPosts = async () => {  
    try {
      console.log(getServerLoc()+"/posts");
      const res = await axios.get(getServerLoc()+"/posts",
        {
          params: query
        }
      );
      setPosts(res.data);
    } catch (e) {
      setError("Error: " + e.message);
      console.error(e);
    }
  };

  useEffect(() => {
    if (query) {
      getPosts();
    }
  }, [query]);

  return (
    <div className="PostsColumn">
      <ul>
        {posts.map((post) => <li key={post._id}><Post data={post} detailed={false}/></li>)}
      </ul>
      <p className="error">{error}</p>
    </div>
  );
};

export default PostsColumn;