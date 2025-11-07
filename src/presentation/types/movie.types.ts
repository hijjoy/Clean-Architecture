/**
 * UI에서 사용할 영화 아이템 타입
 */
export interface MovieUIItem {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  formattedVoteAverage: string;
  ratingBadge: string | null;
  posterUrl: string;
  ratingColor: string;
}

/**
 * 영화 목록 UI 응답 타입
 */
export interface MovieUIResponse {
  page: number;
  results: MovieUIItem[];
  totalPages: number;
  totalResults: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
