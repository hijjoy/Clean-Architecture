import type { Movie, MovieResponse } from "../../domain/entities/movie";
import type {
  TMDBMovieResponse,
  TMDBMoviesResponse,
} from "../dto/tmdb-movie.dto";

/**
 * 📍 DATA LAYER - MAPPER
 *
 * 역할: DTO ↔ Domain Entity 변환을 담당
 * - 외부 API의 DTO를 Domain Entity로 변환
 */
export class MovieMapper {
  /**
   * TMDB API의 개별 영화 DTO를 Domain Entity로 변환
   * - 필요한 필드만 선택적으로 매핑
   */
  static toDomain(tmdbMovie: TMDBMovieResponse): Movie {
    return {
      id: tmdbMovie.id,
      title: tmdbMovie.title,
      overview: tmdbMovie.overview,
      releaseDate: tmdbMovie.release_date,
      posterPath: tmdbMovie.poster_path,
      voteAverage: tmdbMovie.vote_average,
    };
  }

  /**
   * TMDB API의 페이지네이션 응답을 Domain 응답으로 변환
   * - 각 영화 데이터를 Domain Entity로 변환
   * - 페이지네이션 정보 매핑
   */
  static toDomainResponse(tmdbResponse: TMDBMoviesResponse): MovieResponse {
    return {
      page: tmdbResponse.page,
      results: tmdbResponse.results.map(this.toDomain), // 각 영화를 Domain Entity로 변환
      totalPages: tmdbResponse.total_pages,
      totalResults: tmdbResponse.total_results,
    };
  }
}
