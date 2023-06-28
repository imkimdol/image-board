import { useState } from "react";
import axios from "axios";

import {getServerLoc} from "../helpers/miscHelpers";

const AddAccount = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        if (username === "") {
            return;
        }

        e.preventDefault();
        try {
            const res = await axios.post(getServerLoc()+"/auth/login", {username, password});

            if (res.status === 200) {
                setSuccess("Logged in!!");
                setError(null);
                localStorage.setItem("username", username);
                
                window.location.reload();
            }
        } catch (e) {
            setSuccess(null);
            setError(e.message);
            console.error(e);
        }   
    };

    return (
        <div>
            <form className="add" onSubmit={handleSubmit}> 
                <h3>Log In</h3>

                <label>Username</label>
                <input 
                    type="text" 
                    onChange={(e) => setUsername(e.target.value)} 
                    value={username}
                    autoComplete="username"
                    required
                    autoFocus
                />

                <label>Password</label>
                <input 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    autoComplete="current-password"
                    required
                />

                <button>Add</button>
            </form>
            <p>{success}</p>
            <p>{error}</p>
        </div>
    )
};

export default AddAccount;