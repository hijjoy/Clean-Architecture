/**
 * 📍 INFRASTRUCTURE LAYER - HTTP CLIENT INTERFACE
 *
 * 역할: HTTP 통신을 위한 추상화 계약
 * - 의존성 역전 원칙(DIP) 적용
 * - 테스트 용이성 향상
 * - 구현체 교체 가능
 */

export interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export interface HttpClientConfig {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface HttpRequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  params?: Record<string, string | number | boolean>;
}

/**
 * HTTP 클라이언트 인터페이스
 * - 구체적인 구현에 의존하지 않는 추상화
 * - 다양한 HTTP 라이브러리로 구현 가능 (fetch, axios 등)
 */
export interface IHttpClient {
  /**
   * HTTP GET 요청
   */
  get<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;

  /**
   * HTTP POST 요청
   */
  post<T>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>>;

  /**
   * HTTP PUT 요청
   */
  put<T>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>>;

  /**
   * HTTP DELETE 요청
   */
  delete<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;

  /**
   * HTTP PATCH 요청
   */
  patch<T>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
}