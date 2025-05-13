import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get("http://localhost:8080/products/data", {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      // Проверяем структуру ответа и извлекаем массив продуктов
      const productsData = response.data?.data || response.data || [];

      console.log('Raw product data:', productsData[0]); // Лог первого продукта
      console.log('is_new_products value:', productsData[0]?.is_new_products); // Лог значения is_new_products

      setProducts(
        productsData.map((product) => {
          const mappedProduct = {
            id: product.id,
            title: product.title,
            price: product.price,
            old_price: product.old_price || 0,
            img: product.img,
            ml: product.ml,
            is_new_products: product.is_new_products,
            is_popular: product.is_popular,
            category_id: product.category_id,
            category_title: product.category_title,
            brand_id: product.brand_id,
            brand_title: product.brand_title,
            descriptions: product.descriptions || "",
          };
          console.log('Mapped product:', mappedProduct); // Лог преобразованного продукта
          return mappedProduct;
        })
      );
    } catch (err) {
      console.error("Ошибка загрузки товаров:", err);
      setError({
        message:
          err.response?.data?.message ||
          "Не удалось загрузить товары. Проверьте соединение с сервером.",
        status: err.response?.status,
        details: err.message,
      });
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductsByCategory = (categoryId) =>
    products.filter((p) => p.category_id === categoryId);

  const getPopularProducts = () => products.filter((p) => p.is_popular);

  const getNewProducts = () => products.filter((p) => p.is_new_products);

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        error,
        getProductsByCategory,
        getPopularProducts,
        getNewProducts,
        refreshProducts: fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
