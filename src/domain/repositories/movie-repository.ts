import type { Pagination } from "../../core/types/pagination.type";
import type { Movie } from "../entities/movie";

/**
 * 📍 DOMAIN LAYER - REPOSITORY INTERFACE
 *
 * 역할: 데이터 접근 계약을 정의 (추상화)
 * - 구현체는 모르고, 인터페이스만 정의
 * - UseCase가 데이터에 접근하는 방법을 명시
 * - 외부 구현에 의존하지 않는 도메인 중심 설계
 */

/**
 * 영화 데이터 접근을 위한 Repository 인터페이스
 * - 구체적인 구현 방법은 알 필요 없음 (API, DB, 캐시 등)
 * - Domain Entity만 다룸
 */
export interface MovieRepository {
  /**
   * 인기 영화 목록 조회
   * @param page 페이지 번호 (기본값: 1)
   * @returns Promise<Pagination<Movie>> 도메인 형태의 영화 목록
   */
  getPopularMovies(page?: number): Promise<Pagination<Movie>>;
}
