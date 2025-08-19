import { Link } from "react-router-dom";
import BurgerMenu from "./burgerMenu";

function NavBar() {
  return (
    <nav className="flex items-center justify-between border-b-2 border-yellow-300/20">
      <Link to="/">
        <img className="w-44 " src="/logo-wb.png" alt="Pokemon Logo" />
      </Link>
      <BurgerMenu />
    </nav>
  );
}

export default NavBar;
