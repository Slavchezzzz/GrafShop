import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../components/contexts/ProductsContext.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MainCard from "../components/MainCard.jsx";
import "../styles/testPage.css";

export default function MarkerPage() {
  const { products, isLoading, error } = useContext(ProductsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productsPerPage = 8;

  // Фильтрация продуктов при изменении products
  useEffect(() => {
    const filtered = products.filter((product) => product.category_id === 2);
    setFilteredProducts(filtered);
    setCurrentPage(1); // Сброс на первую страницу при изменении фильтра
  }, [products]);

  // Пагинация
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error.message}</div>;

  return (
    <div className="layout">
      <Header />
      <div className="bucket-path-cont">
        <Link to="/" className="bucket-path-des">
          GraffsShop
        </Link>
        <span className="bucket-path-sep">/</span>
        <Link to="/test" className="bucket-path-des">
          Каталог
        </Link>
        <span className="bucket-path-sep">/</span>
        <span className="bucket-path-current">Маркеры</span>
      </div>

      <div className="Page-graf">
        <MainCard products={currentProducts} />

        {filteredProducts.length > productsPerPage && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Назад
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Вперед
            </button>
          </div>
        )}
      </div>

      <Footer className="footer" />
    </div>
  );
}
