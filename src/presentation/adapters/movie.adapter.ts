import type { Pagination } from "../../core/types/pagination.type";
import type { Movie } from "../../domain/entities/movie";
import type { MovieUIItem, MovieUIResponse } from "../types/movie.types";

/**
 * Movie 도메인 엔티티를 UI에서 사용할 형태로 변환하는 Adapter
 */
export const MovieAdapter = {
  /**
   * Movie 엔티티를 UI 아이템으로 변환
   */
  toUIItem(movie: Movie): MovieUIItem {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      releaseDate: movie.releaseDate.toISOString().split("T")[0],
      posterPath: movie.posterPath,
      voteAverage: movie.voteAverage,
      formattedVoteAverage: movie.voteAverage.toFixed(1),
    };
  },

  /**
   * Movie 엔티티 배열을 UI 아이템 배열로 변환
   */
  toUIItems(movies: Movie[]): MovieUIItem[] {
    return movies.map((movie) => this.toUIItem(movie));
  },

  /**
   * Pagination<Movie>를 UI Response로 변환
   */
  toUIResponse(response: Pagination<Movie>): MovieUIResponse {
    return {
      page: response.page,
      results: this.toUIItems(response.results),
      totalPages: response.totalPages,
      totalResults: response.totalResults,
      hasNextPage: response.page < response.totalPages,
      hasPrevPage: response.page > 1,
    };
  },
};
