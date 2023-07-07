const Navbar = ({username}) => {
  return (
    <div className="Navbar">
      <nav>
        <a className="website-name" href="//">Image Board</a>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/search">Search</a></li>
          <li><a href="/add">Add</a></li>
          <li><a href="/account">Account</a></li>
          <li><a href="/settings">Settings</a></li>
        </ul>
      </nav>
    </div>
  )
};

export default Navbar;