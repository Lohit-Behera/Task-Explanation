import { ModeToggle } from "./mode-toggle";
import Logo from "../assets/Logo.svg";
import { Home, SquarePlus } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

function Header() {
  return (
    <header className="z-20 w-full sticky top-0 p-2 backdrop-blur bg-background/30">
      <nav className="hidden md:flex justify-between space-x-2">
        <img src={Logo} alt="Logo" className="w-10 h-10" />
        <div className="flex space-x-2 items-center">
          <NavLink to="/">
            {({ isActive }) => (
              <Button variant={isActive ? "default" : "ghost"} size="sm">
                <Home className="mr-0.5 h-4 w-4" />
                Home
              </Button>
            )}
          </NavLink>
          <NavLink to="/create">
            {({ isActive }) => (
              <Button variant={isActive ? "default" : "ghost"} size="sm">
                <SquarePlus className="mr-0.5 h-4 w-4" /> Create
              </Button>
            )}
          </NavLink>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Header;
