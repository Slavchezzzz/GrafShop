import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import AccsesCard from "../components/AccsesCard.jsx";
import "../styles/testPage.css";

export default function AccesPage() {
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
        <AccsesCard />
      </div>
      <Footer />
    </div>
  );
}
