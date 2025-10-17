import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { searchMovies } from "../services/TmdbService";
import Header from "../components/Header";
import backIcon from "../assets/backicone.png";
import "../style/SearchPage.css";

export default function SearchPage() {
  // read query params from the URL, e.g. /search?q=batman
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";

  // local state for async search: loading / error / data
  const [state, setState] = useState({ loading: false, error: "", data: null });
  const navigate = useNavigate();

  // handleBack: go back in history if possible, otherwise go home
  function handleBack() {
    // if there's history, go back, else go to home
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  }

  // Run search whenever the "q" query param changes.
  // Uses a cancellation flag to avoid updating state after unmount or when a later request started.
  useEffect(() => {
    let cancelled = false;

    async function run() {
      const term = q.trim();
      if (!term) return; // nothing to search for

      setState({ loading: true, error: "", data: null });

      try {
        const data = await searchMovies(term); // async call to TMDb service
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

    // cleanup: mark cancelled so slow responses don't call setState
    return () => {
      cancelled = true;
    };
  }, [q]);

  // Render guards: return early for empty query / loading / error / no results
  if (!q.trim()) return <p>Please enter a search term.</p>;
  if (state.loading) return <p>Searching for "{q}"...</p>;
  if (state.error) return <p style={{ color: "red" }}>Error: {state.error}</p>;

  const results = state.data?.results ?? [];
  if (!results.length) {
    // show header + back button even when there are no results
    return (
      <section className="search-page">
        {/* Site header */}
        <Header />

        {/* Centered no-results message with back button */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <p>No results found for "{q}".</p>
          <button
            type="button"
            className="back-btn"
            onClick={handleBack}
            aria-label="Go back"
            title="Back"
            style={{ marginTop: "1.5rem" }}
          >
            <img src={backIcon} alt="Back" width={28} height={28} />
            Back
          </button>
        </div>
      </section>
    );
  }

  // Normal render: header, toolbar with back button, and grid of results
  return (
    <section className="search-page">
      {/* Site header */}
      <Header />

      {/* Page toolbar containing a back button */}
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

      {/* Grid of search results */}
      <ul className="search-results-grid">
        {results.map((m) => (
          <li key={m.id} className="search-result-card">
            <Link to={`/movie/${m.id}`} className="movie-card-link">
              {/* Poster or fallback box when poster is missing */}
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

              {/* Title and meta info */}
              <h3 className="search-result-title">{m.title}</h3>
              <p className="search-result-meta">
                {(m.releaseDate || "").slice(0, 4) || "unknown"} • ⭐{" "}
                {typeof m.voteAverage === "number" ? m.voteAverage.toFixed(1) : "-"}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}