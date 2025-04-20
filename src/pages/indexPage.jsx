import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import "../styles/indexPage.css";
import Footer from "../components/Footer.jsx";
import Infinity from "../components/InfinitySlider.jsx";
import HeaderPhoto from "../components/HeaderPhoto.jsx";
import News from "../components/News.jsx";
import CategoryBlock from "../components/CategoryBlock.jsx";
import MainCard from "../components/MainCard.jsx";
import { ProductsContext } from "../components/contexts/ProductsContext.js";

export default function IndexPage() {
  const { products, isLoading, error } = useContext(ProductsContext);
  const [newProductsPage, setNewProductsPage] = useState(1);
  const [popularProductsPage, setPopularProductsPage] = useState(1);
  const productsPerSection = 4;

  // Фильтрация новинок
  const newProducts = products.filter((product) => product.is_new);
  const newProductsIndex = newProductsPage * productsPerSection;
  const currentNewProducts = newProducts.slice(
    newProductsIndex - productsPerSection,
    newProductsIndex
  );

  // Фильтрация популярных товаров
  const popularProducts = products.filter((product) => product.is_popular);
  const popularProductsIndex = popularProductsPage * productsPerSection;
  const currentPopularProducts = popularProducts.slice(
    popularProductsIndex - productsPerSection,
    popularProductsIndex
  );

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error.message}</div>;

  return (
    <div className="layout">
      <Header />
      <HeaderPhoto />
      <div className="container">
        <main className="Page">
          {/* Секция новинок */}
          <div className="page-card">
            <CategoryBlock />
            <div className="page-card-info-product">
              <h1>Новые поступления</h1>
            </div>
            <MainCard products={currentNewProducts} />
          </div>

          {/* Бесконечный слайдер */}
          <div className="page-card">
            <Infinity />
          </div>

          {/* Секция популярных товаров */}
          <div className="page-card">
            <div className="page-card-info-product">
              <h1>Популярные товары</h1>
            </div>
            <MainCard products={currentPopularProducts} />
          </div>

          {/* Новости */}
          <div className="page-card">
            <News />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
