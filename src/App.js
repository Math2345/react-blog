import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import { BlogPage } from "./containers/BlogPage/BlogPage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { LoginPage } from "./containers/LoginPage/LoginPage";

export function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<BlogPage />} />
          <Route exact path="/login" element={<LoginPage />} />
        </Routes>
        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
