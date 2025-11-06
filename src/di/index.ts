/**
 * 📍 DI CONTAINER MODULE
 *
 * 도메인별 DI Container 관리
 * - 현재: Movie 도메인만 존재
 * - 향후: User, Review 등 도메인별 컨테이너 추가 예정
 *
 * 사용법:
 * import { movieContainer } from "@/src/di";
 * const useCase = movieContainer.getPopularMoviesUseCase();
 */

export { movieContainer, MovieContainer } from "./movie-container";

// 향후 추가될 도메인별 컨테이너들
// export { userContainer, UserContainer } from "./user-container";
// export { reviewContainer, ReviewContainer } from "./review-container";