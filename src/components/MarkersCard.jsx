import "../styles/MainCard.css";
import { MarkerData } from "./data/MarkerData";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "./data/CartContext.js";
import { Link } from "react-router-dom";

export default function MarkerCard() {
  return (
    <div className="Card-info">
      <div className="card-menu">
        {MarkerData.map((MarkerData, index) => {
          return <Card MarkerData={MarkerData} key={index} />;
        })}
      </div>
    </div>
  );
}

export function Card({ MarkerData }) {
  const { cart, setCart } = useContext(CartContext);

  let bucket = "bucket-icon";
  if (cart[MarkerData.id] != undefined) {
    bucket += " active";
  }

  let heart = "heart-icon";
  if (cart[MarkerData.id] != undefined) {
    heart += " active-1";
  }

  function handleClick() {
    if (cart[MarkerData.id] != undefined) {
      delete cart[MarkerData.id];
    } else {
      cart[MarkerData.id] = MarkerData;
    }
    setCart(structuredClone(cart));
    console.log(cart);
  }

  function heartClick() {
    if (cart[MarkerData.id] != undefined) {
      delete cart[MarkerData.id];
    } else {
      cart[MarkerData.id] = MarkerData;
    }
    setCart(structuredClone(cart));
    console.log(cart);
  }

  return (
    <div className="card-item-main">
      <img src={MarkerData.img} width={200}></img>
      <div className="card-description">
        <span>{MarkerData.name} </span>
        <span>{MarkerData.mm} мм</span>
        <h2>{MarkerData.price}₽</h2>
      </div>
      <div className="Card-pos">
        <Link to={"/product"}>Подробнее</Link>
        <FaShoppingCart className={bucket} onClick={handleClick} />
        <FaHeart className={heart} onClick={heartClick} />
      </div>
    </div>
  );
}
