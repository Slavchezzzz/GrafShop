import { useState, useEffect, useContext, useRef } from "react";
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

  // refs для секций
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    sectionRefs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, [sectionRefs]);

  // Фильтрация новинок
  const newProducts = products.filter((product) => product.is_new_products);
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
          <div className="page-card" ref={sectionRefs[0]}>
            <CategoryBlock />
            <div className="page-card-info-product">
              <h1>Новые поступления</h1>
            </div>
            <MainCard products={currentNewProducts} />
          </div>
          <div className="page-card" ref={sectionRefs[1]}>
            <Infinity />
          </div>
          <div className="page-card page-card-popular" ref={sectionRefs[2]}>
            <div className="page-card-info-product">
              <h1>Популярные товары</h1>
            </div>
            <MainCard products={currentPopularProducts} />
          </div>
          <div className="page-card" ref={sectionRefs[3]}>
            <News />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
