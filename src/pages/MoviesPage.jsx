import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/TmdbService";
import TopList from "../components/TopList";
import Header from "../components/Header";
import AllMoviesSection from "../components/AllMoviesSection";
import "../style/MoviePage.css";
import SearchBar from "../components/SearchBar";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // search state

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

  // Filter movies based on search query
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="movies-page">
      <Header />
      <SearchBar onSearch={setSearchQuery} /> {/* Search bar component */}
      <TopList movies={topRated} />
      <AllMoviesSection movies={filteredMovies} /> {/* Filtered movies */}
    </section>
  );
}