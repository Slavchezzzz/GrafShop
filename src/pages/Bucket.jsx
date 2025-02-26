import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useContext, useState } from "react";
import { CartContext } from "../components/data/CartContext.js";
import "../styles/Bucket.css";
import { Link } from "react-router-dom";

export default function Bucket() {
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

  // Считаем скидку для каждого товара отдельно
  const calculateDiscountedPrice = (old_price, price) => {
    if (old_price !== 0) {
      return old_price - price;
    }
    return 0;
  };

  return (
    <div className="bucket">
      <Header />
      <div className="path-cont">
        <a href="/" className="path-des">
          GraffsShop
        </a>
        <a href="/test" className="path-des">
          Каталог
        </a>
        <a>Избранное</a>
      </div>
      <div className="bucket-main">
        <h1>Избранное</h1>
        {/* информация о корзине */}
        {Object.keys(cart).length > 0 ? (
          <div>
            <div className="itog">
              <div className="cart-itog">
                <p>Количсетво товара в избранном: {Object.keys(cart).length}</p>
                <p>Скидка: {salePrice}₽</p>
                <p>Итого: {totalPrice}₽</p>
              </div>
            </div>
          </div>
        ) : (
          <p>У вас нет избранного!</p>
        )}
        <div className="cart">
          {/* блок товаров в корзине */}
          {Object.keys(cart).map((key) => {
            return (
              <div className="card-bucket">
                <div className="card-bucket-des">
                  <img
                    className="bucket-img"
                    src={cart[key].img}
                    width={200}
                  ></img>
                  <p>{cart[key].name}</p>
                  <p>{cart[key].price}₽</p>
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
              </div>
            );
          })}
        </div>
      </div>
      <Footer className="footer-bucket" />
    </div>
  );
}
