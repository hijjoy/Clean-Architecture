/**
 * 📍 CORE LAYER - COMMON TYPES
 *
 * 역할: 애플리케이션 전체에서 공통으로 사용되는 타입 정의
 * - 모든 레이어에서 재사용 가능한 제네릭 타입
 * - 비즈니스 로직과 무관한 순수 타입
 * - 타입 안정성 향상
 *
 * 특징: 특정 도메인에 종속되지 않는 범용 타입
 */

/**
 * API 응답 공통 형태
 */
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * 페이지네이션 정보
 */
export interface PaginationInfo {
  page: number;
  totalPages: number;
  totalResults: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * 로딩 상태
 */
export type LoadingState = "idle" | "loading" | "success" | "error";

/**
 * 에러 정보
 */
export interface ErrorInfo {
  message: string;
  code?: string | number;
  timestamp: Date;
}

/**
 * ID를 가진 엔티티의 기본 형태
 */
export interface BaseEntity {
  id: number | string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * 옵셔널 필드 유틸리티 타입
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * 필수 필드 유틸리티 타입
 */
export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] };
