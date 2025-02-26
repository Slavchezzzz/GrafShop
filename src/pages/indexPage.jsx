import Header from "../components/Header.jsx";
import "../styles/indexPage.css";
import Footer from "../components/Footer.jsx";
import CardMin from "../components/Card.jsx";
import Infinity from "../components/InfinitySlider.jsx";
import CardPopular from "../components/CardPopular.jsx";
import HeaderPhoto from "../components/HeaderPhoto.jsx";
import News from "../components/News.jsx";
import ControlledCarousel from "../components/SliderBoot.jsx";

export default function IndexPage() {
  return (
    <div className="layout">
      <Header></Header>
      <HeaderPhoto />
      <div className="Page">
        <div className="page-card">
          <div className="page-card-info-product">
            <h1>Новые поступления</h1>
          </div>
          <CardMin />
        </div>
        <div className="page-card">
          <Infinity />
        </div>
        <div className="page-card">
          <div className="page-card-info-product">
            <h1>Популярный товар</h1>
          </div>
          <CardPopular />
        </div>
        <div className="page-card">
          <News />
        </div>
      </div>
      <Footer />
    </div>
  );
}
