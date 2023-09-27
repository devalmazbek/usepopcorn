import Logo from "./logo/Logo";
import Search from "./search/Search";

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      {children}
    </nav>
  );
}

export default Navbar;
