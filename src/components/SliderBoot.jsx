import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/SliderBoot.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ControlledCarousel() {
  const [slides, setSlides] = useState([]); // Состояние для хранения слайдов
  const [loading, setLoading] = useState(true); // Состояние для загрузки
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(null); // Состояние для ошибок

  // Обработчик выбора слайда
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Загрузка данных из API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get("http://localhost:8080/news/data"); // Замените на ваш API
        // Фильтруем слайды, оставляя только те, где is_new_marker === 1
        const filteredSlides = response.data.data.filter(
          (slide) => slide.is_new_marker === 1
        );
        setSlides(filteredSlides);
      } catch (error) {
        console.error("Ошибка при загрузке слайдов: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) {
    return <div>Загрузка слайдов...</div>; // Индикатор загрузки
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>; // Сообщение об ошибке
  }

  return (
    <div className="carusel">
      <Carousel activeIndex={index} onSelect={handleSelect} fade>
        {slides.length === 0 ? (
          <Carousel.Item>
            <div className="slider-block">
              <p>Нет слайдов с is_new_marker = 1.</p>
            </div>
          </Carousel.Item>
        ) : (
          slides.map((slide) => (
            <Carousel.Item key={slide.id} className="slider-block">
              <img src={slide.img} alt={slide.description} />
              <Carousel.Caption className="slider-text">
                <h3>{slide.name}</h3>
                <Link to={"/test"}>Подробнее</Link>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        )}
      </Carousel>
    </div>
  );
}
