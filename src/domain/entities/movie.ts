/**
 * 📍 DOMAIN LAYER - ENTITY
 *
 * 역할: 비즈니스 핵심 데이터 구조와 규칙을 정의
 * - 외부 시스템에 의존하지 않는 순수한 비즈니스 객체
 */

/**
 * 영화 생성 파라미터
 */
export interface MovieParams {
  id: number;
  title: string;
  overview: string;
  releaseDate: Date;
  posterPath: string | null;
  voteAverage: number;
}

/**
 * 영화 도메인 엔티티
 */
export class Movie {
  public readonly id: number;
  public readonly title: string;
  public readonly overview: string;
  public readonly releaseDate: Date;
  public readonly posterPath: string | null;
  public readonly voteAverage: number;

  constructor(params: MovieParams) {
    this.id = params.id;
    this.title = params.title;
    this.overview = params.overview;
    this.releaseDate = params.releaseDate;
    this.posterPath = params.posterPath;
    this.voteAverage = params.voteAverage;
  }

  /**
   * 높은 평점의 영화인지 판단
   * @returns 평점이 8.0 이상이면 true
   */
  isHighRated(): boolean {
    return this.voteAverage >= 8.0;
  }
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
