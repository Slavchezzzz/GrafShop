import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useContext } from "react";
import { CartContext } from "../components/data/CartContext.js";
import { MainDataCard } from "../components/data/MainDataCard.jsx";
import "../styles/Bucket.css";
import { Link } from "react-router-dom";

export default function Bucket() {
  const { favorites, toggleFavorite } = useContext(CartContext);

  // Получаем товары, которые есть в избранном
  const favoriteProducts = MainDataCard.filter((item) =>
    favorites.includes(item.id)
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
        {favoriteProducts.length > 0 ? (
          <div className="bucket-list">
            {favoriteProducts.map((item) => (
              <div className="bucket-card" key={item.id}>
                <div className="bucket-card-des">
                  <img className="bucket-img" src={item.img} alt={item.name} />
                  <div className="bucket-card-info">
                    <p className="bucket-card-name">{item.name}</p>
                    <p className="bucket-card-price">{item.price}₽</p>
                    {item.old_price !== 0 && (
                      <p className="bucket-card-discount">
                        Скидка: {item.old_price - item.price}₽
                      </p>
                    )}
                    <div className="bucket-clicker">
                      <button
                        className="bucket-remove-btn"
                        onClick={() => toggleFavorite(item.id)}
                      >
                        Удалить из избранного
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
