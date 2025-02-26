import { useContext } from "react";
import "../styles/MainCard.css";
import { CartContext } from "./data/CartContext.js";
import { MainDataCard } from "./data/MainDataCard.jsx";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function MainCard() {
  return (
    <div className="Card-info">
      <div className="card-menu">
        {MainDataCard.map((MainDataCard, index) => {
          return <Card MainDataCard={MainDataCard} key={index} />;
        })}
      </div>
    </div>
  );
}

export function Card({ MainDataCard }) {
  const { cart, setCart } = useContext(CartContext);

  let bucket = "bucket-icon";
  if (cart[MainDataCard.id] != undefined) {
    bucket += " active";
  }

  let heart = "heart-icon";
  if (cart[MainDataCard.id] != undefined) {
    heart += " active-1";
  }

  function handleClick() {
    if (cart[MainDataCard.id] != undefined) {
      delete cart[MainDataCard.id];
    } else {
      cart[MainDataCard.id] = MainDataCard;
    }
    setCart(structuredClone(cart));
    console.log(cart);
  }

  function heartClick() {
    if (cart[MainDataCard.id] != undefined) {
      delete cart[MainDataCard.id];
    } else {
      cart[MainDataCard.id] = MainDataCard;
    }
    setCart(structuredClone(cart));
    console.log(cart);
  }

  return (
    <div className="card-item-main">
      <img className="card-img-" src={MainDataCard.img} width={200}></img>
      <div className="card-description">
        <span>{MainDataCard.name} </span>
        <span>{MainDataCard.ml} мл</span>
        <h2>{MainDataCard.price}₽</h2>
      </div>
      <div className="Card-pos">
        <Link to={"/product"}>Подробнее</Link>
        <FaShoppingCart className={bucket} onClick={handleClick} />
        <FaHeart className={heart} onClick={heartClick} />
      </div>
    </div>
  );
}
