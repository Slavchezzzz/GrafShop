// MainCard.jsx
import { useContext, useState } from "react";
import "../styles/MainCard.css";
import { useCart } from "./data/CartContext.js";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Notification from "./Notification.jsx";

export default function MainCard({ products = [] }) {
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <div className="Card-info">
      {notification && (
        <Notification message={notification} onClose={hideNotification} />
      )}
      <div className="card-menu">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              showNotification={showNotification}
            />
          ))
        ) : (
          <div className="no-products">Товары не найдены</div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, showNotification }) {
  const { addToCart, toggleFavorite, isFavorite, cart } = useCart();

  const isInCart = !!cart[product.id];
  const hasDiscount = product.old_price > 0 && product.old_price > product.price;

  const handleAddToCart = () => {
    addToCart(product);
    showNotification(isInCart 
      ? `Товар "${product.title}" удален из корзины` 
      : `Товар "${product.title}" добавлен в корзину`
    );
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
    showNotification(isFavorite(product.id)
      ? `Товар "${product.title}" удален из избранного`
      : `Товар "${product.title}" добавлен в избранное`
    );
  };

  return (
    <div className="card-item-main">
      <Link to={`/product/${product.id}`} className="product-link">
        <img
          src={product.img || "/placeholder-product.jpg"}
          className="card-img"
          alt={product.title}
          onError={(e) => {
            e.target.src = "/placeholder-product.jpg";
          }}
        />
      </Link>
      {product.is_new_products && <div className="tag-new">Новинка</div>}
      <div className="card-description">
        <span className="product-title">{product.title}</span>
        {product.ml && <span className="product-volume">{product.ml} мл</span>}
        <div className="price-container">
          {hasDiscount && (
            <span className="old-price">{product.old_price}₽</span>
          )}
          <span className="current-price">{product.price}₽</span>
        </div>
      </div>

      <div className="card-actions">
        <Link to={`/product/${product.id}`} className="details-link">
          Подробнее
        </Link>

        <div className="action-icons">
          <FaShoppingCart 
            className={`cart-icon ${isInCart ? "active" : ""}`}
            onClick={handleAddToCart} 
            title="Добавить в корзину"
          />
          <FaHeart 
            className={`favorite-icon ${isFavorite(product.id) ? "active" : ""}`}
            onClick={handleToggleFavorite} 
            title="Добавить в избранное"
          />
        </div>
      </div>
    </div>
  );
}
