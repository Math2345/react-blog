import "./App.css";
import { BlogPage } from "./components/BlogPage/BlogPage";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

export function App() {
  return (
    <>
      <Header />
      <BlogPage />
      <Footer year={new Date().getFullYear()}/>
    </>
  );
}
