import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {getServerLoc} from "../helpers/miscHelpers";
import Post from "../components/Post";

const PostDetailed = () => {
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const postId = useParams().id;

    const getPost = async () => {
        const link = getServerLoc() + "/posts/" + postId;
    
        try {
            const res = await axios.get(link);
            setPost(res.data);
        } catch (e) {
            setError(e);
            console.error(e);
        }
    }

    useEffect(() => {
        getPost();
    }, [])
    

    return (
        <div>
            {post && <Post key={post._id} data={post} detailed={true} />}
            <p>{error}</p>
        </div>
    )
};

export default PostDetailed;