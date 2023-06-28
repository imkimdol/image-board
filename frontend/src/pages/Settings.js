import { useNavigate } from "react-router-dom";

const Settings = () => {
  const serverLoc = localStorage.getItem("serverLoc");
  const navigate = useNavigate();
  
  const resetFrontend = () => {
    navigate("/");
    localStorage.clear()
    window.location.reload();
  }

  return (
    <div>
      <h2>Settings</h2>
      <p>Server Location: {serverLoc}</p>
      <button onClick={resetFrontend}>Reset Frontend</button>
    </div>
  );
};

export default Settings;