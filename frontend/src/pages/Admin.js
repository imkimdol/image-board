import { useState, useEffect } from "react";
import axios from "axios";

import { getServerLoc, removeByValue } from "../helpers/miscHelpers";

const Admin = () => {
    const username = localStorage.getItem("username");

    const [ admin, setAdmin ] = useState(false);
    const [ tags, setTags ] = useState([]);

    const getTags = async () => {
        try {
            const res = await axios.get(getServerLoc()+"/tags");
            setTags(res.data.map(d => d._id));
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (username) {
          setAdmin(username === "admin");
          getTags();
        }
    }, []);

    if (!admin) {
        return (<p>Unauthorized!</p>);
    }

    return (
        <div>
            <h3>Admin</h3>
            {tags.map(t => <TagElem key={t} name={t} tags={tags}/>)}
        </div>
    );
};

const TagElem = ({name}) => {
    const handleDelete = async () => {
        try {
            await axios.delete(getServerLoc()+"/tags/"+name);
            window.location.reload();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <p>{name}</p>
            <button onClick={handleDelete}>x</button>
        </div>
    )
}

export default Admin;