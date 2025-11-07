import { useEffect, useState } from "react";
import type { Pagination } from "../../core/types/pagination.type";
import { movieContainer } from "../../di";
import type { Movie } from "../../domain/entities/movie";
import { MovieAdapter } from "../adapters/movie.adapter";
import type { MovieUIItem } from "../types/movie.types";

interface UseMoviesState {
  movies: MovieUIItem[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

interface UseMoviesReturn extends UseMoviesState {
  loadMovies: () => Promise<void>;
  loadNextPage: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const useMovies = (): UseMoviesReturn => {
  const [state, setState] = useState<UseMoviesState>({
    movies: [],
    loading: false,
    error: null,
    currentPage: 0,
    totalPages: 0,
    hasNextPage: false,
  });

  const loadMovies = async (page: number = 1, append: boolean = false) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const getPopularMovies = movieContainer.getPopularMoviesUseCase();
      const response: Pagination<Movie> = await getPopularMovies.execute(page);

      // Domain Entity를 UI Item으로 변환
      const uiResponse = MovieAdapter.toUIResponse(response);

      setState((prev) => ({
        ...prev,
        movies: append
          ? [...prev.movies, ...uiResponse.results]
          : uiResponse.results,
        currentPage: uiResponse.page,
        totalPages: uiResponse.totalPages,
        hasNextPage: uiResponse.hasNextPage,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to load movies",
        loading: false,
      }));
    }
  };

  const loadNextPage = async () => {
    if (state.hasNextPage && !state.loading) {
      await loadMovies(state.currentPage + 1, true);
    }
  };

  const refresh = async () => {
    await loadMovies(1, false);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return {
    ...state,
    loadMovies: () => loadMovies(),
    loadNextPage,
    refresh,
  };
};
