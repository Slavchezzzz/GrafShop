import { Descriptions } from "antd";
import Footer from "../components/Footer";
import Header from "../components/Header.jsx";
import "../styles/ProductPage.css";
import { useState } from "react";
import CardPopular from "../components/CardPopular.jsx";
// import { dataCard } from "../components/data/dataCardPopular";

export default function ProductPage() {
  let [desOpen, setDesOpen] = useState("descriptions");

  const list = {
    descriptions: {
      button: "Описание",
      descript:
        "Titans — это индонезийский бренд аэрозольной краски, производимый компанией Tanal Paint и разработанный Nevertoolavist, Hard13, Darbotz и Zany 13, которые не первый год в граффити сцене. Краска Titans помогает художникам создавать больше, чем просто искусство по доступной цене. Матовое нанесение. Супер мягкий, отзывчивый клапан. Палитра насчитывает 47 матовых цветов. На баллон подходят все стандартные граффити кэпы, и они будут работать именно так, как вы этого ожидаете. С удобным размером баллона вы получите больше возможностей в движении во время рисования. Донат или цветовой индикатор выкрашен краской, что гарантирует совпадение цвета 99.9%. В краске есть добавка с защитой от уф-лучей, это гарантирует что оригинальный цвет будет долго сохранять свою насыщенность. Стоит скини кэп, аналог банана, краска густая лучше ставить фэт на первый пуск.",
    },
    delivery: {
      button: "Доставка",
      descript:
        "Минимальная сумма заказа - 500 рублей.Стоимость доставки:При заказе от 10 000 рублей -  бесплатно; При заказе до 10 000 рублей - по тарифам служб доставки. Сборка заказа происходит в течении 7 рабочих дней.",
    },
    checkout: {
      button: "Оплата",
      descript:
        "1. Карты оплаты Visa, MasterCard2. Система онлайн-расчетов WebMoney.(Наш кошелек R 149298403931)2. Система онлайн-расчетов WebMoney.(Наш кошелек R 149298403931)3. Платежная система Яндекс деньги. (Наш кошелек 410011661303308)При использовании этих сервисов, Вы можете быть уверены в полной конфиденциальности финансовых операций и достоверности оплаты.",
    },
  };

  function handleClick(e) {
    setDesOpen(e.target.closest("li").dataset.tag);
  }

  let listJsx = [];
  for (let key of Object.keys(list)) {
    // console.log(list[key]);
    listJsx.push(
      <li data-tag={key} key={key} onClick={handleClick}>
        <button>{list[key].button}</button>
      </li>
    );
  }

  return (
    <div className="product">
      <Header></Header>
      <div className="">
        <div className="path-cont">
          <a href="/" className="path-des">
            GraffsShop
          </a>
          <a href="/test" className="path-des">
            Каталог
          </a>
          <a>Граффити</a>
        </div>
        {/* Основной блок */}
        <div className="product-main">
          <div className="image-container">
            <img src="./cardNew/card1.png"></img>
          </div>
          {/* Описание продукта */}
          <div className="product-info">
            <div>
              <h1>Аэрозольная краска Titans 400 мл</h1>
              <div className="product-price">
                <span>400₽</span>
              </div>
            </div>
            <div className="product-button">
              <button className="button-bucket">В корзину</button>
              <button className="button-heart">Добавить в избранное</button>
            </div>
            <div className="product-description">
              <ul className="product-list">{listJsx}</ul>
              <p>{list[desOpen].descript}</p>
            </div>
          </div>
        </div>
        <div className="product-down">
          <h2 className="inters">Может быть интересно</h2>
          <CardPopular />
        </div>
      </div>
      <Footer />
    </div>
  );
}
