import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useCart } from "../components/data/CartContext";

export default function Header() {
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Функция для получения данных пользователя
    const getUserData = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        console.log('User data from localStorage:', parsedUser);
        setUser(parsedUser);
      }
    };

    // Получаем данные при первой загрузке
    getUserData();

    // Добавляем слушатель события изменения localStorage
    window.addEventListener('storage', (e) => {
      if (e.key === 'user') {
        getUserData();
      }
    });

    // Очищаем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener('storage', getUserData);
    };
  }, []);

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
              <img src="/logo.png" alt="Logo" />
            </Link>
          </div>
        </div>
        <div className="header-info">
          <SideBar
            className={"js-burger" + (cartOpen ? " active" : "")}
            onClickClose={clickClose}
            user={user}
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
          {user ? (
            <Link to="/profile" className="user-name">
              {user.login}
            </Link>
          ) : (
            <Link to="/login" className="link-to-login">
              Войти
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

function SideBar({ className, onClickClose, user }) {
  return (
    <ul id="open" className={"menu-links" + (className ? " " + className : "")}>
      <FiX className="header-fix js-burger-close" onClick={onClickClose} />
      <Link to={"/test"}>Граффити</Link>
      <Link to={"/NewProduct"}>Новинки</Link>
      <Link to={"/SalePage"}>Скидки</Link>
      <Link to={"/Brand"}>Бренды</Link>
      <Link to={"/news"}>Новости</Link>
    </ul>
  );
}

