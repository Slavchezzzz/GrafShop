import React, { useState } from 'react';
import '../styles/CatalogFilters.css';

const CatalogFilters = ({ 
  onSearch, 
  onPriceFilter, 
  onCategoryFilter,
  onSortChange,
  onNewProductsFilter,
  onBrandFilter,
  categories,
  brands,
  minPrice,
  maxPrice
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({
    min: minPrice || 0,
    max: maxPrice || 100000
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [showNewProducts, setShowNewProducts] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const newPriceRange = {
      ...priceRange,
      [name]: parseInt(value)
    };
    setPriceRange(newPriceRange);
    onPriceFilter(newPriceRange);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onCategoryFilter(value);
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    setSelectedBrand(value);
    onBrandFilter(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSortChange(value);
  };

  const handleNewProductsChange = (e) => {
    const value = e.target.checked;
    setShowNewProducts(value);
    onNewProductsFilter(value);
  };

  return (
    <div className="catalog-filters">
      <div className="filters-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="sort-container">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="default">По умолчанию</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
            <option value="name-asc">Название: А-Я</option>
            <option value="name-desc">Название: Я-А</option>
          </select>
        </div>
      </div>

      <div className="filters-container">
        <div className="price-filter">
          <h3>Цена</h3>
          <div className="price-inputs">
            <input
              type="number"
              name="min"
              value={priceRange.min}
              onChange={handlePriceChange}
              placeholder="От"
              min="0"
            />
            <span>-</span>
            <input
              type="number"
              name="max"
              value={priceRange.max}
              onChange={handlePriceChange}
              placeholder="До"
              min="0"
            />
          </div>
        </div>

        <div className="category-filter">
          <h3>Категория</h3>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            <option value="all">Все категории</option>
            {categories.map((category) => (
              <option key={category.id} value={category.category_title}>
                {category.category_title}
              </option>
            ))}
          </select>
        </div>

        <div className="brand-filter">
          <h3>Бренд</h3>
          <select
            value={selectedBrand}
            onChange={handleBrandChange}
            className="brand-select"
          >
            <option value="all">Все бренды</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.brand_title}>
                {brand.brand_title}
              </option>
            ))}
          </select>
        </div>

        <div className="new-products-filter">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showNewProducts}
              onChange={handleNewProductsChange}
              className="checkbox-input"
            />
            <span className="checkbox-text-inp">Новинки</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CatalogFilters; 