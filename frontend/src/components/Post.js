import axios from "axios";
import { useState, useEffect } from "react";

import { getServerLoc, removeByValue } from "../helpers/miscHelpers";

const Post = ({data, detailed}) => {
  const username = localStorage.getItem("username");

  const [ deleting, setDeleting ] = useState(false);
  const [ isAuthor, setIsAuthor ] = useState(false);
  const [ likes, setLikes ] = useState(data.likes);
  const [ liked, setLiked ] = useState(false);
  
  useEffect(() => {
    
    if (username === data.author || username === "admin") {
      setIsAuthor(true);
    }
    setLiked(data.likes.includes(username));
  }, []);
  
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(getServerLoc()+"/posts/" + data._id);
      window.location.replace(document.referrer);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLike = async () => {
    await axios.post(getServerLoc()+"/posts/" + data._id + "/likes", {username});
    setLikes([...likes, username])
    setLiked(true);
  }

  const handleUnlike = async () => {
    await axios.delete(getServerLoc()+"/posts/" + data._id + "/likes/" + username);
    setLikes(removeByValue([...likes], username));
    setLiked(false);
  }


  const image = <img src={getServerLoc()+'/images/' + data._id} alt=""/>;
  const likeButton = <button onClick={handleLike}>Like</button>;
  const unlikeButton = <button onClick={handleUnlike}>Unlike</button>;

  if (!deleting) {
    return (
      <div className="Post">
        {detailed && <p>ID: {data._id}</p>}
        <p>Posted by: {data.author}</p>
        {detailed ? image : <a href={`/posts/${data._id}`}>{image}</a>}
        <p>Description: {data.description}</p>
        {detailed && <p>Tags: {data.tags}</p>}
        {detailed ? <p>Likes: {likes}</p> : <p>Likes: {likes.length}</p>}
        {detailed && isAuthor && <button onClick={handleDelete}>Delete</button>}
        {username && (liked ? unlikeButton : likeButton)}
      </div>
    )
  } else {
    return (
      <div>Deleting......</div>
    )
  }
  
};

export default Post;