import Footer from "../components/Footer";
import Header from "../components/Header";
import NewProduct from "../components/NewProduct";

export default function NewProductPage() {
  return (
    <div className="layout">
      <Header />
      <div className="path-cont">
        <a href="/" className="path-des">
          GraffsShop
        </a>
        <a>Новинки</a>
      </div>
      <div className="Page-newproduct">
        <NewProduct />
      </div>
      <Footer />
    </div>
  );
}
