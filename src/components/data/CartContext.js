import { createContext, useState, useMemo } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);

  const contextValue = useMemo(() => {
    const addToCart = (product) => {
      setCart((prev) => ({
        ...prev,
        [product.id]: {
          ...product,
          quantity: (prev[product.id]?.quantity || 0) + 1,
        },
      }));
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

    return {
      cart,
      favorites,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleFavorite: (productId) => {
        setFavorites((prev) =>
          prev.includes(productId)
            ? prev.filter((id) => id !== productId)
            : [...prev, productId]
        );
      },
      isFavorite: (productId) => favorites.includes(productId),
      getCartTotal: () =>
        Object.values(cart).reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      clearCart: () => setCart({}),
    };
  }, [cart, favorites]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
