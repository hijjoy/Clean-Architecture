import { TMDBApiDataSource } from "../data/datasources/tmdb-api-data-source";
import { MovieRepositoryImpl } from "../data/repositories/movie-repository-impl";
import { MovieRepositoryStub } from "../domain/repositories/movie-repository.stub";
import { GetPopularMovies } from "../domain/usecases/get-popular-movies";
import type { MovieRepository } from "../domain/repositories/movie-repository";
import {
  createHttpClient,
  type IHttpClient,
  type HttpClientConfig,
} from "../infrastructure/http";
import { API_CONFIG } from "../core/config/api";

/**
 * 📍 MOVIE DOMAIN DI CONTAINER
 *
 * 역할: 영화 도메인의 모든 의존성을 관리하고 주입
 * - Movie 관련 객체 생성과 생명주기 관리
 * - 의존성 주입 자동화
 * - 싱글톤 패턴으로 인스턴스 공유
 * - 테스트용 Mock 객체 주입 지원
 *
 * 향후 확장:
 * - UserContainer, ReviewContainer 등 도메인별 분리 예정
 * - 각 도메인의 독립성과 유지보수성 향상
 */

/**
 * 영화 도메인 의존성 주입 컨테이너
 * - 영화 관련 객체 생성과 관리를 담당
 * - TMDB API, Repository, UseCase 연결
 */
class MovieContainer {
  private static _httpClient: IHttpClient;
  private static _tmdbApiDataSource: TMDBApiDataSource;
  private static _movieRepository: MovieRepository;

  // 설정 - 환경별로 다르게 설정 가능
  private static _httpClientConfig: HttpClientConfig = {
    baseUrl: API_CONFIG.BASE_URL,
    timeout: 10_000,
  };

  /**
   * 📍 INFRASTRUCTURE LAYER 의존성 생성
   *
   * HTTP 클라이언트 인스턴스 생성 및 관리
   * - 설정을 기반으로 HTTP 클라이언트 생성
   * - 환경별로 다른 설정 적용 가능
   */
  static get httpClient(): IHttpClient {
    return (this._httpClient ??= createHttpClient(this._httpClientConfig));
  }

  /**
   * 📍 DATA LAYER 의존성 생성
   *
   * DataSource 인스턴스 생성 및 관리
   * - 외부 API 통신을 담당하는 객체
   * - 싱글톤으로 관리하여 불필요한 인스턴스 생성 방지
   */
  static get tmdbApiDataSource(): TMDBApiDataSource {
    return (this._tmdbApiDataSource ??= new TMDBApiDataSource(this.httpClient));
  }

  /**
   * Repository 구현체 생성 및 의존성 주입
   * - 환경변수에 따라 실제 구현체 또는 Stub 반환
   * - Domain의 Repository 인터페이스 구현
   */
  static get movieRepository(): MovieRepository {
    return (this._movieRepository ??= (() => {
      // 환경변수로 Mock 사용 여부 결정
      const useMock = import.meta.env.VITE_USE_MOCK === "true";

      if (useMock) {
        return new MovieRepositoryStub();
      } else {
        return new MovieRepositoryImpl(
          this.tmdbApiDataSource // DataSource 의존성 주입
        );
      }
    })());
  }

  /**
   * 📍 DOMAIN LAYER 의존성 생성
   *
   * UseCase 인스턴스 생성 및 의존성 주입
   * - Repository 인터페이스를 주입받음 (구현체가 아닌 인터페이스!)
   * - 비즈니스 로직 실행을 위한 준비
   * - UseCase는 매번 새로 생성 (상태를 가지지 않으므로)
   */
  static get getPopularMoviesUseCase(): GetPopularMovies {
    return new GetPopularMovies(
      this.movieRepository // Repository 의존성 주입
    );
  }

  /**
   * 테스트용 Repository 강제 설정
   * 특정 테스트에서 특별한 Stub이나 Mock을 사용하고 싶을 때
   */
  static setMovieRepository(repository: MovieRepository): void {
    this._movieRepository = repository;
  }
}

export default MovieContainer;
