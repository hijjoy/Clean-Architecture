/**
 * 📍 DOMAIN LAYER - ENTITY
 *
 * 역할: 비즈니스 핵심 데이터 구조와 규칙을 정의
 * - 외부 시스템에 의존하지 않는 순수한 비즈니스 객체
 */

/**
 * 영화 도메인 엔티티
 */
export interface Movie {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  posterPath: string | null;
  voteAverage: number;

  // 향후 비즈니스 로직 메서드 추가 가능
  // isHighRated(): boolean;
  // isRecent(): boolean;
}

/**
 * 영화 목록 응답을 위한 도메인 객체
 * - 페이지네이션 정보 포함
 * - 비즈니스 요구사항에 맞는 구조
 */
export interface MovieResponse {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
}
