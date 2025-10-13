import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchMovies } from "../services/TmdbService";
// import "../style/SearchPage.css"; // Optional: Add specific styles for SearchPage

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const [state, setState] = useState({ loading: false, error: "", data: null });


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
            if (!cancelled) setState({ loading: false, error: err?.message || "Error fetching data.", data: null });
        }
    }
    run();
    return () => { cancelled = true; };
  }, [q]);
  
  if (!q.trim()) return <p>Please enter a search term.</p>;
  if (state.loading) return <p>Searching for "{q}"...</p>;
  if (state.error) return <p style={{ color: "red" }}>Error: {state.error}</p>;
  if (!state.data || state.data.results.length === 0) return <p>No results found for "{q}".</p>; 

  const results = state.data?.results ?? [];
  if (!results.length) return <p>No results found for "{q}".</p>;

  return (
    <>
        <Header />
        <ul style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1rem"}}>
            {results.map((m) => (
                <li key={m.id} className="movie-card">
                    <Link to={`/movie/${m.id}`} className="movie-card-link">
                        {m.poster
                            ? <img src={m.poster} alt={m.title} className="movie-poster" />
                            : <div className="poster" style={{display:"grid", placeItems:"center"}}>No Poster available</div>
                        }
                        <h3>{m.title}</h3>
                        <p className="movie-meta">
                            {(m.releaseDate || "").slice(0, 4) || "unknown"} • ⭐{" "}
                            {typeof m.voteAverage === "number" ? m.voteAverage.toFixed(1) : "-"}
                        </p>
                    </Link>
                </li>
            ))}
        </ul>
    </>
  );
}
