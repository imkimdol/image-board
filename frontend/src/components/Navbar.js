import { useState, useEffect } from "react";

const Navbar = ({username}) => {
  const [ admin, setAdmin ] = useState(false);

  useEffect(() => {
    if (username) {
      setAdmin(username === "admin");
    }
  }, []);

  return (
    <div className="Navbar">
      <nav>
        <a className="website-name" href="//">Image Board</a>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/search">Search</a></li>
          <li><a href="/add">Add</a></li>
          <li><a href="/account">Account</a></li>
          {admin && <li><a href="/admin">Admin</a></li>}
          <li><a href="/settings">Settings</a></li>
        </ul>
      </nav>
    </div>
  )
};

export default Navbar;