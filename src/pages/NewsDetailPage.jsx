import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/NewsDetailPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Создаем экземпляр axios с настройками по умолчанию
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default function NewsDetailPage() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching news item with ID:", id);

        // Сначала получаем список всех новостей
        const response = await api.get("/news/data");
        console.log("Full news list response:", response);

        // Ищем нужную новость в списке
        const newsData = Array.isArray(response.data)
          ? response.data
          : response.data.data ||
            response.data.news ||
            response.data.items ||
            [];

        console.log("All news items:", newsData);

        const foundNews = newsData.find((item) => item.id === parseInt(id));
        console.log("Found news item:", foundNews);

        if (!foundNews) {
          throw new Error("Новость не найдена");
        }

        setNewsItem(foundNews);
      } catch (err) {
        console.error("Error fetching news detail:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchNewsItem();
    } else {
      setError("ID новости не указан");
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!newsItem) return <div className="error">Новость не найдена</div>;

  return (
    <div className="layout">
      <Header />
      <div className="bucket-path-cont">
        <Link to="/" className="bucket-path-des">
          GraffsShop
        </Link>
        <span className="bucket-path-sep">/</span>
        <Link to="/news" className="bucket-path-des">
          Новости
        </Link>
        <span className="bucket-path-sep">/</span>
        <span className="bucket-path-current">{newsItem.name}</span>
      </div>

      <div className="news-detail-page">
        <button className="brand-back-btn" onClick={() => navigate(-1)}>
          ← Назад
        </button>
        <article className="news-detail">
          <div className="news-detail-image">
            <img
              src={newsItem.img || "/images/no-image.jpg"}
              alt={newsItem.name}
              onError={(e) => {
                e.target.src = "/images/no-image.jpg";
                console.error("Error loading image for news:", newsItem);
              }}
            />
          </div>
          <div className="news-detail-content">
            <h1 className="news-detail-title">{newsItem.name}</h1>
            <div className="news-detail-description">
              {newsItem.description || "Описание отсутствует"}
            </div>
          </div>
        </article>
      </div>

      <Footer className="footer" />
    </div>
  );
}
