import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { searchMovies } from "../services/TmdbService";
import Header from "../components/Header";
import backIcon from "../assets/backicone.png";
import "../style/SearchPage.css";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const [state, setState] = useState({ loading: false, error: "", data: null });
  const navigate = useNavigate(); // for the back button

  function handleBack() {
    // if there's history, go back, else go to home
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  }

  useEffect(() => {
    let cancelled = false;
    async function run() {
      const term = q.trim();
      if (!term) return;
      setState({ loading: true, error: "", data: null });
      try {
        const data = await searchMovies(term);
        if (!cancelled) setState({ loading: false, error: "", data });
      } catch (err) {
        if (!cancelled)
          setState({
            loading: false,
            error: err?.message || "Error fetching data.",
            data: null,
          });
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [q]);

  if (!q.trim()) return <p>Please enter a search term.</p>;
  if (state.loading) return <p>Searching for "{q}"...</p>;
  if (state.error) return <p style={{ color: "red" }}>Error: {state.error}</p>;
  
  const results = state.data?.results ?? [];
  if (!results.length) return <p>No results found for "{q}".</p>;

   return (
    <section className="search-page">
      <Header />
      <div className="page-toolbar">
        <button
          type="button"
          className="back-btn icon"
          onClick={handleBack}
          aria-label="Go back"
          title="Back"
        >
          <img src={backIcon} alt="Back" width={28} height={28} />
        </button>
      </div>
      <ul className="search-results-grid">
        {results.map((m) => (
          <li key={m.id} className="search-result-card">
            <Link to={`/movie/${m.id}`} className="movie-card-link">
              {m.poster ? (
                <img src={m.poster} alt={m.title} className="search-result-poster" />
              ) : (
                <div
                  className="search-result-poster"
                  style={{ display: "grid", placeItems: "center" }}
                >
                  No Poster available
                </div>
              )}
              <h3 className="search-result-title">{m.title}</h3>
              <p className="search-result-meta">
                {(m.releaseDate || "").slice(0, 4) || "unknown"} • ⭐{" "}
                {typeof m.voteAverage === "number"
                  ? m.voteAverage.toFixed(1)
                  : "-"}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}