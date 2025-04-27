import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useContext } from "react";
import { CartContext } from "../components/data/CartContext.js";
import { ProductsContext } from "../components/contexts/ProductsContext.js";
import "../styles/Bucket.css";
import { Link } from "react-router-dom";

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
            {favoriteItems.map((product) => (
              <div className="bucket-card" key={product.id}>
                <div className="bucket-card-des">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.img || "/placeholder-product.jpg"}
                      className="card-img"
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = "/placeholder-product.jpg";
                      }}
                    />
                  </Link>
                  <div className="bucket-card-info">
                    <p className="bucket-card-name">{product.name}</p>
                    <p className="bucket-card-price">{product.price}₽</p>
                    <p className="bucket-card-discount">
                      Скидка:{" "}
                      {product.old_price
                        ? product.old_price - product.price
                        : 0}{" "}
                      ₽
                    </p>
                    <div className="bucket-clicker">
                      <button
                        className="bucket-remove-btn"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
