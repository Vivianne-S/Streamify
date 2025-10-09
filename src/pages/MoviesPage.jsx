import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/TmdbService";
import TopList from "../components/TopList";
import Header from "../components/Header";
import AllMoviesSection from "../components/AllMoviesSection";
import "../style/MoviePage.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPopularMovies()
      .then(setMovies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // 🎬 Sortera topplistan baserat på högst betyg
  const topRated = [...movies].sort((a, b) => b.voteAverage - a.voteAverage).slice(0, 10);

  return (
    <section className="movies-page">
      <Header />
      <TopList movies={topRated} />
      <AllMoviesSection movies={movies} />
    </section>
  );
}