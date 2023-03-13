import { useNavigate } from "react-router-dom";

import "./LoginPage.css";

export const LoginPage = (props) => {
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    console.log('1')
    navigate("/");
  };

  return (
    <h1>
      <form className="loginForm" onSubmit={handleLogIn}>
        <h2>Авторизация</h2>
        <div>
          <input
            className="loginInput"
            type="text"
            placeholder="Логин:"
            required
          />
        </div>
        <div>
          <input
            className="loginInput"
            type="password"
            placeholder="Пароль:"
            required
          />
        </div>
        <div>
          <button className="blackBtn" type="submit">
            Войти
          </button>
        </div>
      </form>
    </h1>
  );
};
