import "../styles/News.css";
import ControlledCarousel from "./SliderBoot";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
    return <div>Загрузка...</div>; // Отображаем индикатор загрузки
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>; // Отображаем сообщение об ошибке
  }

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
          {data.length === 0 ? (
            <div>Нет новостей с is_new_marker = 0.</div>
          ) : (
            data.map((item) => (
              <div key={item.id} className="article-wrap-small">
                <div className="article-avatar">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="article_text">
                  <p>{item.name}</p>
                  <a href="">Подробнее...</a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
