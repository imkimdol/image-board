import { useState } from "react";
import axios from "axios";

import {getServerLoc} from "../helpers/miscHelpers";

const CreateAccount = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const info = {username, password};

        try {
            await axios.post(getServerLoc()+"/accounts", info);
            setSuccess("Added account!!");
            setError(null);
        } catch (e) {
            setSuccess(null);
            setError(e.message);
            console.error(e);
        }

        setUsername("");
    };

    return (
        <div>
            <form className="add" onSubmit={handleSubmit}> 
                <h3>Add a New Account</h3>
            
                <label>Username</label>
                <input 
                    type="text" 
                    onChange={(e) => setUsername(e.target.value)} 
                    value={username}
                    required
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

export default CreateAccount;