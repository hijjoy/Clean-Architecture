import type { MovieRepository } from "../repositories/movie-repository";
import type { MovieResponse } from "../entities/movie";

/**
 * 📍 DOMAIN LAYER - USE CASE
 *
 * 역할: 특정 비즈니스 시나리오의 흐름을 제어
 * - 애플리케이션의 비즈니스 로직 구현
 * - 여러 Repository나 Entity를 조합
 * - 입력 검증 및 비즈니스 규칙 적용
 * - 단일 책임 원칙: 하나의 UseCase는 하나의 비즈니스 시나리오만 담당
 */

/**
 * "인기 영화 목록 조회" 비즈니스 시나리오
 * - 입력 검증 (페이지 번호 유효성)
 * - Repository를 통한 데이터 조회
 */
export class GetPopularMovies {
  private movieRepository: MovieRepository;

  /**
   * 의존성 주입: Repository 인터페이스를 주입받음
   * - 구체적인 구현체가 아닌 인터페이스에 의존
   * - 테스트하기 쉬움 (Mock Repository 주입 가능)
   */
  constructor(movieRepository: MovieRepository) {
    this.movieRepository = movieRepository;
  }

  /**
   * UseCase 실행 메서드
   * @param page 조회할 페이지 번호
   * @returns Promise<MovieResponse> 인기 영화 목록
   */
  async execute(page: number = 1): Promise<MovieResponse> {
    // 비즈니스 규칙: 페이지 번호 검증
    if (page < 1) {
      throw new Error("페이지 번호는 1 이상이어야 합니다.");
    }

    // Repository를 통한 데이터 조회
    return await this.movieRepository.getPopularMovies(page);
  }
}
