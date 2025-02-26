import "../styles/Footer.css";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
    <footer>
      <section className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-6">
              <h4>Контакты</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="">Адреса магазинов</a>
                </li>
                <li>
                  <a href="tel:8 800 707 25 45 ">8 800 707 25 45</a>
                </li>
                <li>
                  <a href="">graffsshop@gmail.com</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h4>Информация</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="">Главная</a>
                </li>
                <li>
                  <a href="">О нас</a>
                </li>
                <li>
                  <a href="">Отзывы</a>
                </li>
                <li>
                  <a href="">Контакты</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h4>Помощь</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="">Как оформить заказ</a>
                </li>
                <li>
                  <a href="">Обмен и возврат</a>
                </li>
                <li>
                  <a href="">Оплата и доставка</a>
                </li>
                <li>
                  <a href="">Контакты</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h4>Мы в сети</h4>
              <div className="footer-icon">
                <FaFacebookSquare className="fot-icon" />
                <FaInstagramSquare className="fot-icon" />
                <FaTelegram className="fot-icon" />
              </div>
            </div>
          </div>
          <div className="under-footer">
            <a href="">Политика конфиденциальности</a>
            <p>© Graffs shop 2024</p>
          </div>
        </div>
      </section>
    </footer>
  );
}
