import axios from "axios";
import { useState } from "react";

import LogIn from "../components/LogIn";
import CreateAccount from "../components/CreateAccount";
import LoggedIn from "../components/LoggedIn";

import {getServerLoc} from "../helpers/miscHelpers";

const Account = () => {
    const username = localStorage.getItem("username");

    const [ deleting, setDeleting ] = useState(false);

    const handleDelete = async () => {
        try {
          setDeleting(true);
          await axios.delete(getServerLoc()+"/accounts/" + username);
          
          localStorage.removeItem("username");
          window.location.reload();
        } catch (e) {
          console.error(e);
        }
    };

    const loggedIn = (username && (
        <div>
            <h2>Account</h2>
            <LoggedIn username={username}/>
            <button onClick={handleDelete}>Delete Account</button>
        </div>
    ));

    const loggedOut = (!username && (
        <div>
            <LogIn />
            <CreateAccount />
        </div>
    ));

    return (
        <div>
            {loggedIn}
            {loggedOut}
            {deleting && <div>Deleting......</div>}
        </div>
    );
};

export default Account;