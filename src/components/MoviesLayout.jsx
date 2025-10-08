import Header from "./Header";
import TopList from "./TopList";
import AllMoviesSection from "./AllMoviesSection";

export default function MoviesLayout({ movies }) {
  const topRated = [...movies].sort((a, b) => b.voteAverage - a.voteAverage).slice(0, 10);

  return (
    <>
      <Header />
      <TopList movies={topRated} />
      <AllMoviesSection />
    </>
  );
}