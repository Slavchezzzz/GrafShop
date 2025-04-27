import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ProductsContext } from "../components/contexts/ProductsContext.js";
import { CartContext } from "../components/data/CartContext";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/ProductPage.css";
import MainCard from "../components/MainCard";

export default function ProductPage() {
  const { id } = useParams();
  const { products } = useContext(ProductsContext);
  const { addToCart, isFavorite, toggleFavorite, cart } =
    useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [desOpen, setDesOpen] = useState("descriptions");
  const [loading, setLoading] = useState(true);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // Загрузка данных продукта
  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((p) => p.id === parseInt(id));
      setProduct(foundProduct);
      setLoading(false);

      // Получаем рекомендуемые товары только при загрузке продукта
      if (foundProduct) {
        const sameCategory = products.filter(
          (p) =>
            p.category_id === foundProduct.category_id &&
            p.id !== foundProduct.id
        );

        // Перемешиваем один раз и сохраняем результат
        const shuffled = sameCategory
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);

        setRecommendedProducts(shuffled);
      }
    }
  }, [id, products]);

  const tabContent = {
    descriptions: {
      button: "Описание",
      content: product?.descriptions || "Описание отсутствует",
    },
    delivery: {
      button: "Доставка",
      content:
        "Минимальная сумма заказа - 500 рублей. Стоимость доставки: При заказе от 10 000 рублей - бесплатно; При заказе до 10 000 рублей - по тарифам служб доставки. Сборка заказа происходит в течении 7 рабочих дней.",
    },
    checkout: {
      button: "Оплата",
      content:
        "1. Карты оплаты Visa, MasterCard\n2. Система онлайн-расчетов WebMoney\n3. Платежная система Яндекс.Деньги\nПри использовании этих сервисов, Вы можете быть уверены в полной конфиденциальности.",
    },
  };

  const handleTabClick = (tabKey) => {
    setDesOpen(tabKey);
  };

  // Функция для получения рекомендуемых товаров
  const getRecommendedProducts = () => {
    if (!product || !products.length) return [];

    // Получаем товары той же категории, исключая текущий товар
    const sameCategory = products.filter(
      (p) => p.category_id === product.category_id && p.id !== product.id
    );

    // Перемешиваем массив и берем первые 4 товара
    return sameCategory.sort(() => Math.random() - 0.5).slice(0, 4);
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (!product) return <div className="error">Продукт не найден</div>;

  const isInCart = !!cart[product.id];
  const hasDiscount =
    product.old_price > 0 && product.old_price > product.price;

  return (
    <div className="product">
      <Header />

      <div className="product-container">
        {/* Хлебные крошки */}
        <div className="bucket-path-cont">
          <Link to="/" className="bucket-path-des">
            GraffsShop
          </Link>
          <span className="bucket-path-sep">/</span>
          <Link to="/test" className="bucket-path-des">
            Каталог
          </Link>
          <span className="bucket-path-sep">/</span>
          <span>{product.name}</span>
        </div>

        {/* Основное содержимое */}
        <div className="product-main">
          {/* Изображение продукта */}
          <div className="image-container">
            <img
              src={product.img || "/placeholder-product.jpg"}
              alt={product.name}
              onError={(e) => {
                e.target.src = "/placeholder-product.jpg";
              }}
            />
          </div>

          {/* Информация о продукте */}
          <div className="product-info">
            <div className="product-header">
              <h1>{product.name}</h1>
              <div className="product-price">
                {hasDiscount && (
                  <span className="old-price">{product.old_price}₽</span>
                )}
                <span className="current-price">{product.price}₽</span>
                {product.ml && (
                  <span className="volume"> | {product.ml} мл</span>
                )}
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="product-actions">
              <button
                className={`button-cart ${isInCart ? "added" : ""}`}
                onClick={() => addToCart(product)}
              >
                {isInCart ? "В корзине" : "В корзину"}
              </button>
              <button
                className={`button-wishlist ${
                  isFavorite(product.id) ? "active" : ""
                }`}
                onClick={() => toggleFavorite(product.id)}
              >
                {isFavorite(product.id) ? "В избранном" : "В избранное"}
              </button>
            </div>

            {/* Табы с описанием */}
            <div className="product-tabs">
              <div className="tabs-header">
                {Object.keys(tabContent).map((key) => (
                  <button
                    key={key}
                    className={`tab-button ${desOpen === key ? "active" : ""}`}
                    onClick={() => handleTabClick(key)}
                  >
                    {tabContent[key].button}
                  </button>
                ))}
              </div>
              <div className="tabs-content">
                <p>{tabContent[desOpen].content}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Блок рекомендуемых товаров */}
        {recommendedProducts.length > 0 && (
          <div className="recommended-products">
            <h2>Может быть интересно</h2>
            <MainCard products={recommendedProducts} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
