import "../styles/Category.css";
import { Link } from "react-router-dom";
import { FaSprayCan, FaMarker, FaTools } from "react-icons/fa";

export default function CategoryBlock() {
  const categories = [
    {
      title: "Маркеры",
      image: "./category/category-slide.png",
      link: "/Marker",
      icon: <FaMarker />,
      description: "Профессиональные маркеры для граффити",
    },
    {
      title: "Граффити",
      image: "./category/category-slide2.png",
      link: "/test",
      icon: <FaSprayCan />,
      description: "Краски и спреи для граффити",
    },
    {
      title: "Аксессуары",
      image: "./category/category-slide3.png",
      link: "/accessories",
      icon: <FaTools />,
      description: "Инструменты и аксессуары",
    },
  ];

  return (
    <section className="category-section">
      <div className="category-header">
        <h1>Категории товаров</h1>
      </div>
      <div className="category-container">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <div className="category-card-inner">
              <div className="category-image">
                <img src={category.image} alt={category.title} />
                <div className="category-overlay"></div>
              </div>
              <div className="category-content">
                <div className="category-icon">{category.icon}</div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <Link to={category.link} className="category-link">
                  Подробнее
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
