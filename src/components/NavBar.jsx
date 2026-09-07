import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header className="navbar">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/admin">Admin Portal</NavLink>
      </nav>
    </header>
  );
}
 
export default NavBar;