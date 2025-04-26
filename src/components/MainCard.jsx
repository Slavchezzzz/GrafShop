// MainCard.jsx
import { useContext } from "react";
import "../styles/MainCard.css";
import { CartContext } from "./data/CartContext.js";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function MainCard({ products = [] }) {
  return (
    <div className="Card-info">
      <div className="card-menu">
        {products.length > 0 ? (
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
  const { addToCart, toggleFavorite, isFavorite, cart } =
    useContext(CartContext);

  const isInCart = !!cart[product.id];
  const hasDiscount =
    product.old_price > 0 && product.old_price > product.price;
  const isNewProduct = product.is_new == 1;

  return (
    <div className="card-item-main">
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

      <div className="card-description">
        {isNewProduct && <div className="tag-new">Новинка</div>}
        <span className="product-title">{product.name}</span>
        {product.ml && <span className="product-volume"> {product.ml} мл</span>}
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
  );
}
