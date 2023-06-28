import { useState } from "react";

import PostsColumn from "../components/PostsColumn";

const Users = () => {
    const [ username, setUsername ] = useState("");
    const [ query, setQuery ] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery({author: username});
    }

    return (
        <div>
            <form onSubmit={handleSubmit}> 
                <h3>Users</h3>

                <label>Search</label>
                <input 
                    type="text" 
                    onChange={(e) => setUsername(e.target.value)} 
                    value={username}
                    autoFocus
                    required
                />
                <button>Add</button>
            </form>
            <PostsColumn query={query}/>
        </div>
    );
};

export default Users;