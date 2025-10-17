import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function SearchBar() {
  // Local state for the input's current value
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();     // Stop the browser's default form submit + page reload   
    const q = query.trim();
    if (!q) return;         // prevent empty searches
    navigate(`/search?q=${encodeURIComponent(q)}`); // Go to search page with query param and make it URL-safe
  }

  return (
    <form onSubmit={onSubmit} className="searchbar">
      <input
        type="search"     // Enables native "clear" UI on some browsers
        value={query}
        onChange={(e) => setQuery(e.target.value)}    // Update state on each keystroke
        placeholder='Search for movies...'
        aria-label="Search..."
        />
      <button type="submit" disabled={!query.trim()}>    {/* Submit or disable button for empty/whitespace-only queries */}
        Search
      </button>
    </form>
  );
}