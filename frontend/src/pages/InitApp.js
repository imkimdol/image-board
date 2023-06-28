import { useState } from "react";

function InitApp() {
  const [serverLoc, setServerLoc] = useState("");

  const handleSubmit = () => {
    localStorage.setItem("serverLoc", serverLoc);
    window.location.reload();
  }

  return(
    <div>
      <div>
        <form onSubmit={handleSubmit}> 
          <h3>Init</h3>
          <label>Server Location</label>
          <input 
            type="text" 
            onChange={(e) => setServerLoc(e.target.value)} 
            value={serverLoc}
            required
            autoFocus
          />
          
          <button>Go</button>
        </form>
      </div>
    </div>
  )
}

export default InitApp;