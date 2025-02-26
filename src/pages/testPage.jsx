import { Link } from "react-router-dom";
import "../styles/testPage.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MainCard from "../components/MainCard.jsx";

// import Slider from "../components/Slider.jsx";
export default function TestPage() {
  return (
    <div className="layout">
      <Header />
      <div className="path-cont">
        <a href="/" className="path-des">
          GraffsShop
        </a>
        <a>Каталог</a>
      </div>
      <div className="Page">
        <MainCard />
      </div>
      <Footer />
    </div>
  );
}
