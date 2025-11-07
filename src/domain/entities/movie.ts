/**
 * 📍 DOMAIN LAYER - ENTITY
 *
 * 역할: 비즈니스 핵심 데이터 구조와 규칙을 정의
 * - 외부 시스템에 의존하지 않는 순수한 비즈니스 객체
 */

/**
 * 영화 도메인 엔티티
 */
export class Movie {
  private readonly _id: number;
  private readonly _title: string;
  private readonly _overview: string;
  private readonly _releaseDate: Date;
  private readonly _posterPath: string | null;
  private readonly _voteAverage: number;

  constructor(params: {
    id: number;
    title: string;
    overview: string;
    releaseDate: Date;
    posterPath: string | null;
    voteAverage: number;
  }) {
    this._id = params.id;
    this._title = params.title;
    this._overview = params.overview;
    this._releaseDate = params.releaseDate;
    this._posterPath = params.posterPath;
    this._voteAverage = params.voteAverage;
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get overview(): string {
    return this._overview;
  }

  get releaseDate(): Date {
    return this._releaseDate;
  }

  get posterPath(): string | null {
    return this._posterPath;
  }

  get voteAverage(): number {
    return this._voteAverage;
  }

  // 비즈니스 로직 메서드
  /**
   * 높은 평점의 영화인지 판단
   * @returns 평점이 8.0 이상이면 true
   */
  isHighRated(): boolean {
    return this._voteAverage >= 8.0;
  }

  hasPoster(): boolean {
    return !!this._posterPath;
  }
}
