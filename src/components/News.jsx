import "../styles/News.css";
import ControlledCarousel from "./SliderBoot";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

export default function News() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/news/data");
        // Фильтруем данные, оставляя только те, где is_new_marker === 0
        const filteredData = response.data.data.filter(
          (item) => item.is_new_marker === 0
        );
        setData(filteredData);
      } catch (error) {
        console.log("Ошибка при получении данных: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загрузка новостей...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Ошибка: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="news-section">
      <div className="page-card-news">
        <h1>Новости</h1>
      </div>
      <div className="news-container">
        {/* Большой блок */}
        <div className="featured-news">
          <ControlledCarousel />
        </div>
        {/* Маленький блок */}
        <div className="news-grid">
          {data.length === 0 ? (
            <div className="no-news">
              <p>Нет доступных новостей</p>
            </div>
          ) : (
            data.map((item) => (
              <article key={item.id} className="news-card">
                <div className="news-card-image">
                  <img src={item.img} alt={item.name} />
                  <div className="news-card-overlay"></div>
                </div>
                <div className="news-card-content">
                  <div className="news-meta">
                    <span className="news-date">
                      <FaCalendarAlt /> {item.date || 'Без даты'}
                    </span>
                  </div>
                  <h3 className="news-title">{item.name}</h3>
                  <a href={`/news/${item.id}`} className="read-more">
                    Подробнее <FaArrowRight />
                  </a>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
