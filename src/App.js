import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
          <Route exact path="/" element={<BlogPage />} />
          <Route
            exact
            path="/login"
            element={
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                setUserName={setUserName}
              />
            }
          />
        </Routes>
        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
