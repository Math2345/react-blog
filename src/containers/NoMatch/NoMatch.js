import React from "react";
import { useNavigate } from "react-router-dom";

export const NoMatch = () => {
  const navigate = useNavigate();

  const BackHome = () => {
    navigate("/login");
  };

  return (
    <div className="page404">
      <button onClick={BackHome}>Назад на главную</button>
      <h1>
        Запрашиваемая страница не найдена!
      </h1>
    </div>
  );
};
