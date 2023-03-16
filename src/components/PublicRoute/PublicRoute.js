import { Navigate, Route, Routes } from "react-router-dom";
import { BlogPage } from "../../containers/BlogPage/BlogPage";
import { LoginPage } from "../../containers/LoginPage/LoginPage";

export const PublicRoute = ({
  isLoggedIn,
  path,
  setIsLoggedIn,
  setUserName,
  children
}) => {
    return children

};
