import { useState, useEffect } from 'react';
import type { Movie, MovieResponse } from '../../domain/entities/movie';
import { GetPopularMovies } from '../../domain/usecases/get-popular-movies';

interface UseMoviesState {
  movies: Movie[];
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

export const useMovies = (getPopularMovies: GetPopularMovies): UseMoviesReturn => {
  const [state, setState] = useState<UseMoviesState>({
    movies: [],
    loading: false,
    error: null,
    currentPage: 0,
    totalPages: 0,
    hasNextPage: false,
  });

  const loadMovies = async (page: number = 1, append: boolean = false) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response: MovieResponse = await getPopularMovies.execute(page);

      setState(prev => ({
        ...prev,
        movies: append ? [...prev.movies, ...response.results] : response.results,
        currentPage: response.page,
        totalPages: response.totalPages,
        hasNextPage: response.page < response.totalPages,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to load movies',
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