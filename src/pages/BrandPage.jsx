import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { BrandsData } from "../components/data/BrandsData.jsx";
import "../styles/BrandsPage.css";

export default function BrandPage() {
  return (
    <div className="main-brand">
      <Header></Header>
      <div className="path-cont">
        <a href="/" className="path-des">
          GraffsShop
        </a>
        <a>Бренды</a>
      </div>
      <div className="Brands-container">
        <div className="Brands-menu">
          {BrandsData.map((BrandsData, index) => {
            return (
              <div className="Brands-item" key={index}>
                <div className="Brand-image">
                  <img src={BrandsData.img} />
                </div>
                <div className="Brand-discription">
                  <h1>{BrandsData.name}</h1>
                  <span>{BrandsData.discription}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
