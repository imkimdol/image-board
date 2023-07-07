import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AsyncSelect from 'react-select/async'

import { getServerLoc } from "../helpers/miscHelpers";

const EditPost = () => {
  const username = localStorage.getItem("username");
  const postId = useParams().id;
  const navigate = useNavigate();

  const [ post, setPost ] = useState(null);
  const [ description, setDescription ] = useState(null);
  const [ selectedTags, setSelectedTags ] = useState([]);

  const [ deleting, setDeleting ] = useState(false);
  const [ isAuthor, setIsAuthor ] = useState(false);
  const [ error, setError ] = useState(null);


  const mapToOptionsType = (elem) => {
    return {"value": elem, "label": elem}
  }


  const getPost = async () => {
    const link = getServerLoc() + "/posts/" + postId;
  
    try {
      const res = await axios.get(link);

      setPost(res.data);
      setDescription(res.data.description);
      if (username === res.data.author || username === "admin") {
        setIsAuthor(true);
      }
      console.log(res.data.tags);
      setSelectedTags(res.data.tags.map(t => mapToOptionsType(t)));
    } catch (e) {
      setError(e);
      console.error(e);
    }
  }
  
  const getAvailableTags = () => {
    return new Promise((resolve) => {
      const link = getServerLoc() + "/tags";

      axios.get(link).then((response) => {
        resolve(response.data.map(t => mapToOptionsType(t._id)));
      });
    })
  }

  useEffect(() => {
    getPost();
  }, []);


  const handleChange = (value) => {
    console.log(value)
    setSelectedTags(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const baseLink = getServerLoc() + "/posts/" + postId;

      await axios.put(baseLink+"/description/", {description});
      await axios.put(baseLink+"/tags/", {tags: selectedTags.map(e => e.value)});

      navigate("/posts/"+post._id);
    } catch (e) {
      setError(e);
      console.error(e);
    }
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
        <p>ID: {post._id}</p>
        <p>Posted by: {post.author}</p>

        <label>Description</label>
        <input 
          type="text" 
          onChange={(e) => setDescription(e.target.value)} 
          value={description}
        />

        <p>Tags: </p>
        <AsyncSelect 
          isMulti
          defaultOptions
          onChange={handleChange}
          defaultValue={selectedTags}
          loadOptions={getAvailableTags}
        />
        
        <p>Likes: {post.likes}</p>
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