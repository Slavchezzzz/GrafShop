import { useState, useEffect, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../components/contexts/ProductsContext.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MainCard from "../components/MainCard.jsx";
import CatalogFilters from "../components/CatalogFilters";
import "../styles/testPage.css";

export default function TestPage() {
  const { products, isLoading, error } = useContext(ProductsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [showNewProducts, setShowNewProducts] = useState(false);
  const productsPerPage = 8;

  // Получаем уникальные категории
  const categories = useMemo(() => {
    const uniqueCategories = new Map();
    products.forEach((product) => {
      if (product.category_id && !uniqueCategories.has(product.category_id)) {
        uniqueCategories.set(product.category_id, {
          id: product.category_id,
          category_title: product.category_title
        });
      }
    });
    return Array.from(uniqueCategories.values());
  }, [products]);

  // Получаем уникальные бренды
  const brands = useMemo(() => {
    const uniqueBrands = new Map();
    products.forEach((product) => {
      if (product.brand_id && !uniqueBrands.has(product.brand_id)) {
        uniqueBrands.set(product.brand_id, {
          id: product.brand_id,
          brand_title: product.brand_title
        });
      }
    });
    return Array.from(uniqueBrands.values());
  }, [products]);

  // Фильтрация и сортировка продуктов
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Применяем фильтры
    result = result.filter((product) => {
      const matchesSearch = searchTerm === "" || 
        (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      const matchesCategory = selectedCategory === "all" || product.category_title === selectedCategory;
      const matchesBrand = selectedBrand === "all" || product.brand_title === selectedBrand;
      const matchesNewProducts = !showNewProducts || product.is_new_products === 1;
      
      return matchesSearch && matchesPrice && matchesCategory && matchesBrand && matchesNewProducts;
    });

    // Применяем сортировку
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => {
          const titleA = a.title || "";
          const titleB = b.title || "";
          return titleA.localeCompare(titleB);
        });
        break;
      case "name-desc":
        result.sort((a, b) => {
          const titleA = a.title || "";
          const titleB = b.title || "";
          return titleB.localeCompare(titleA);
        });
        break;
      default:
        // По умолчанию - без сортировки
        break;
    }

    return result;
  }, [products, searchTerm, priceRange, selectedCategory, selectedBrand, sortBy, showNewProducts]);

  // Пагинация
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Сброс на первую страницу при изменении фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, priceRange, selectedCategory, selectedBrand, sortBy, showNewProducts]);

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
        <span className="bucket-path-current">Граффити</span>
      </div>

      <div className="Page-graf">
        {/* Фильтры */}
        <CatalogFilters
          onSearch={setSearchTerm}
          onPriceFilter={setPriceRange}
          onCategoryFilter={setSelectedCategory}
          onBrandFilter={setSelectedBrand}
          onSortChange={setSortBy}
          onNewProductsFilter={setShowNewProducts}
          categories={categories}
          brands={brands}
          minPrice={0}
          maxPrice={100000}
        />

        {/* Количество найденных товаров */}
        <div className="products-count">
          Найдено товаров: {filteredProducts.length}
        </div>

        {/* Список товаров */}
        <MainCard products={currentProducts} />

        {/* Пагинация */}
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
