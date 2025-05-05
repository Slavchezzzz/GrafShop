// MainCard.jsx
import { useContext } from "react";
import "../styles/MainCard.css";
import { CartContext } from "./data/CartContext.js";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function MainCard({ products = [] }) {
  console.log('MainCard received products:', products); // Отладочный лог

  return (
    <div className="Card-info">
      <div className="card-menu">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products">Товары не найдены</div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const { addToCart, toggleFavorite, isFavorite, cart } = useContext(CartContext);

  // Отладочные логи
  console.log('ProductCard received product:', product);
  console.log('is_new_products value:', product.is_new_products);

  const isInCart = !!cart[product.id];
  const hasDiscount = product.old_price > 0 && product.old_price > product.price;

  return (
    <div className="card-item-main">
      {product.is_new_products === 1 && (
        <div className="tag-new">Новинка</div>
      )}
      
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
            onClick={() => addToCart(product)}
            title="Добавить в корзину"
          />
          <FaHeart
            className={`favorite-icon ${isFavorite(product.id) ? "active" : ""}`}
            onClick={() => toggleFavorite(product.id)}
            title="Добавить в избранное"
          />
        </div>
      </div>
    </div>
  );
}
