export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      {movie.poster ? (
        <img src={movie.poster} alt={movie.title} className="poster" />
      ) : (
        <div className="poster placeholder">No image</div>
      )}

      <h3>{movie.title}</h3>
      <p className="movie-meta">
        ⭐ {movie.voteAverage?.toFixed(1)} • {movie.releaseDate?.slice(0, 4)}
      </p>
    </div>
  );
}