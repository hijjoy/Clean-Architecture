import type { Pagination } from "../../core/types/pagination.type";
import type { Movie } from "../../domain/entities/movie";
import type { MovieUIItem, MovieUIResponse } from "../types/movie.types";
import { getImageUrl } from "../../core/utils/image-utils";

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
      voteAverage: movie.voteAverage,
      formattedVoteAverage: movie.voteAverage.toFixed(1),
      ratingBadge: this.getRatingBadge(movie),
      posterUrl: this.getPosterUrl(movie),
      ratingColor: this.getRatingColor(movie),
    };
  },

  /**
   * Movie 엔티티 배열을 UI 아이템 배열로 변환
   */
  toUIItems(movies: Movie[]): MovieUIItem[] {
    return movies.map((movie) => this.toUIItem(movie));
  },

  /**
   * 평점에 따른 배지 텍스트 반환
   */
  getRatingBadge(movie: Movie): string | null {
    if (movie.isHighRated()) {
      return "인기작";
    }
    if (movie.voteAverage >= 7.0) {
      return "추천";
    }
    return null;
  },

  /**
   * 포스터 URL 생성 (없으면 기본 이미지)
   */
  getPosterUrl(movie: Movie): string {
    const imageUrl = getImageUrl(movie.posterPath);
    if (imageUrl) {
      return imageUrl;
    }
    return "/images/default-movie-poster.png";
  },

  /**
   * 평점에 따른 색상 클래스 반환
   */
  getRatingColor(movie: Movie): string {
    if (movie.isHighRated()) {
      return "text-yellow-500";
    }
    if (movie.voteAverage >= 7.0) {
      return "text-green-500";
    }
    if (movie.voteAverage >= 5.0) {
      return "text-gray-500";
    }
    return "text-red-500";
  },

  /**
   * Pagination<Movie>를 UI List로 변환
   */
  toUIList(response: Pagination<Movie>): MovieUIResponse {
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
