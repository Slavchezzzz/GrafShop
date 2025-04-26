import "../styles/Footer.css";
import { FaInstagramSquare, FaTelegram, FaFacebookSquare, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowUp, FaVk, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer>
      <section className="footer">
        <div className="container">
          <div className="footer-grid">
            {/* Логотип и бренд */}
            <div className="footer-brand simple">
              <img src="/logo.png" alt="Graffs Shop" className="footer-logo-simple" />
              <span className="footer-title">Graffs Shop</span>
            </div>
            {/* Контакты */}
            <div>
              <h4>Связаться с нами</h4>
              <ul>
                <li>
                  <FaMapMarkerAlt className="footer-contact-icon" />
                  <span>г. Москва, ул. Примерная, 12</span>
                </li>
                <li>
                  <FaPhone className="footer-contact-icon" />
                  <a href="tel:88007072545">8 800 707 25 45</a>
                </li>
                <li>
                  <FaEnvelope className="footer-contact-icon" />
                  <a href="mailto:graffsshop@gmail.com">graffsshop@gmail.com</a>
                </li>
              </ul>
            </div>
            {/* Информация */}
            <div>
              <h4>О магазине</h4>
              <ul>
                <li><a href="#">Главная страница</a></li>
                <li><a href="#">О компании</a></li>
                <li><a href="#">Отзывы клиентов</a></li>
                <li><a href="#">Контакты</a></li>
              </ul>
            </div>
            {/* Помощь */}
            <div>
              <h4>Помощь покупателю</h4>
              <ul>
                <li><a href="#">Как сделать заказ</a></li>
                <li><a href="#">Обмен и возврат</a></li>
                <li><a href="#">Оплата и доставка</a></li>
                <li><a href="#">Частые вопросы</a></li>
              </ul>
            </div>
            {/* Соцсети */}
            <div>
              <h4>Мы в соцсетях</h4>
              <div className="footer-icon">
                <a href="#" aria-label="ВКонтакте"><FaVk className="fot-icon" /></a>
                <a href="#" aria-label="Telegram"><FaTelegram className="fot-icon" /></a>
                <a href="#" aria-label="YouTube"><FaYoutube className="fot-icon" /></a>
              </div>
              <p className="footer-social-text">Подписывайтесь на нас, чтобы быть в курсе новинок и акций!</p>
            </div>
          </div>
          <div className="under-footer">
            <a href="#">Политика конфиденциальности</a>
            <p>© Graffs Shop, 2025. Все права защищены.</p>
            <button className="footer-up" onClick={scrollToTop} aria-label="Наверх">
              <FaArrowUp />
            </button>
          </div>
        </div>
      </section>
    </footer>
  );
}
