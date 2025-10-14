import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

 const [cartItems, setCartItems] = useState(() => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("❌ Error parsing cart from localStorage:", error);
    localStorage.removeItem("cart"); 
    return [];
  }
});


  useEffect(() => {
    localStorage.setItem("cart" , JSON.stringify(cartItems));
  } , [cartItems]);

  const addToCart = (movie) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === movie.id);
      if (exists) return prev; 
      return [...prev, movie];
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
