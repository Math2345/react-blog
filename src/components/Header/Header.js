import { NavLink } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <header>
      <nav>
        <NavLink   to="/">
          Home
        </NavLink>
        <NavLink   to="/login">
          Логин
        </NavLink>
      </nav>
    </header>
  );
};
