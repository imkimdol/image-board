import { useState } from "react";
import axios from "axios";

import {getServerLoc} from "../helpers/miscHelpers";

const CreatePost = () => {
    const [imageURL, setImageURL] = useState("");
    const [description, setDescription] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const info = {imageURL, description};

        try {
            await axios.post(getServerLoc()+"/posts", info);
            setSuccess("Added Post!!");
            setError(null);
        } catch (e) {
            setSuccess(null);
            setError(e.message);
            console.error(e);
        }

        setImageURL("");
        setDescription("");
    };

    return (
        <div>
            <form className="add" onSubmit={handleSubmit}> 
                <h3>Add a New Post</h3>
            
                <label>ImageURL:</label>
                <input 
                    type="url" 
                    onChange={(e) => setImageURL(e.target.value)} 
                    value={imageURL}
                    required
                />
            
                <label>Description</label>
                <input 
                    type="text" 
                    onChange={(e) => setDescription(e.target.value)} 
                    value={description}
                />
            
                <button>Add</button>
            </form>
            <p>{success}</p>
            <p>{error}</p>
        </div>
        
      )    
};

export default CreatePost;