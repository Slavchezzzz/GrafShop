import { useContext, useState } from "react";
import { CartContext } from "../components/data/CartContext.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/Order.css";

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
              <h2>Способ доставки</h2>
              <div className="description">
                <div className="input-delivery">
                  <input type="text" placeholder="ФИО" />
                  <input type="tel" placeholder="Телефон" />
                  <input type="email" placeholder="Почта" />
                </div>
                <div className="checkbox">
                  <h5>Выберите способ доставки</h5>
                  <div className="checkbox-content">
                    <input
                      type="radio"
                      name="delivery"
                      className="checkbox-input"
                      checked={deliveryMethod === "Курьером"}
                      onChange={() => handleDeliveryChange("Курьером")}
                    />
                    <span className="checkbox-span">Курьером</span>
                  </div>
                  <div className="checkbox-content">
                    <input
                      type="radio"
                      name="delivery"
                      className="checkbox-input"
                      checked={deliveryMethod === "СДЭК"}
                      onChange={() => handleDeliveryChange("СДЭК")}
                    />
                    <span className="checkbox-span">СДЭК</span>
                  </div>
                  <div className="checkbox-content">
                    <input
                      type="radio"
                      name="delivery"
                      className="checkbox-input"
                      checked={deliveryMethod === "Почта России"}
                      onChange={() => handleDeliveryChange("Почта России")}
                    />
                    <span className="checkbox-span">Почта России</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="payment">
              <h2>Способ оплаты</h2>
              <div className="description">
                <div className="checkbox">
                  <div className="payment-section">
                    <h5>Выберите способ оплаты</h5>
                    <div className="checkbox-content">
                      <input
                        type="radio"
                        name="paymentMethod"
                        className="checkbox-input"
                        checked={paymentMethod === "Оплата сразу"}
                        onChange={() =>
                          handlePaymentMethodChange("Оплата сразу")
                        }
                      />
                      <span className="checkbox-span">Оплата сразу</span>
                    </div>
                    <div className="checkbox-content">
                      <input
                        type="radio"
                        name="paymentMethod"
                        className="checkbox-input"
                        checked={paymentMethod === "Оплата при получении"}
                        onChange={() =>
                          handlePaymentMethodChange("Оплата при получении")
                        }
                      />
                      <span className="checkbox-span">
                        Оплата при получении
                      </span>
                    </div>
                  </div>
                  <div className="payment-section">
                    <h5>Выберите тип оплаты</h5>
                    <div className="checkbox-content">
                      <input
                        type="radio"
                        name="paymentType"
                        className="checkbox-input"
                        checked={paymentType === "Оплата картой"}
                        onChange={() =>
                          handlePaymentTypeChange("Оплата картой")
                        }
                      />
                      <span className="checkbox-span">Оплата картой</span>
                    </div>
                    <div className="checkbox-content">
                      <input
                        type="radio"
                        name="paymentType"
                        className="checkbox-input"
                        checked={paymentType === "Оплата наличными"}
                        onChange={() =>
                          handlePaymentTypeChange("Оплата наличными")
                        }
                      />
                      <span className="checkbox-span">Оплата наличными</span>
                    </div>
                  </div>
                </div>
                <div className="payment-info">
                  <p>Количество товара в корзине: {itemsCount}</p>
                  <p>Скидка: {discount} ₽</p>
                  <p>Доставка: {deliveryPrice} ₽</p>
                  <p id="itog">Итого: {total} ₽</p>
                  <button onClick={handleCheckout}>Оформить</button>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-main">
            {Object.keys(cart).length > 0 ? (
              Object.keys(cart).map((key) => {
                const item = cart[key];
                return (
                  <div className="card-order" key={key}>
                    <img
                      className="bucket-img"
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
            ) : (
              <div className="empty-cart">
                <p>Ваша корзина пуста</p>
                <a href="/test" className="continue-shopping">
                  Продолжить покупки
                </a>
              </div>
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
