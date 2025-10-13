import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;         // prevent empty searches
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={onSubmit} className="searchbar">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search for movies...'
        aria-label="Search..."
        />
      <button type="submit">Search</button>
    </form>
  );
}