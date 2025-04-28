import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/BrandsPage.css";
import { Link } from "react-router-dom";
import { useBrands } from "../hooks/useBrands";

export default function BrandPage() {
  const { brands, loading, error } = useBrands();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div className="main-brand">
      <Header />
      <Breadcrumbs />
      <BrandsList brands={brands} />
      <Footer />
    </div>
  );
}

// Подкомпоненты для читаемости
const LoadingSpinner = () => (
  <div className="skeleton-loading">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="skeleton-item">
        <div className="skeleton-image"></div>
        <div className="skeleton-text"></div>
      </div>
    ))}
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="error-message">
    <p>{message}</p>
    <button onClick={() => window.location.reload()}>Обновить</button>
  </div>
);

const Breadcrumbs = () => (
  <div className="bucket-path-cont">
    <Link to="/" className="bucket-path-des">
      GraffsShop
    </Link>
    <span className="bucket-path-sep">/</span>
    <Link to="/test" className="bucket-path-des">
      Каталог
    </Link>
    <span className="bucket-path-sep">/</span>
    <span className="bucket-path-current">Бренды</span>
  </div>
);

const BrandsList = ({ brands }) => (
  <div className="Brands-container">
    <div className="Brands-menu">
      {brands.map((brand) => (
        <BrandItem key={brand.id} brand={brand} />
      ))}
    </div>
  </div>
);

const BrandItem = ({ brand }) => (
  <div className="Brands-item">
    <div className="Brand-image">
      <Link to={`/BrandCardPage/${brand.id}`}>
        <img
          src={brand.img}
          alt={brand.name}
          onError={(e) => (e.target.src = "/images/default-brand.jpg")}
        />
      </Link>
    </div>
    <div className="Brand-discription">
      <h1>{brand.title}</h1>
      <span>{brand.description}</span>
    </div>
  </div>
);
