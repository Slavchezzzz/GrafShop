import "../styles/News.css";
import ControlledCarousel from "./SliderBoot";

export default function News() {
  return (
    <div className="News">
      <div className="page-card-news">
        <h1>Новости</h1>
      </div>
      <div className="container">
        {/* Большой блок */}
        <div className="big-news">
          <ControlledCarousel />
        </div>
        {/* Маленький блок */}
        <div className="small-news">
          <div className="article-wrap-small">
            <div className="article-avatar">
              <img src="../slide/slide10.jpg" alt="" />
            </div>
            <div className="article_text">
              <p>Дарим маркеры!</p>
              <a href="">Подробнее...</a>
            </div>
          </div>
          <div className="article-wrap-small">
            <div className="article-avatar">
              <img src="../slide/slide8.jpg" alt="" />
            </div>
            <div className="article_text">
              <p>SABOTAGE в GraffsShop</p>
              <a href="">Подробнее...</a>
            </div>
          </div>
          <div className="article-wrap-small">
            <div className="article-avatar">
              <img src="../slide/slide9.jpg" alt="" />
            </div>
            <div className="article_text">
              <p>Molotow и Flame по новой цене!</p>
              <a href="">Подробнее...</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
