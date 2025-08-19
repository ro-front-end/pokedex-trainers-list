import { useEffect, useRef, useState } from "react";
import { FaHome, FaBook, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const links = [
  { id: 1, name: "Home", href: "/", icon: <FaHome /> },
  { id: 2, name: "About", href: "/about", icon: <FaBook /> },
  { id: 3, name: "Contact", href: "/contact", icon: <FaEnvelope /> },
];

function BurgerMenu() {
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef();

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handlecloseMenuOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  const handlecloseMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    window.addEventListener("mousedown", handlecloseMenuOutside);

    return () =>
      window.removeEventListener("mousedown", handlecloseMenuOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={handleShowMenu} className="flex flex-col">
        <span
          className={` w-6 h-[.3rem] mb-1 transition duration-300 ease-in-out ${
            showMenu ? "translate-y-2 rotate-45 bg-orange-800" : "bg-yellow-300"
          }`}
        ></span>
        <span
          className={`bg-yellow-300 w-6 h-[.3rem] mb-1 transition duration-300 ease-in-out ${
            showMenu ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={` w-6 h-[.3rem] transition duration-300 ease-in-out ${
            showMenu
              ? "-translate-y-[.6rem] -rotate-45 bg-orange-800"
              : "bg-yellow-300"
          }`}
        ></span>
      </button>
      {showMenu ? (
        <ul className="absolute flex flex-col justify-between right-0 top-[3.8rem] p-8 gap-4 bg-blue-500 z-30">
          {links.map((link) => (
            <li
              onClick={handlecloseMenu}
              className="flex w-full gap-6 justify-between items-center hover:text-yellow-300 border-b-[.1rem] pb-2"
              key={link.id}
            >
              <Link to={link.href}>{link.name}</Link>
              <span>{link.icon} </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default BurgerMenu;
