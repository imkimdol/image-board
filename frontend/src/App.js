import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";

import InitApp from "./pages/InitApp";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Add from "./pages/Add";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import PostDetailed from "./pages/PostDetailed";
import EditPost from "./pages/EditPost";

function App() {
  axios.defaults.withCredentials = true;

  const username = localStorage.getItem("username");
  const serverLoc = localStorage.getItem("serverLoc");

  const router = createBrowserRouter([
    {path: "/", element: <Home />},
    {path: "search", element: <Search />},
    {path: "add", element: <Add />},
    {path: "account", element: <Account />},
    {path: "admin", element: <Admin />},
    {path: "settings", element: <Settings />},
    {path: "posts/:id", element: <PostDetailed />},
    {path: "posts/:id/edit", element: <EditPost />}
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