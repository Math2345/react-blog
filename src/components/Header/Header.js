import { NavLink } from "react-router-dom";
import "./Header.css";

export const Header = ({ isLoggedIn, setIsLoggedIn, userName }) => {
  const handleLogOut = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userName')

    setIsLoggedIn(false);
  };

  return (
    <header>
      {isLoggedIn ? (
        <nav>
          Добро пожаловать, {userName}
          <NavLink onClick={handleLogOut} to="/login">
            Выход
          </NavLink>
        </nav>
      ) : (
        "Добро пожаловать!"
      )}
    </header>
  );
};
