import { CartContext } from "../components/data/CartContext.js";
import { useContext } from "react";
import React, { useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/Order.css";

export default function Order() {
  const { cart, setCart } = useContext(CartContext);
  const [count, setCount] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Состояние для выбора способа доставки
  const [deliveryMethod, setDeliveryMethod] = useState("");

  // Состояние для выбора способа оплаты
  const [paymentMethod, setPaymentMethod] = useState("");

  // Состояние для выбора типа оплаты
  const [paymentType, setPaymentType] = useState("");

  // Обработчик для выбора способа доставки
  const handleDeliveryChange = (method) => {
    setDeliveryMethod(method);
  };

  // Обработчик для выбора способа оплаты
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Обработчик для выбора типа оплаты
  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
  };

  // Функция удаляет товар из корзины
  function handleRemoveItem(itemId) {
    const updatedCart = { ...cart };
    delete updatedCart[itemId];
    setCart(updatedCart);

    const updatedCounts = { ...count };
    delete updatedCounts[itemId];
    setCount(updatedCounts);
  }

  // Увеличение количества товара
  const increment = (itemId) => {
    setCount((prevCounts) => ({
      ...prevCounts,
      [itemId]: (prevCounts[itemId] || 1) + 1,
    }));
  };

  // Уменьшение количества товара
  const decrement = (itemId) => {
    setCount((prevCounts) => {
      const currentCount = prevCounts[itemId] || 1;
      if (currentCount > 1) {
        return {
          ...prevCounts,
          [itemId]: currentCount - 1,
        };
      }
      return prevCounts;
    });
  };

  // Считаем общую сумму заказа
  const totalPrice = Object.keys(cart).reduce((total, key) => {
    const item = cart[key];
    const itemCount = count[key] || 1;
    return total + item.price * itemCount;
  }, 0);

  // Считаем общую сумму скидки
  const salePrice = Object.keys(cart).reduce((total, key) => {
    const item = cart[key];
    const itemCount = count[key] || 1;
    if (item.old_price !== 0) {
      const discountPerItem = item.old_price - item.price;
      return total + discountPerItem * itemCount;
    }
    return total;
  }, 0);

  // Стоимость доставки
  const deliveryPrice = totalPrice > 1000 ? 500 : 0;

  // Итоговая сумма
  const finalPrice = totalPrice - salePrice + deliveryPrice;

  // Считаем скидку для каждого товара отдельно
  const calculateDiscountedPrice = (old_price, price) => {
    if (old_price !== 0) {
      return old_price - price;
    }
    return 0;
  };

  // Проверка, пуста ли корзина
  const isCartEmpty = Object.keys(cart).length === 0;

  // Генерация случайного номера заказа
  const generateOrderNumber = () => {
    return `ORDER-${Math.floor(Math.random() * 1000000)}`;
  };

  // Проверка заполненности всех полей
  const validateOrder = () => {
    if (isCartEmpty) {
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

  // Обработчик для кнопки "Оформить"
  const handleCheckout = () => {
    const validationError = validateOrder();
    if (validationError) {
      setErrorMessage(validationError);
      setShowModal(true);
      return;
    }

    // Генерация номера заказа
    const orderNumber = generateOrderNumber();

    // Сохранение информации о заказе
    setOrderInfo({
      orderNumber,
      deliveryMethod,
      paymentMethod,
      paymentType,
      totalPrice,
      salePrice,
      deliveryPrice,
      finalPrice,
    });

    // Показ модального окна с информацией о заказе
    setShowModal(true);
    setErrorMessage("");
  };

  // Закрытие модального окна
  const closeModal = () => {
    setShowModal(false);
    setOrderInfo(null);
    setErrorMessage("");
  };

  const totalItemsInCart = Object.keys(cart).reduce((total, key) => {
    return total + (count[key] || 1);
  }, 0);

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
                  <p>Количество товара в корзине: {totalItemsInCart}</p>
                  <p>Скидка: {salePrice} ₽</p>
                  <p>Доставка: {deliveryPrice} ₽</p>
                  <p id="itog">Итого: {finalPrice} ₽</p>
                  <button onClick={handleCheckout}>Оформить</button>
                </div>
              </div>
            </div>
          </div>
          {/* блок товаров в корзине */}
          <div className="cart-main">
            {Object.keys(cart).map((key) => {
              return (
                <div className="card-order" key={key}>
                  <img
                    className="bucket-img"
                    src={cart[key].img}
                    width={200}
                  ></img>
                  <p>{cart[key].name}</p>
                  <p>{cart[key].price} ₽</p>
                  <p>
                    {calculateDiscountedPrice(
                      cart[key].old_price,
                      cart[key].price
                    )}
                    ₽
                  </p>
                  <div className="clicker">
                    <button onClick={() => decrement(key)}>-</button>
                    <p>{count[key] || 1}</p>
                    <button onClick={() => increment(key)}>+</button>
                    <button onClick={() => handleRemoveItem(key)}>
                      Удалить
                    </button>
                  </div>
                </div>
              );
            })}
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
                  <p>Итоговая сумма: {orderInfo.finalPrice} ₽</p>
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
