import type { Movie } from "../../../domain/entities/movie";
import { ErrorMessage } from "./error-message";
import { LoadingSpinner } from "./loading-spinner";
import { MovieCard } from "./movie-card";

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  onLoadMore?: () => void;
  onRefresh?: () => void;
}

export function MovieList({ movies, loading, error }: MovieListProps) {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
