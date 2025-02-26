import "../styles/Card.css";
import { dataCard } from "./data/dataCardPopular";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./data/CartContext.js";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

export default function CardPopular() {
  return (
    <div className="Card-info">
      <div className="card-menu">
        {dataCard.map((dataCard, index) => {
          return <Card dataCard={dataCard} key={index} />;
        })}
      </div>
    </div>
  );
}

export function Card({ dataCard }) {
  const { cart, setCart } = useContext(CartContext);

  let bucket = "bucket-icon";
  if (cart[dataCard.id] !== undefined) {
    bucket += " active";
  }

  function handleClick() {
    if (cart[dataCard.id] !== undefined) {
      delete cart[dataCard.id];
    } else {
      cart[dataCard.id] = dataCard;
    }
    setCart(structuredClone(cart));
    console.log(cart);
  }
  return (
    <div className="card-item">
      <img src={dataCard.img} width={200}></img>
      <div className="card-description">
        <span>Аэрозольная краска {dataCard.name} </span>
        <span>{dataCard.ml} мл</span>
        <h2>{dataCard.price} ₽</h2>
      </div>
      <div className="Card-pos">
        <Link to={"/product"}>Подробнее</Link>
        <FaShoppingCart className={bucket} onClick={handleClick} />
        <FaHeart className="heart-icon" />
      </div>
    </div>
  );
}
