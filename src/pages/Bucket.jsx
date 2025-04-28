import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useContext } from "react";
import { CartContext } from "../components/data/CartContext.js";
import { ProductsContext } from "../components/contexts/ProductsContext.js";
import "../styles/Bucket.css";
import { Link } from "react-router-dom";
import MainCard from "../components/MainCard.jsx";

export default function Bucket({ product }) {
  const { favorites, toggleFavorite } = useContext(CartContext);
  const { products, isLoading, error } = useContext(ProductsContext);

  // Фильтруем все товары по избранным ID
  const favoriteItems = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <div className="bucket-page">
      <Header />
      <div className="bucket-path-cont">
        <Link to="/" className="bucket-path-des">
          GraffsShop
        </Link>
        <span className="bucket-path-sep">/</span>
        <Link to="/test" className="bucket-path-des">
          Каталог
        </Link>
        <span className="bucket-path-sep">/</span>
        <span className="bucket-path-current">Избранное</span>
      </div>
      <div className="bucket-main">
        <h1 className="bucket-title">Избранное</h1>
        {favoriteItems.length > 0 ? (
          <div className="bucket-list">
            <MainCard products={favoriteItems} />
          </div>
        ) : (
          <div className="bucket-empty">
            <p>У вас нет избранного!</p>
            <Link to="/test" className="bucket-empty-link">
              Перейти в каталог
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
