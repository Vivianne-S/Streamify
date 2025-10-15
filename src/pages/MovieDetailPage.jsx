import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/TmdbService";
import Header from "../components/Header";
import LoadingState from "../components/LoadingState";
import ErrorMessage from "../components/ErrorMessage";
import backIcon from "../assets/backicone.png"; 
import "../style/MovieDetailPage.css";
import { useCart } from "../context/CartContext";

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const {addToCart} = useCart();

  useEffect(() => {
    console.log("Movie ID from URL:", id);
    
    if (id) {
      getMovieDetails(id)
        .then((movieData) => {
          console.log("Movie data received:", movieData);
          setMovie(movieData);
        })
        .catch((err) => {
          console.error("Error fetching movie details:", err);
          setError(err.message);
        })
        .finally(() => setLoading(false));
    } else {
      setError("No movie ID provided");
      setLoading(false);
    }
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    if(!movie) return;
    addToCart({
      id : movie.id,
      title :movie.title,
      image: movie.poster,
      price : movie.price

    })
    setAddedToCart(true);
    setTimeout(()=> setAddedToCart(false),2000);

  };

  
  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return <ErrorMessage message="Movie not found" />;

  return (
    <div className="movie-detail-page">
      <Header />
      
      <img 
        src={backIcon} 
        alt="Back" 
        className="back-icon-clickable"
        onClick={handleBackClick}
      />

      <div className="movie-detail-horizontal">
        <div className="movie-poster-section">
          {movie.poster ? (
            <img 
              src={movie.poster} 
              alt={movie.title} 
              className="movie-detail-poster"
            />
          ) : (
            <div className="movie-detail-poster placeholder">
              No image available
            </div>
          )}
        </div>

        <div className="movie-info-section">
          <h1 className="movie-detail-title">{movie.title} ({movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : ''})</h1>
          
          <div className="movie-meta-details">
            <span className="rating-badge">
              ⭐ {movie.voteAverage?.toFixed(1)}/10
            </span>
            <span className="popularity">
              Popularity: {movie.popularity?.toFixed(0)}
            </span>
          </div>

        
          <div className="genre-date-row">
            {movie.genres && movie.genres.length > 0 && (
              <div className="genres-list">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            
            <div className="release-date-info">
              <span className="release-date">
                📅 {formatDate(movie.releaseDate)}
              </span>
            </div>
          </div>

          <div className="movie-additional-info">
            <div className="info-item">
              <strong>Runtime:</strong>
              <span>{formatRuntime(movie.runtime)}</span>
            </div>
            <div className="info-item">
              <strong>Original Language:</strong>
              <span>{movie.originalLanguage?.toUpperCase() || 'N/A'}</span>
            </div>
            <div className="info-item">
              <strong>Vote Count:</strong>
              <span>{movie.voteCount || 0}</span>
            </div>
          </div>

        <div className="info-item">
           <strong>Price :   </strong>
            <span className="movie-price"> {movie.price} $</span>
          </div>

          {movie.overview && (
            <div className="movie-overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
          )}

          <div className="movie-actions">
            <div 
              className={`add-to-cart-text ${addedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {addedToCart ? '✓ Added to Cart!' : '🛒 ADD TO CART'}
            </div>
            {addedToCart && <div className="success-message">Item added successfully!</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
