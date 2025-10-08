import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/TmdbService";
import MoviesLayout from "../components/MoviesLayout";
import LoadingState from "../components/LoadingState";
import ErrorMessage from "../components/ErrorMessage";

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

  if (loading) return <LoadingState />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="movies-page">
      <MoviesLayout movies={movies} />
    </section>
  );
}