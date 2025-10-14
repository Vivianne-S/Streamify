import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(null);

  const addToCart = (movie) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === movie.id);
      if (exists) return prev; 
      return [...prev, movie];
    });
  };

  const saveCustomerInfo = (info) => {
    setCustomerInfo(info);
  };

  const clearCart = () => {
    setCartItems([]);
    setCustomerInfo(null);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, customerInfo, saveCustomerInfo, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
