import { MoviesHeaderSection } from "../sections/movies-header-section";
import { MoviesSection } from "../sections/movies-section";

/**
 * 📍 PRESENTATION LAYER - VIEW
 *
 * 역할: 페이지 레이아웃만 담당
 * - 페이지 구조와 헤더 정의
 * - 비즈니스 로직은 Section에서 처리
 * - 순수한 UI 구성 요소
 */

export function MoviesView() {
  return (
    <div className="flex flex-col gap-4 size-full justify-center items-center">
      <MoviesHeaderSection />
      <MoviesSection />
    </div>
  );
}
