import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/NewsPage.css';
import axios from 'axios';

// Создаем экземпляр axios с настройками по умолчанию
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/news/data');
        console.log('Full response:', response);
        console.log('Response data type:', typeof response.data);
        console.log('Response data:', response.data);
        
        // Проверяем, является ли data массивом или объектом с массивом внутри
        const newsData = Array.isArray(response.data) 
          ? response.data 
          : response.data.data || response.data.news || response.data.items || [];
        
        console.log('Processed news data:', newsData);
        console.log('Available news IDs:', newsData.map(item => item.id));
        console.log('First news item structure:', newsData[0]);
        
        // Проверяем структуру каждого элемента
        newsData.forEach((item, index) => {
          console.log(`News item ${index + 1}:`, {
            id: item.id,
            name: item.name,
            img: item.img,
            description: item.description,
            is_new_marker: item.is_new_marker
          });
        });

        if (newsData.length > 0) {
          setNews(newsData);
        } else {
          throw new Error('Нет данных для отображения');
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!news.length) return <div className="no-news">Новости не найдены</div>;

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
      </div>

      <div className="news-page">
        {/* <h1 className="news-title">Новости</h1> */}
        <div className="news-grid">
          {news.map((item) => {
            console.log('Rendering news item:', item);
            return (
              <div key={item.id} className="news-card">
                <div className="news-card-image">
                  <img 
                    src={item.img || '/images/no-image.jpg'} 
                    alt={item.name} 
                    onError={(e) => {
                      e.target.src = '/images/no-image.jpg';
                      console.error('Error loading image for news:', item);
                    }}
                  />
                </div>
                <div className="news-card-content">
                  <h2 className="news-card-title">{item.name}</h2>
                  <Link to={`/news/${item.id}`} className="read-more">
                    Подробнее
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer className="footer" />
    </div>
  );
} 