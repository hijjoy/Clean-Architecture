import type { Pagination } from '../../core/types/pagination.type'
import type { Movie } from '../../domain/entities/movie'
import type { MovieRepository } from '../../domain/repositories/movie-repository'
import type { TMDBApiDataSource } from '../datasources/tmdb-api-data-source'
import { MovieMapper } from '../mappers/movie-mapper'

/**
 * 📍 DATA LAYER - REPOSITORY IMPLEMENTATION
 *
 * 역할: Domain의 Repository 인터페이스를 구현
 * - DataSource를 사용해 실제 데이터 조회
 * - Mapper를 사용해 DTO → Domain Entity 변환
 * - 여러 DataSource를 조합하여 복잡한 데이터 처리 가능
 *
 */

/**
 * MovieRepository의 구체적인 구현체
 * - TMDB API를 사용한 영화 데이터 조회
 * - Domain이 요구하는 인터페이스를 준수
 */
export class MovieRepositoryImpl implements MovieRepository {
  private tmdbApiDataSource: TMDBApiDataSource

  /**
   * DataSource 의존성 주입
   * - 실제 API 호출을 담당하는 객체
   */
  constructor(tmdbApiDataSource: TMDBApiDataSource) {
    this.tmdbApiDataSource = tmdbApiDataSource
  }

  /**
   * 인기 영화 목록 조회 구현
   * 1. DataSource를 통해 외부 API 호출 (DTO 반환)
   * 2. Mapper를 통해 Domain Entity로 변환
   * 3. Domain 계층에 반환
   */
  async getPopularMovies(page: number = 1): Promise<Pagination<Movie>> {
    // 1. 외부 API 호출 - DTO 형태로 응답 받음
    const res = await this.tmdbApiDataSource.getPopularMovies(page)

    // 2. DTO → Domain Entity 변환
    return MovieMapper.toDomainResponse(res)
  }
}
