import "../styles/Header.css";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { CartContext } from "./data/CartContext";

export default function Header() {
  const { cart } = useContext(CartContext);
  let [cartOpen, setCartOpen] = useState(false);

  function cliclOpen() {
    setCartOpen(true);
  }

  function clickClose() {
    setCartOpen(false);
  }

  return (
    <header>
      <nav className="navbar">
        <div className="hed">
          <FiMenu
            id="bur"
            className="js-burger-open burger-menu"
            onClick={cliclOpen}
          />
          <div className="header-logo">
            <Link to={"/"}>
              <img src="./logo.png"></img>
            </Link>
          </div>
        </div>
        <div className="header-info">
          <SideBar
            className={"js-burger" + (cartOpen ? " active" : "")}
            onClickClose={clickClose}
          />
        </div>
        <div className="header-icon">
          <Link to="/Order">
            <FaShoppingCart className="icon" />
          </Link>
          <p className="bucket-info-len">{Object.keys(cart).length}</p>
          <Link to="/bucket">
            <FaHeart className="icon" />
          </Link>
          <Link className="link-to-login" to={"/login"}>
            Войти
          </Link>
        </div>
      </nav>
    </header>
  );
}

function SideBar({ className, onClickClose }) {
  return (
    <ul id="open" className={"menu-links" + (className ? " " + className : "")}>
      <FiX className="header-fix js-burger-close" onClick={onClickClose} />
      <Link to={"/test"}>Граффити</Link>

      <Link to={"/Marker"}>Маркеры</Link>

      <Link to={"/accessories"}>Аксессуары</Link>

      <Link to={"/NewProduct"}>Новинки</Link>

      <Link to={"/SalePage"}>Скидки</Link>

      <Link to={"/Brand"}>Бренды</Link>
    </ul>
  );
}
