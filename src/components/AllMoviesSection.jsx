import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { getPopularMovies, getGenres, getMoviesByGenre } from "../services/TmdbService";

export default function AllMoviesSection() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadMovies(1);
    getGenres().then(setGenres).catch(console.error);
  }, []);

  const loadMovies = async (pageNumber, genreId = selectedGenre) => {
    try {
      setLoading(true);
      let newMovies;

      if (genreId) newMovies = await getMoviesByGenre(genreId, pageNumber);
      else newMovies = await getPopularMovies(pageNumber);

      if (newMovies.length === 0 || pageNumber >= 10) {
        setHasMore(false);
        return;
      }

      setMovies(pageNumber === 1 ? newMovies : (prev) => [...prev, ...newMovies]);
    } catch (err) {
      console.error("Could not fetch movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);
    setPage(1);
    setHasMore(true);
    loadMovies(1, genreId);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage);
  };

  return (
    <section className="all-movies-section">
      <div className="section-header">
        <h2 className="section-title">All Movies</h2>
        <select className="genre-dropdown" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>

      <div className="movie-grid">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      {hasMore && !loading && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load more
        </button>
      )}

      {loading && <p className="loading-text">⏳ Loading movies...</p>}
    </section>
  );
}