import { Suspense } from "react";
import { useMovies } from "../../hooks/use-movies";
import { MovieList } from "../components/movie-list";
import { Skeleton } from "../components/skeleton";
import { MoviesHeader } from "../components/movies-header";
import { LoadMoreButton } from "../components/load-more-button";

/**
 * 📍 PRESENTATION LAYER - SECTION
 *
 * 역할: 특정 기능 영역의 비즈니스 로직 처리
 * - UseCase를 DI Container에서 가져오기
 * - 해당 섹션의 상태 관리
 * - 컴포넌트들을 조합하여 기능 구현
 */

export function MoviesSection() {
  // TODO: 추후 tanstack query를 이용하며 수정 예정
  const { movies, loading, error, hasNextPage, loadNextPage, refresh } =
    useMovies();

  return (
    <Suspense fallback={<MoviesSectionSkeleton />}>
      <MoviesHeader loading={loading} onRefresh={refresh} />
      <MovieList
        movies={movies}
        loading={loading}
        error={error}
        hasNextPage={hasNextPage}
        onLoadMore={loadNextPage}
        onRefresh={refresh}
      />
      <LoadMoreButton
        hasNextPage={hasNextPage}
        loading={loading}
        onLoadMore={loadNextPage}
      />
    </Suspense>
  );
}

function MoviesSectionSkeleton() {
  return <Skeleton message="영화 목록을 불러오는 중..." />;
}
