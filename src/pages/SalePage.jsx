import Footer from "../components/Footer";
import Header from "../components/Header";
import Sale from "../components/Sale";

export default function SalePage() {
  return (
    <div>
      <Header />
      <div className="path-cont">
        <a href="/" className="path-des">
          GraffsShop
        </a>
        <a>Скидки</a>
      </div>
      <div>
        <Sale />
      </div>
      <Footer />
    </div>
  );
}
