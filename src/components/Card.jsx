import "../styles/Card.css";
import { NewProductData } from "./data/NewProductData";
import { useContext } from "react";
import { CartContext } from "./data/CartContext.js";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { emplayss } from "./data/data.jsx";
import { Link } from "react-router-dom";

export default function CardMin() {
  return (
    <div className="container">
      <div className="card-menu">
        {emplayss.map((emplayss, index) => {
          return <Card emplayss={emplayss} key={index} />;
        })}
      </div>
    </div>
  );
}

export function Card({ emplayss }) {
  const { cart, setCart } = useContext(CartContext);

  let bucket = "bucket-icon";
  if (cart[emplayss.id] != undefined) {
    bucket += " active";
  }

  function handleClick() {
    if (cart[emplayss.id] != undefined) {
      delete cart[emplayss.id];
    } else {
      cart[emplayss.id] = emplayss;
    }
    setCart(structuredClone(cart));
    console.log(cart);
  }
  return (
    <div className="card-item">
      <img src={emplayss.img}></img>
      <div className="tag-new">Новинка</div>
      <div className="card-description">
        <span>Аэрозольная краска {emplayss.name} </span>
        <span>{emplayss.ml}мл</span>
        <h2>{emplayss.price} ₽</h2>
      </div>
      <div className="Card-pos">
        <Link to={"/product"}>Подробнее</Link>
        <FaShoppingCart className={bucket} onClick={handleClick} />
        <FaHeart className="heart-icon" />
      </div>
    </div>
  );
}
