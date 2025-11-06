import { TMDBApiDataSource } from "../data/datasources/tmdb-api-data-source";
import { MovieRepositoryImpl } from "../data/repositories/movie-repository-impl";
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
export class MovieContainer {
  private static instance: MovieContainer;

  private _httpClient: IHttpClient | null = null;
  private _tmdbApiDataSource: TMDBApiDataSource | null = null;
  private _movieRepository: MovieRepository | null = null;
  private _getPopularMovies: GetPopularMovies | null = null;

  // 설정 - 환경별로 다르게 설정 가능
  private _httpClientConfig: HttpClientConfig = {
    baseUrl: API_CONFIG.BASE_URL,
    timeout: 10_000,
  };

  private constructor() {}

  /**
   * 싱글톤 패턴: 애플리케이션 전체에서 하나의 Movie 컨테이너만 사용
   */
  static getInstance(): MovieContainer {
    if (!MovieContainer.instance) {
      MovieContainer.instance = new MovieContainer();
    }
    return MovieContainer.instance;
  }

  /**
   * 📍 INFRASTRUCTURE LAYER 의존성 생성
   *
   * HTTP 클라이언트 인스턴스 생성 및 관리
   * - 설정을 기반으로 HTTP 클라이언트 생성
   * - 환경별로 다른 설정 적용 가능
   */
  getHttpClient(): IHttpClient {
    if (!this._httpClient) {
      this._httpClient = createHttpClient(this._httpClientConfig);
    }
    return this._httpClient;
  }

  /**
   * 📍 DATA LAYER 의존성 생성
   *
   * DataSource 인스턴스 생성 및 관리
   * - 외부 API 통신을 담당하는 객체
   * - 싱글톤으로 관리하여 불필요한 인스턴스 생성 방지
   */
  getTMDBApiDataSource(): TMDBApiDataSource {
    if (!this._tmdbApiDataSource) {
      this._tmdbApiDataSource = new TMDBApiDataSource(this.getHttpClient());
    }
    return this._tmdbApiDataSource;
  }

  /**
   * Repository 구현체 생성 및 의존성 주입
   * - DataSource를 주입받아 Repository 구현체 생성
   * - Domain의 Repository 인터페이스 구현
   */
  getMovieRepository(): MovieRepository {
    if (!this._movieRepository) {
      this._movieRepository = new MovieRepositoryImpl(
        this.getTMDBApiDataSource() // DataSource 의존성 주입
      );
    }
    return this._movieRepository;
  }

  /**
   * 📍 DOMAIN LAYER 의존성 생성
   *
   * UseCase 인스턴스 생성 및 의존성 주입
   * - Repository 인터페이스를 주입받음 (구현체가 아닌 인터페이스!)
   * - 비즈니스 로직 실행을 위한 준비
   */
  getPopularMoviesUseCase(): GetPopularMovies {
    if (!this._getPopularMovies) {
      this._getPopularMovies = new GetPopularMovies(
        this.getMovieRepository() // Repository 의존성 주입
      );
    }
    return this._getPopularMovies;
  }

  /**
   * 📍 설정 관리
   *
   * 환경별로 다른 설정 적용을 위한 메서드
   * - 개발/운영 환경별 다른 baseUrl 설정
   */

  /**
   * HTTP 클라이언트 설정 변경
   * 환경별로 다른 baseUrl, timeout 등 설정 가능
   */
  setHttpClientConfig(config: HttpClientConfig): void {
    this._httpClientConfig = config;
    // 설정 변경 시 기존 인스턴스 초기화
    this._httpClient = null;
    this._tmdbApiDataSource = null;
    this._movieRepository = null;
    this._getPopularMovies = null;
  }
}

/**
 * 전역 Movie Container 인스턴스
 * - 애플리케이션 어디서든 같은 Movie 컨테이너 사용
 * - 영화 도메인 의존성 일관성 보장
 */
export const movieContainer = MovieContainer.getInstance();
