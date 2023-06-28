import axios from "axios";
import { useState, useEffect } from "react";

import {getServerLoc} from "../helpers/miscHelpers";

const Post = ({data, detailed}) => {
  const [ deleting, setDeleting ] = useState(false);
  const [ isAuthor, setIsAuthor ] = useState(false);

  const image = <img src={getServerLoc()+'/images/' + data._id} alt=""/>

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username === data.author || username === "admin") {
      setIsAuthor(true);
    }
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

  if (!deleting) {
    return (
      <div className="Post">
        {detailed && <p>ID: {data._id}</p>}
        <p>Posted by: {data.author}</p>
        {!detailed && <a href={`/posts/${data._id}`}>{image}</a>}
        {detailed && image}
        <p>Description: {data.description}</p>
        {/* <p>Tags: {data.tags}</p>
        <p>Likes: {data.likes}</p> */}
        {detailed && isAuthor && <button onClick={handleDelete}>Delete</button>}
      </div>
    )
  } else {
    return (
      <div>Deleting......</div>
    )
  }
  
};

export default Post;