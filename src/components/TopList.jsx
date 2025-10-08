import { useRef } from "react";
import MovieCard from "./MovieCard";

export default function TopList({ movies }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="toplist-section">
      <div className="toplist-header">
        <h2>Toplist</h2>
      </div>

      <button className="toplist-arrow left" onClick={() => scroll("left")}>◀</button>
      <button className="toplist-arrow right" onClick={() => scroll("right")}>▶</button>

      <div className="toplist-container" ref={scrollRef}>
        {movies.slice(0, 10).map((m) => (
          <div className="toplist-item" key={m.id}>
            <MovieCard movie={m} />
          </div>
        ))}
      </div>
    </section>
  );
}