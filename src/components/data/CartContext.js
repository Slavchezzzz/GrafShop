import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  // Загрузка данных пользователя при инициализации
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Очистка корзины и избранного при выходе из аккаунта
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        if (!e.newValue) {
          // Если пользователь вышел (user удален из localStorage)
          setCart({});
          setFavorites([]);
          localStorage.removeItem('cart');
          localStorage.removeItem('favorites');
        } else {
          // Если пользователь вошел
          setUser(JSON.parse(e.newValue));
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Загрузка корзины и избранного при изменении пользователя
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem('cart');
      const savedFavorites = localStorage.getItem('favorites');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    }
  }, [user]);

  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Сохранение избранного в localStorage при изменении
  useEffect(() => {
    if (user) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const contextValue = useMemo(() => {
    const addToCart = (product) => {
      setCart((prev) => {
        if (prev[product.id]) {
          const newCart = { ...prev };
          delete newCart[product.id];
          return newCart;
        }
        return {
          ...prev,
          [product.id]: {
            ...product,
            quantity: 1,
          },
        };
      });
    };

    const removeFromCart = (productId) => {
      setCart((prev) => {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      });
    };

    const updateQuantity = (productId, quantity) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setCart((prev) => ({
        ...prev,
        [productId]: {
          ...prev[productId],
          quantity,
        },
      }));
    };

    const toggleFavorite = (productId) => {
      setFavorites((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );
    };

    return {
      cart,
      favorites,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleFavorite,
      isFavorite: (productId) => favorites.includes(productId),
      getCartTotal: () =>
        Object.values(cart).reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      clearCart: () => setCart({}),
    };
  }, [cart, favorites, user]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
