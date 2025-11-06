import type { Movie } from "../../../domain/entities/movie";
import { MovieCard } from "./movie-card";

interface MovieListProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  onLoadMore?: () => void;
  onRefresh?: () => void;
}

export function MovieList({
  movies,
  loading,
  error,
  hasNextPage,
  onLoadMore,
  onRefresh,
}: MovieListProps) {
  if (error) {
    return (
      <div>
        <div>
          <h3>오류가 발생했습니다</h3>
          <p>{error}</p>
          <button onClick={onRefresh}>다시 시도</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>인기 영화</h2>
        <button onClick={onRefresh} disabled={loading}>
          새로고침
        </button>
      </div>

      {movies.length === 0 && loading && (
        <div>
          <div>로딩 중...</div>
        </div>
      )}

      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {loading && movies.length > 0 && (
        <div>
          <div>더 많은 영화를 불러오는 중...</div>
        </div>
      )}

      {hasNextPage && !loading && (
        <div>
          <button onClick={onLoadMore}>더 보기</button>
        </div>
      )}

      {!hasNextPage && movies.length > 0 && (
        <div>
          <p>모든 영화를 불러왔습니다.</p>
        </div>
      )}
    </div>
  );
}
