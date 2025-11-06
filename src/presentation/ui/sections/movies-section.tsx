import { Suspense } from "react";
import { useMovies } from "../../hooks/use-movies";
import { MovieList } from "../components/movie-list";

/**
 * 📍 PRESENTATION LAYER - SECTION
 *
 * 역할: 특정 기능 영역의 비즈니스 로직 처리
 * - UseCase를 DI Container에서 가져오기
 * - 해당 섹션의 상태 관리
 * - 컴포넌트들을 조합하여 기능 구현
 */

function MoviesSectionContent() {
  // TODO: 추후 tanstack query를 이용하며 수정 예정
  const { movies, loading, error, hasNextPage, loadNextPage, refresh } =
    useMovies();

  return (
    <MovieList
      movies={movies}
      loading={loading}
      error={error}
      hasNextPage={hasNextPage}
      onLoadMore={loadNextPage}
      onRefresh={refresh}
    />
  );
}

function MoviesSectionSkeleton() {
  return (
    <div>
      <div>영화 목록을 불러오는 중...</div>
    </div>
  );
}

function MoviesSectionError() {
  return (
    <div>
      <p>영화 목록을 불러오는 중 오류가 발생했습니다.</p>
    </div>
  );
}

export function MoviesSection() {
  return (
    <div>
      <Suspense fallback={<MoviesSectionSkeleton />}>
        <MoviesSectionContent />
      </Suspense>
    </div>
  );
}

export { MoviesSectionSkeleton, MoviesSectionError };
