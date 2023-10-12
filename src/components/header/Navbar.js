import Logo from "./logo/Logo";
import Search from "./search/Search";

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />

      {children}
    </nav>
  );
}

export default Navbar;
