import { CartContext } from "../components/data/CartContext.js";
import { useContext } from "react";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/Order.css";

export default function Order() {
  const { cart, setCart } = useContext(CartContext);
  const [count, setCount] = useState(1);

  // Функция удаляет товар из корзины
  function handleRemoveItem(itemId) {
    const updatedCart = { ...cart };
    delete updatedCart[itemId];
    setCart(updatedCart);

    const updateCounts = { ...count };
    delete updateCounts[itemId];
    setCount(updateCounts);
  }

  const increment = (itemId) => {
    setCount((prevCounts) => ({
      ...prevCounts,
      [itemId]: (prevCounts[itemId] || 1) + 1,
    }));
  };

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
    return total + item.price;
  }, 0);

  //  Считаем общую сумму скидки
  const salePrice = Object.keys(cart).reduce((total, key) => {
    const item = cart[key];
    if (item.old_price !== 0) {
      let raz = item.old_price - item.price;
      return total + raz;
    }
    return 0;
  }, 0);

  let deliveryPrice = 0;
  const deliveryCalculate = (deliveryPrice) => {
    if (totalPrice > 1000) {
      deliveryPrice = 500;
      return deliveryPrice;
    }
    return deliveryPrice;
  };

  // Считаем скидку для каждого товара отдельно
  const calculateDiscountedPrice = (old_price, price) => {
    if (old_price !== 0) {
      return old_price - price;
    }
    return 0;
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
                    <input type="checkbox" className="checkbox-input"></input>
                    <span className="checkbox-span">Курьером</span>
                  </div>
                  <div className="checkbox-content">
                    <input type="checkbox" className="checkbox-input"></input>
                    <span className="checkbox-span">СДЭК</span>
                  </div>
                  <div className="checkbox-content">
                    <input type="checkbox" className="checkbox-input"></input>
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
                      <input type="checkbox" className="checkbox-input"></input>
                      <span className="checkbox-span">Оплата сразу</span>
                    </div>
                    <div className="checkbox-content">
                      <input type="checkbox" className="checkbox-input"></input>
                      <span className="checkbox-span">
                        Оплата при получении
                      </span>
                    </div>
                  </div>
                  <div className="payment-section">
                    <h5>Выберите тип оплаты</h5>
                    <div className="checkbox-content">
                      <input type="checkbox" className="checkbox-input"></input>
                      <span className="checkbox-span">Оплата картой</span>
                    </div>
                    <div className="checkbox-content">
                      <input type="checkbox" className="checkbox-input"></input>
                      <span className="checkbox-span">Оплата наличными</span>
                    </div>
                  </div>
                </div>
                <div className="payment-info">
                  <p>Количсетво товара в корзине: {Object.keys(cart).length}</p>
                  <p>Скидка: {salePrice} ₽</p>
                  <p>Доставка: {deliveryCalculate(deliveryPrice)} ₽</p>
                  <p id="itog">Итого: {totalPrice} ₽</p>
                  <button>Оформить</button>
                </div>
              </div>
            </div>
          </div>
          {/* блок товаров в корзине */}
          <div className="cart-main">
            {Object.keys(cart).map((key) => {
              return (
                <div className="card-order">
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
                    <button onClick={() => handleRemoveItem(cart[key].id)}>
                      Удалить
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
