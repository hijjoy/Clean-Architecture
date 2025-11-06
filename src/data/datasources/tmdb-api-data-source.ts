import { ENDPOINTS } from "../../core/config/api";
import type { TMDBMoviesResponse } from "../dto/tmdb-movie.dto";
import type { IHttpClient } from "../../infrastructure/http/http-client.interface";

/**
 * 📍 DATA LAYER - DATASOURCE
 *
 * 역할: 외부 데이터 소스(API, DB 등)와의 실제 통신을 담당
 * - 실제 HTTP 요청 수행
 * - DTO 반환
 */
export class TMDBApiDataSource {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 인기 영화 목록 API 호출
   * @param page 페이지 번호
   * @returns TMDB API 응답 형태의 DTO
   */
  async getPopularMovies(page: number = 1): Promise<TMDBMoviesResponse> {
    try {
      const response = await this.httpClient.get<TMDBMoviesResponse>(
        ENDPOINTS.POPULAR_MOVIES,
        { params: { page } }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `TMDB API Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}
