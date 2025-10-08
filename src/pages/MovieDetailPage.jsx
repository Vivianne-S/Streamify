import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/TmdbService";
import Header from "../components/Header";
import LoadingState from "../components/LoadingState";
import ErrorMessage from "../components/ErrorMessage";
import backIcon from "../assets/backicone.png"; 

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

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
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    // add logick to addtocart 
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
           <div className="info-item">
             
              <span>{movie.releaseDate || 'Not available'}</span>
            </div>
            <div className="info-item">
              
              <span>{movie.originalLanguage?.toUpperCase() || 'N/A'}</span>
            </div>
            <div className="info-item">
              <strong>Vote Count:</strong>
              <span>{movie.voteCount || 0}</span>
            </div>

          <div className="movie-price-section">
            <span className="movie-price">499 $</span>
          </div>

          {movie.overview && (
            <div className="movie-overview">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
          )}

          <div className="movie-additional-info">
           
          </div>

         <div className="add-to-cart-text">
  {addedToCart ? '✓ Added to Cart!' : '🛒 ADD TO CART'}
</div>
{addedToCart && <div className="success-message">Item added successfully!</div>}

        </div>
      </div>
    </div>
  );
}