import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MarkersCard from "../components/MarkersCard.jsx";
import "../styles/testPage.css";

export default function MarkerPage() {
  return (
    <div className="layout">
      <Header></Header>
      <div className="path-cont">
        <a href="/" className="path-des">
          GraffsShop
        </a>
        <a>Каталог</a>
      </div>
      <div className="Page-marker">
        <MarkersCard />
      </div>
      <Footer />
    </div>
  );
}
