import { useContext, useState } from "react";
import { CartContext } from "../components/data/CartContext.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/Order.css";
import { FaShoppingCart } from "react-icons/fa";

export default function Order() {
  // Получаем необходимые методы и данные из контекста корзины
  const { cart, removeFromCart, updateQuantity, getCartTotal } =
    useContext(CartContext);

  // Состояния для формы заказа
  const [showModal, setShowModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentType, setPaymentType] = useState("");

  // Расчет общей суммы заказа
  const calculateOrderSummary = () => {
    const cartItems = Object.values(cart);
    let subtotal = getCartTotal();
    let discount = 0;

    // Расчет скидки
    cartItems.forEach((item) => {
      if (item.old_price) {
        discount += (item.old_price - item.price) * item.quantity;
      }
    });

    // Расчет стоимости доставки
    const deliveryPrice = subtotal > 1000 ? 0 : 500;
    const total = subtotal + deliveryPrice;
    const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return { subtotal, discount, deliveryPrice, total, itemsCount };
  };

  const { subtotal, discount, deliveryPrice, total, itemsCount } =
    calculateOrderSummary();

  // Обработчики выбора способов доставки и оплаты
  const handleDeliveryChange = (method) => {
    setDeliveryMethod(method);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
  };

  // Валидация формы перед оформлением заказа
  const validateOrder = () => {
    if (itemsCount === 0) {
      return "Корзина пуста. Добавьте товары для оформления заказа.";
    }
    if (!deliveryMethod) {
      return "Выберите способ доставки.";
    }
    if (!paymentMethod) {
      return "Выберите способ оплаты.";
    }
    if (!paymentType) {
      return "Выберите тип оплаты.";
    }
    return "";
  };

  // Оформление заказа
  const handleCheckout = () => {
    const validationError = validateOrder();
    if (validationError) {
      setErrorMessage(validationError);
      setShowModal(true);
      return;
    }

    // Создание информации о заказе
    setOrderInfo({
      orderNumber: `ORDER-${Math.floor(Math.random() * 1000000)}`,
      deliveryMethod,
      paymentMethod,
      paymentType,
      subtotal,
      discount,
      deliveryPrice,
      total,
    });

    setShowModal(true);
    setErrorMessage("");
  };

  // Закрытие модального окна
  const closeModal = () => {
    setShowModal(false);
    setOrderInfo(null);
    setErrorMessage("");
  };

  return (
    <div className="page-order">
      <Header />
      <div className="path-cont">
        <a href="/" className="path-des">
          GraffsShop
        </a>
        <a href="/test" className="path-des">
          Каталог
        </a>
        <a>Корзина</a>
      </div>

      <div className="main-order">
        <h1>Корзина</h1>
        <div className="back-order">
          <div className="order-info">
            <div className="delivery">
              <h2>Личные данные</h2>
              <div className="description">
                {/* Персональные данные */}
                <div className="personal-info">
                  <div className="input-delivery">
                    <div className="input-group">
                      <label htmlFor="fullName">ФИО</label>
                      <input
                        type="text"
                        id="fullName"
                        placeholder="Введите ваше полное имя"
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="phone">Телефон</label>
                      <input
                        type="tel"
                        id="phone"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="example@mail.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Способы доставки */}
                <div className="delivery-methods">
                  <h2>Способ доставки</h2>
                  <div className="delivery-options">
                    <div className="delivery-option">
                      <input
                        type="radio"
                        id="courier"
                        name="delivery"
                        className="delivery-radio"
                        checked={deliveryMethod === "Курьером"}
                        onChange={() => handleDeliveryChange("Курьером")}
                      />
                      <label htmlFor="courier" className="delivery-label">
                        <span className="delivery-title">Курьером</span>
                        <span className="delivery-info">Доставка до двери</span>
                        <span className="delivery-price">от 500 ₽</span>
                      </label>
                    </div>

                    <div className="delivery-option">
                      <input
                        type="radio"
                        id="cdek"
                        name="delivery"
                        className="delivery-radio"
                        checked={deliveryMethod === "СДЭК"}
                        onChange={() => handleDeliveryChange("СДЭК")}
                      />
                      <label htmlFor="cdek" className="delivery-label">
                        <span className="delivery-title">СДЭК</span>
                        <span className="delivery-info">
                          Доставка до пункта выдачи
                        </span>
                        <span className="delivery-price">от 300 ₽</span>
                      </label>
                    </div>

                    <div className="delivery-option">
                      <input
                        type="radio"
                        id="post"
                        name="delivery"
                        className="delivery-radio"
                        checked={deliveryMethod === "Почта России"}
                        onChange={() => handleDeliveryChange("Почта России")}
                      />
                      <label htmlFor="post" className="delivery-label">
                        <span className="delivery-title">Почта России</span>
                        <span className="delivery-info">
                          Доставка до отделения
                        </span>
                        <span className="delivery-price">от 250 ₽</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="payment">
              <h2>Оплата</h2>
              <div className="description">
                <div className="payment-methods-container">
                  {/* Способ оплаты */}
                  <div className="payment-section">
                    <h5>Способ оплаты</h5>
                    <div className="payment-options">
                      <div className="payment-option">
                        <input
                          type="radio"
                          id="payNow"
                          name="paymentMethod"
                          className="payment-radio"
                          checked={paymentMethod === "Оплата сразу"}
                          onChange={() =>
                            handlePaymentMethodChange("Оплата сразу")
                          }
                        />
                        <label htmlFor="payNow" className="payment-label">
                          <span className="payment-title">Оплата сразу</span>
                          <span className="payment-info">
                            Мгновенное подтверждение
                          </span>
                        </label>
                      </div>

                      <div className="payment-option">
                        <input
                          type="radio"
                          id="payLater"
                          name="paymentMethod"
                          className="payment-radio"
                          checked={paymentMethod === "Оплата при получении"}
                          onChange={() =>
                            handlePaymentMethodChange("Оплата при получении")
                          }
                        />
                        <label htmlFor="payLater" className="payment-label">
                          <span className="payment-title">
                            Оплата при получении
                          </span>
                          <span className="payment-info">
                            Оплата после доставки
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Тип оплаты */}
                  <div className="payment-section">
                    <h5>Тип оплаты</h5>
                    <div className="payment-options">
                      <div className="payment-option">
                        <input
                          type="radio"
                          id="card"
                          name="paymentType"
                          className="payment-radio"
                          checked={paymentType === "Банковской картой"}
                          onChange={() =>
                            handlePaymentTypeChange("Банковской картой")
                          }
                        />
                        <label htmlFor="card" className="payment-label">
                          <span className="payment-title">
                            Банковской картой
                          </span>
                          <span className="payment-info">
                            Visa, MasterCard, МИР
                          </span>
                        </label>
                      </div>

                      <div className="payment-option">
                        <input
                          type="radio"
                          id="cash"
                          name="paymentType"
                          className="payment-radio"
                          checked={paymentType === "Наличными"}
                          onChange={() => handlePaymentTypeChange("Наличными")}
                        />
                        <label htmlFor="cash" className="payment-label">
                          <span className="payment-title">Наличными</span>
                          <span className="payment-info">
                            При получении заказа
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Итоговая информация */}
                <div className="order-summary">
                  <div className="summary-items">
                    <div className="summary-row">
                      <span>Товары ({itemsCount})</span>
                      <span>{subtotal} ₽</span>
                    </div>
                    {discount > 0 && (
                      <div className="summary-row discount">
                        <span>Скидка</span>
                        <span>-{discount} ₽</span>
                      </div>
                    )}
                    <div className="summary-row">
                      <span>Доставка</span>
                      <span>{deliveryPrice} ₽</span>
                    </div>
                    <div className="summary-row total">
                      <span>Итого</span>
                      <span>{total} ₽</span>
                    </div>
                  </div>
                  <button onClick={handleCheckout} className="checkout-button">
                    Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Пустая корзина */}
          <div className="cart-main">
            {itemsCount === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-content">
                  <FaShoppingCart className="empty-cart-icon" />
                  <h2>Ваша корзина пуста</h2>
                  <p>Добавьте товары, чтобы сделать заказ</p>
                  <a href="/test" className="continue-shopping">
                    Продолжить покупки
                  </a>
                </div>
              </div>
            ) : (
              Object.keys(cart).map((key) => {
                const item = cart[key];
                return (
                  <div className="card-order" key={key}>
                    <img
                      className="card-img"
                      src={item.img}
                      width={200}
                      alt={item.name}
                    />
                    <p>{item.name}</p>
                    <p>{item.price} ₽</p>
                    <p>
                      Скидка: {item.old_price ? item.old_price - item.price : 0}{" "}
                      ₽
                    </p>

                    <div className="clicker">
                      <button
                        onClick={() => updateQuantity(key, item.quantity - 1)}
                      >
                        -
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        onClick={() => updateQuantity(key, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button onClick={() => removeFromCart(key)}>
                        Удалить
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-pos">
            <div className="modal">
              {errorMessage ? (
                <>
                  <h2>Ошибка оформления заказа</h2>
                  <p>{errorMessage}</p>
                  <button onClick={closeModal}>Закрыть</button>
                </>
              ) : orderInfo ? (
                <>
                  <h2>Заказ успешно оформлен!</h2>
                  <p>Номер заказа: {orderInfo.orderNumber}</p>
                  <p>Способ доставки: {orderInfo.deliveryMethod}</p>
                  <p>Способ оплаты: {orderInfo.paymentMethod}</p>
                  <p>Тип оплаты: {orderInfo.paymentType}</p>
                  <p>Итоговая сумма: {orderInfo.total} ₽</p>
                  <button onClick={closeModal}>Закрыть</button>
                </>
              ) : (
                <>
                  <h2>Корзина пуста</h2>
                  <p>
                    Пожалуйста, добавьте товары в корзину, чтобы оформить заказ.
                  </p>
                  <button onClick={closeModal}>Закрыть</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
