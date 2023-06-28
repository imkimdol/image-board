import axios from "axios";

import {getServerLoc} from "../helpers/miscHelpers";

const LoggedIn = ({username}) => {
  const handleLogout = async () => {
    try {
      await axios.post(getServerLoc()+"/auth/logout");

      localStorage.removeItem("username");
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  if (username) {
    return (
      <div className="logged-in">
          <p>{`Logged in as ${username}`}</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
    )
  }
};

export default LoggedIn;