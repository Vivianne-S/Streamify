// src/services/TmdbService.js
const BASE = import.meta.env.VITE_TMDB_BASE;
const KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMG = import.meta.env.VITE_TMDB_IMG;

/** 🔹 Formaterar filmobjekt från TMDb till vårt eget schema */
function toMovie(dto) {
  console.log("Processing movie data:", dto);
  return {
    id: dto.id,
    title: dto.title,
    overview: dto.overview,
    poster: dto.poster_path ? `${IMG}${dto.poster_path}` : null,
    releaseDate: dto.release_date,
    voteAverage: dto.vote_average,
    popularity: dto.popularity,
    voteCount: dto.vote_count,
    originalLanguage: dto.original_language,
  };
}

/** 🎬 Hämta populära filmer */
export async function getPopularMovies(page = 1) {
  const res = await fetch(`${BASE}/movie/popular?api_key=${KEY}&language=en-US&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch popular movies");
  const data = await res.json();
  return data.results.map(toMovie);
}

/** 🏷️ Hämta lista över genrer */
export async function getGenres() {
  const res = await fetch(`${BASE}/genre/movie/list?api_key=${KEY}&language=en-US`);
  if (!res.ok) throw new Error("Failed to fetch genres");
  const data = await res.json();
  return data.genres; // مصفوفة من الكائنات {id, name}
}

/** 🔸 Hämta filmer baserat på genre */
export async function getMoviesByGenre(genreId, page = 1) {
  const res = await fetch(`${BASE}/discover/movie?api_key=${KEY}&language=en-US&with_genres=${genreId}&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch movies by genre");
  const data = await res.json();
  return data.results.map(toMovie);
}

/** 🎭 Hämta detaljer för en specifik film */
export async function getMovieDetails(movieId) {
  console.log("Fetching details for movie ID:", movieId);
  const url = `${BASE}/movie/${movieId}?api_key=${KEY}&language=en-US`;
  console.log("Fetching from URL:", url);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch movie details: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return toMovie(data);
}
