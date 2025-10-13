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
    runtime: dto.runtime, 
    genres: dto.genres || [], 
    

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
  return data.genres;
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

// SEARCH FUNCTIONALITY PART
/** 🔍 Search movies function */
export async function searchMovies(query, { page = 1, locale = "en-US" } = {}) {
  const KEY = import.meta.env.VITE_TMDB_API_KEY;
  if (!KEY) throw new Error("API key is missing");
  const q = (query ?? "").trim();
  if (!q) {
    return { page:1, total_pages:1, total_results:0, results: []};
  }

  // sets the url for the search request
  const BASE = (import.meta.env.VITE_TMDB_BASE || "https://api.themoviedb.org/3").replace(/\/+$/, "");
  const url = new URL(`${BASE}/search/movie`);
  url.searchParams.set("api_key", KEY);
  url.searchParams.set("query", q);
  url.searchParams.set("language", locale);
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("page", String(page));

  // sends request to TMDB + some error handling
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB search failed: ${res.status} ${res.statusText}`);

  /* Alternative error handling with try-catch if we get network errors
  let res;
  try {
  res = await fetch(url.toString());
  } catch (err) {
  throw new Error(`Network error contacting TMDB: ${err.message}`);
  }
  if (!res.ok) {
  throw new Error(`TMDB search failed: ${res.status} ${res.statusText}`);
  }
  */

  // processes the response data and maps it to our movie format
  const data = await res.json();
  const list = Array.isArray(data?.results) ? data.results : [];
  return {
    page: data.page,
    total_pages: data.total_pages,
    total_results: data.total_results,
    results: list.map(toMovie),
  };
}
// SEARCH FUNCTIONALITY PART END