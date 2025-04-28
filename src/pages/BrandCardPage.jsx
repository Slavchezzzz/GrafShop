import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ProductsContext } from "../components/contexts/ProductsContext.js";
import { useBrands } from "../hooks/useBrands";
import MainCard from "../components/MainCard";
import "../styles/BrandCard.Page.css";

export default function BrandCardPage() {
  const { brandId } = useParams();
  const { products, isLoading } = useContext(ProductsContext);
  const { brands } = useBrands();
  const navigate = useNavigate();

  // Найти бренд по id
  const brand = brands.find((b) => String(b.id) === String(brandId));
  // Фильтровать товары по brand_id
  const brandProducts = products.filter((p) => String(p.brand_id) === String(brandId));

  if (isLoading || brands.length === 0) {
    return <div className="loading">Загрузка...</div>;
  }
  if (!brand) {
    return <div className="error">Бренд не найден</div>;
  }

  return (
    <div className="layout">
      <Header />
      <div className="brand-card-container">
        <button className="brand-back-btn" onClick={() => navigate(-1)}>
          ← Назад
        </button>
        <div className="brand-header">
          <img src={brand.img} alt={brand.title} className="brand-logo" />
          <div>
            <h1>{brand.title}</h1>
            <p>{brand.description}</p>
          </div>
        </div>
        <h2 className="brand-products-title">Товары бренда {brand.title}</h2>
        <MainCard products={brandProducts} />
      </div>
      <Footer />
    </div>
  );
}
