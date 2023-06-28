import { createHashRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";

import InitApp from "./pages/InitApp";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Add from "./pages/Add";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import PostDetailed from "./pages/PostDetailed";

function App() {
  axios.defaults.withCredentials = true;

  const username = localStorage.getItem("username");
  const serverLoc = localStorage.getItem("serverLoc");

  const router = createHashRouter([
    {path: "/", element: <Home />, children: [
      {path: "/users", element: <Users />},
      {path: "add", element: <Add />},
      {path: "account", element: <Account />},
      {path: "settings", element: <Settings />},
      {path: "posts/:id", element: <PostDetailed />}
    ]},
  ]);

  if (!serverLoc) { 
    return <InitApp />
  }
  
  return (
    <div className="App">
      <Navbar username={username}/>
      <div className="Container">
        <div className="Content">
          <RouterProvider router={router} />
        </div>
      </div>
    </div>
  );
}

export default App;