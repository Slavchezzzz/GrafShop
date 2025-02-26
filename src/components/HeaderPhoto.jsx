import "../styles/HeaderPhoto.css";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function HeaderPhoto() {
  return (
    <div>
      <div className="header-main">
        <div className="header-main-text">
          <h1>Graffs Shop</h1>
          <h3>Твори без ограничений – оживи мир цветом!</h3>
          <Link to={"/test"}>Каталог</Link>
        </div>
      </div>
    </div>
  );
}
