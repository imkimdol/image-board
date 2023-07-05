import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getServerLoc } from "../helpers/miscHelpers";

const EditPost = () => {
  const username = localStorage.getItem("username");
  const postId = useParams().id;

  const [ post, setPost ] = useState(null);
  const [ description, setDescription ] = useState(null);

  const [ deleting, setDeleting ] = useState(false);
  const [ isAuthor, setIsAuthor ] = useState(false);
  const [ error, setError ] = useState(null);


  

  const getPost = async () => {
    const link = getServerLoc() + "/posts/" + postId;
  
    try {
      const res = await axios.get(link);

      setPost(res.data);
      setDescription(res.data.description);
      if (username === res.data.author || username === "admin") {
        setIsAuthor(true);
      }
    } catch (e) {
      setError(e);
      console.error(e);
    }
  }
  
  useEffect(() => {
    getPost();
  }, []);




  const handleSubmit = async () => {

  };
  
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(getServerLoc()+"/posts/" + post._id);
      window.location.replace(document.referrer);
    } catch (e) {
      console.error(e);
    }
  };




  if (!isAuthor) {
    <p>Unauthorized!</p>
  }

  if (!deleting) {
    return (<div>{post &&<div>

      <form onSubmit={handleSubmit}>
        <label>ID: {post._id}</label>
        <label>Posted by: {post.author}</label>

        <label>Description</label>
        <input 
          type="text" 
          onChange={(e) => setDescription(e.target.value)} 
          value={description}
        />

        <label>Tags: {post.tags}</label>
        <label>Likes: {post.likes}</label>
        <button>Done</button>
      </form>
      
      {isAuthor && <button onClick={handleDelete}>Delete Post</button>}

    </div>}</div>)
  }

  return (
    <div>Deleting......</div>
  )
};

export default EditPost;