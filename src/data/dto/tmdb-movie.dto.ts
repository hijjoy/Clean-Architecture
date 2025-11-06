/**
 * TMDB API로부터 받는 개별 영화 데이터 형태
 * - 외부 API의 실제 응답 구조를 그대로 반영
 * - snake_case 네이밍 컨벤션 사용 (TMDB API 스펙)
 */
export interface TMDBMovieResponse {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  vote_average: number;
}

/**
 * TMDB API로부터 받는 영화 목록 응답 형태
 * - 페이지네이션 정보 포함
 * - TMDB API의 실제 응답 구조
 */
export interface TMDBMoviesResponse {
  page: number;
  results: TMDBMovieResponse[];
  total_pages: number;
  total_results: number;
}

/**
 * API 에러 응답 DTO
 * - TMDB API 에러 응답 형태
 */
export interface TMDBErrorResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}
