import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";

import { BlogPage } from "./containers/BlogPage/BlogPage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { LoginPage } from "./containers/LoginPage/LoginPage";
import { useState } from "react";
import { NoMatch } from "./containers/NoMatch/NoMatch";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('userName') === "admin" || false);

  return (
    <Router>
      <div>
        <Header
          userName={userName}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />

        <Routes>
          <Route
            path="login"
            element={
              <PublicRoute path="/login">
                <LoginPage
                  setIsLoggedIn={setIsLoggedIn}
                  setUserName={setUserName}
                  setIsAdmin={setIsAdmin}
                />
              </PublicRoute>
            }
          />

          <Route
            exact
            path="/blog"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn} path="/blog">
                <BlogPage isAdmin={isAdmin} />
              </PrivateRoute>
            }
          />

          <Route path="/404" element={<NoMatch />} />
          <Route path="*" element={<Navigate to="404" />} />
        </Routes>
        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
