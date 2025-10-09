export default function CartList() {
  const movies = [
    {
      title: "The Conjuring (Fake)",
      price: "4.99",
      image: "https://picsum.photos/seed/conjuring/200/300",
    },
    {
      title: "Tron: Neon (Fake)",
      price: "4.99",
      image: "https://picsum.photos/seed/tron/200/300",
    },
    {
      title: "Galactic Rift (Fake)",
      price: "4.99",
      image: "https://picsum.photos/seed/rift/200/300",
    },
  ];

  return (
    <aside className="cart-list">
      <div className="cart-list-header">
        <span className="cart-icon">🛒</span>
        <h2>Your Cart</h2>
      </div>

      <div className="cart-items">
        {movies.map((movie, index) => (
          <div className="cart-item" key={index}>
            <img src={movie.image} alt={movie.title} />
            <div className="cart-item-details">
              <p className="movie-title">{movie.title}</p>
              <p className="movie-price">{movie.price} $</p>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <span>TOTAL:</span>
        <span>14.97 $</span>
      </div>
    </aside>
  );
}
