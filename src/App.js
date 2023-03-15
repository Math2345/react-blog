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

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

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
            exact
            path="/"
            render={() => {
              if (isLoggedIn) return <Navigate to="/blog" />;
              return <Navigate to="/login" />;
            }}
          />
          <Route
            exact
            path="/login"
            render={() => {
              if (!isLoggedIn)
                return (
                  <LoginPage
                    setIsLoggedIn={setIsLoggedIn}
                    setUserName={setUserName}
                  />
                );
              return <Navigate to="/blog" />;
            }}
          />

          <Route
            exact
            path="/blog"
            render={() => {
              if (isLoggedIn) return <BlogPage />;
              return <Navigate to="/login" />;
            }}
          />
        </Routes>
        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
