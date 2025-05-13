import { useContext, useState } from "react";
import { useCart } from "../components/data/CartContext.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/Order.css";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Order() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  // Состояния для формы заказа
  const [showModal, setShowModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentType, setPaymentType] = useState("");
  
  // Новые состояния для формы
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: ""
  });

  // Обработчик изменения полей формы
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

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

    // Расчет стоимости доставки в зависимости от способа
    let deliveryPrice = 0;
    switch (deliveryMethod) {
      case "Курьером":
        deliveryPrice = 500;
        break;
      case "СДЭК":
        deliveryPrice = 300;
        break;
      case "Почта России":
        deliveryPrice = 250;
        break;
      default:
        deliveryPrice = 0;
    }

    const total = subtotal + deliveryPrice;
    const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return { subtotal, discount, deliveryPrice, total, itemsCount };
  };

  const { subtotal, discount, deliveryPrice, total, itemsCount } = calculateOrderSummary();

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

  // Обработчик изменения количества товара
  const handleQuantityChange = (key, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(key, newQuantity);
    }
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
    if (!formData.fullName.trim()) {
      return "Введите ваше ФИО.";
    }
    if (!formData.phone.trim()) {
      return "Введите номер телефона.";
    }
    if (deliveryMethod === "Курьером" && !formData.address.trim()) {
      return "Введите адрес доставки.";
    }
    if (deliveryMethod !== "Курьером" && !formData.email.trim()) {
      return "Введите email.";
    }
    return "";
  };

  // Оформление заказа
  const handleCheckout = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const validationError = validateOrder();
    if (validationError) {
      setErrorMessage(validationError);
      setShowModal(true);
      return;
    }

    try {
      const orderData = {
        customer_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        delivery_method: deliveryMethod,
        payment_method: paymentMethod,
        payment_type: paymentType,
        subtotal,
        delivery_price: deliveryPrice,
        total,
        items: Object.values(cart).map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
          subtotal: item.price * item.quantity
        }))
      };

      const response = await fetch('/api/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при создании заказа');
      }

      const result = await response.json();

      // Создание информации о заказе
      setOrderInfo({
        orderNumber: result.order_number,
        deliveryMethod,
        paymentMethod,
        paymentType,
        subtotal,
        discount,
        deliveryPrice,
        total,
      });

      // Очищаем корзину после успешного заказа
      clearCart();

      setShowModal(true);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message || "Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже.");
      setShowModal(true);
    }
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
      <div className="bucket-path-cont">
        <Link to="/" className="bucket-path-des">
          GraffsShop
        </Link>
        <span className="bucket-path-sep">/</span>
        <Link to="/test" className="bucket-path-des">
          Каталог
        </Link>
        <span className="bucket-path-sep">/</span>
        <span className="bucket-path-current">Корзина</span>
      </div>

      <main className="main-order">
        <h1>Оформление заказа</h1>

        {Object.keys(cart).length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-content">
              <div className="empty-cart-icon">
                <FaShoppingCart />
              </div>
              <h2>Ваша корзина пуста</h2>
              <p>Добавьте товары в корзину, чтобы оформить заказ</p>
              <Link to="/test" className="continue-shopping">
                Продолжить покупки
              </Link>
            </div>
          </div>
        ) : (
          <div className="back-order">
            <div className="order-info">
              <div className="delivery-payment-container">
                <div className="delivery">
                  <h2>Способ доставки</h2> 
                  <div className="delivery-methods">
                    <h5>Выберите способ доставки</h5>
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
                          <span className="delivery-info">Доставка курьером до двери</span>
                          <span className="delivery-price">500 ₽</span>
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
                          <span className="delivery-info">Доставка до пункта выдачи</span>
                          <span className="delivery-price">300 ₽</span>
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
                          <span className="delivery-info">Доставка почтой России</span>
                          <span className="delivery-price">250 ₽</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="description">
                    <div className="personal-info">
                      <h5>Персональные данные</h5>
                      <div className="input-delivery">
                        <div className="input-group">
                          <label htmlFor="fullName">ФИО</label>
                          <input
                            type="text"
                            id="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Введите ваше ФИО"
                          />
                        </div>
                        <div className="input-group">
                          <label htmlFor="phone">Телефон</label>
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Введите номер телефона"
                          />
                        </div>
                        <div className="input-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Введите email"
                          />
                        </div>
                        {deliveryMethod === "Курьером" && (
                          <div className="input-group">
                            <label htmlFor="address">Адрес доставки</label>
                            <input
                              type="text"
                              id="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              placeholder="Введите адрес доставки"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="payment">
                  <h2>Способ оплаты</h2>
                  <div className="payment-methods-container">
                    <div className="payment-section">
                      <h5>Способ оплаты</h5>
                      <div className="payment-options">
                        <div className="payment-option">
                          <input
                            type="radio"
                            id="card"
                            name="payment"
                            className="payment-radio"
                            checked={paymentMethod === "Картой"}
                            onChange={() => handlePaymentMethodChange("Картой")}
                          />
                          <label htmlFor="card" className="payment-label">
                            <span className="payment-title">Банковской картой</span>
                            <span className="payment-info">Оплата картой онлайн при оформлении заказа</span>
                          </label>
                        </div>
                        <div className="payment-option">
                          <input
                            type="radio"
                            id="cash"
                            name="payment"
                            className="payment-radio"
                            checked={paymentMethod === "Наличными"}
                            onChange={() => handlePaymentMethodChange("Наличными")}
                          />
                          <label htmlFor="cash" className="payment-label">
                            <span className="payment-title">Наличными при получении</span>
                            <span className="payment-info">Оплата наличными курьеру или в пункте выдачи</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="payment-section">
                      <h5>Тип оплаты</h5>
                      <div className="payment-options">
                        <div className="payment-option">
                          <input
                            type="radio"
                            id="full"
                            name="paymentType"
                            className="payment-radio"
                            checked={paymentType === "Полная оплата"}
                            onChange={() => handlePaymentTypeChange("Полная оплата")}
                          />
                          <label htmlFor="full" className="payment-label">
                            <span className="payment-title">Полная оплата</span>
                            <span className="payment-info">Оплата полной стоимости заказа</span>
                          </label>
                        </div>
                        <div className="payment-option">
                          <input
                            type="radio"
                            id="partial"
                            name="paymentType"
                            className="payment-radio"
                            checked={paymentType === "Частичная оплата"}
                            onChange={() => handlePaymentTypeChange("Частичная оплата")}
                          />
                          <label htmlFor="partial" className="payment-label">
                            <span className="payment-title">Частичная оплата</span>
                            <span className="payment-info">Предоплата 30% от стоимости заказа</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="payment-info">
                    <div className="order-summary">
                      <div className="summary-items">
                        <div className="summary-row">
                          <span>Товары ({itemsCount}):</span>
                          <span>{subtotal} ₽</span>
                        </div>
                        {discount > 0 && (
                          <div className="summary-row discount">
                            <span>Скидка:</span>
                            <span>-{discount} ₽</span>
                          </div>
                        )}
                        <div className="summary-row">
                          <span>Доставка:</span>
                          <span>{deliveryPrice} ₽</span>
                        </div>
                        <div className="summary-row total">
                          <span>Итого:</span>
                          <span>{total} ₽</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={handleCheckout} className="checkout-button">
                      Оформить заказ
                    </button>
                  </div>
                </div>
              </div>

              <div className="cart-main">
                {Object.entries(cart).map(([key, item]) => (
                  <div key={key} className="order-card">
                    <div className="order-card-image">
                      <img src={item.img} alt={item.title} />
                    </div>
                    <div className="order-card-info">
                      <h2 className="order-card-title">{item.title}</h2>
                      <div className="order-card-price">
                        <div className="price-block">
                          <span className="current-price">{item.price} ₽</span>
                          <div className="order-card-discount">
                            {item.old_price && item.old_price > item.price ? (
                              <>
                                <span className="order-card-old-price">{item.old_price} ₽</span>
                                <span className="order-card-discount-amount">
                                  Скидка: {item.old_price - item.price} ₽
                                </span>
                              </>
                            ) : (
                              <span className="order-card-discount-amount">
                                Скидка: 0 ₽
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="order-card-quantity">
                        <button onClick={() => handleQuantityChange(key, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(key, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <button className="order-card-remove" onClick={() => removeFromCart(key)}>Удалить</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-pos">
            <div className="modal">
              {errorMessage ? (
                <>
                  <h2>Ошибка</h2>
                  <p>{errorMessage}</p>
                  <button onClick={closeModal}>Закрыть</button>
                </>
              ) : (
                <>
                  <h2>Заказ успешно оформлен!</h2>
                  <p>Номер вашего заказа: {orderInfo.orderNumber}</p>
                  <p>Способ доставки: {orderInfo.deliveryMethod}</p>
                  <p>Способ оплаты: {orderInfo.paymentMethod}</p>
                  <p>Тип оплаты: {orderInfo.paymentType}</p>
                  <p>Сумма заказа: {orderInfo.total} ₽</p>
                  <button onClick={() => navigate('/')}>Вернуться на главную</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
