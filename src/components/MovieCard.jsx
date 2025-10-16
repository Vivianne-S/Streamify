import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import "../style/MoviePage.css";

export default function MovieCard({ movie }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart({
      id: movie.id,
      title: movie.title,
      price: movie.price || 9.99,
      image: movie.poster,
    });

    // Show feedback that movie was added for 2 seconds
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="movie-card-wrapper">
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-card">
          {movie.poster ? (
            <img src={movie.poster} alt={movie.title} className="poster" />
          ) : (
            <div className="poster placeholder">No image</div>
          )}

          {/* Add to cart button on movie posters */}
          <button
            className="add-to-cart-btn"
            onClick={handleAdd}
            title="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>

          {/* Added to cart popup when adding movie to cart */}
          {added && <span className="added-popup">Added to cart!</span>}

          <h3>{movie.title}</h3>
          <p className="movie-meta">
            ⭐ {movie.voteAverage?.toFixed(1)} • {movie.releaseDate?.slice(0, 4)}
          </p>
        </div>
      </Link>
    </div>
  );
}