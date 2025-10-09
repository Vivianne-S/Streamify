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
    runtime: dto.runtime, // مدة الفيلم بالدقائق
    genres: dto.genres || [], // أنواع الأفلام
  };
}

//Converts a list of movie DTOs to a list of movie objects
function toList(json) {
  return Array.isArray(json.results) ? json.results.map(toMovie) : [];
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

/** 🔍 Search movies function */
export async function searchMovies(query, page = 1, locale = 'en-US') {
  if (!KEY) throw new Error("API key is missing");
  const q = (query ?? "").trim();
  if (!q) return { page:1, total_pages:1, total_results:0, results: []};

  const url = '${BASE}/search/movie?api_key=${KEY}&query=${encudeURIComponent(q)}&language=${locale}&page=${page}&include_adult=false&page=${page}';
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch search results");
  const data = await res.json();
  return {
    page: data.page,
    total_pages: data.total_pages,
    total_results: data.total_results,
    results: toList(data)
  };
}