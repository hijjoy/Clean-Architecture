export const API_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  IMAGE_BASE_URL: "https://image.tmdb.org/t/p",

  API_KEY: import.meta.env.VITE_TMDB_API_KEY,
  IMAGE_SIZES: {
    POSTER: "w500",
    BACKDROP: "w1280",
    PROFILE: "w185",
  },
} as const;

export const ENDPOINTS = {
  POPULAR_MOVIES: "/movie/popular",
  MOVIE_DETAILS: "/movie",
  SEARCH_MOVIES: "/search/movie",
  NOW_PLAYING: "/movie/now_playing",
  TOP_RATED: "/movie/top_rated",
  UPCOMING: "/movie/upcoming",
} as const;
