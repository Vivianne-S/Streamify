import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function SearchBar {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const q = term.trim();
    if (!q) return;
    navigate(`/search?query=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={onSubmit} className="searchbar">
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder='Search for movies...'
        aria-label="Search..."
        />
      <button type="submit">Search</button>
    </form>
  );
}