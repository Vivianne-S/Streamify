import { useCart } from "../context/CartContext";
export default function CartList() {
   const { cartItems } = useCart();
   //Beräkning av filmpris
   const totalPrice = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  return (
     <aside className="cart-list">
      <div className="cart-list-header">
        <span className="cart-icon">🛒</span>
        <h2>Your Cart</h2>
      </div>

      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((movie) => (
            <div className="cart-item" key={movie.id}>
              <img src={movie.image} alt={movie.title} />
              <div className="cart-item-details">
                <p className="movie-title">{movie.title}</p>
                <p className="movie-price">{movie.price} $</p>
              </div>
            
            </div>
          ))
        )}
      </div>

      <div className="cart-total">
        <span>TOTAL:</span>
        <span>{totalPrice} $</span>
      </div>
    </aside>
  );
}
