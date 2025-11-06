/**
 * 📍 INFRASTRUCTURE LAYER - FETCH HTTP CLIENT IMPLEMENTATION
 *
 * 역할: fetch API를 사용한 HTTP 클라이언트 구현체
 * - IHttpClient 인터페이스 구현
 * - fetch API 기반 실제 HTTP 통신
 * - 에러 처리 및 타임아웃 관리
 * - 이 프로젝트에서는 TMDB API만 사용하므로 모든 요청에 자동으로 API 키 추가
 */

import type {
  IHttpClient,
  HttpResponse,
  HttpRequestConfig,
  HttpClientConfig,
} from "./http-client.interface";
import { API_CONFIG } from "../../core/config/api";

/**
 * Fetch API 기반 HTTP 클라이언트 구현체
 */
export class FetchHttpClient implements IHttpClient {
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly defaultHeaders: Record<string, string>;

  constructor(config: HttpClientConfig) {
    this.baseUrl = config.baseUrl;
    this.timeout = config.timeout ?? 10_000;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...config.headers,
    };
  }

  /**
   * HTTP GET 요청
   */
  async get<T>(
    endpoint: string,
    config?: HttpRequestConfig
  ): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  /**
   * HTTP POST 요청
   */
  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: HttpRequestConfig
  ): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      body: data,
    });
  }

  /**
   * HTTP PUT 요청
   */
  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: HttpRequestConfig
  ): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: data,
    });
  }

  /**
   * HTTP DELETE 요청
   */
  async delete<T>(
    endpoint: string,
    config?: HttpRequestConfig
  ): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }

  /**
   * HTTP PATCH 요청
   */
  async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: HttpRequestConfig
  ): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PATCH",
      body: data,
    });
  }

  /**
   * 공통 HTTP 요청 메서드
   */
  private async request<T>(
    endpoint: string,
    config: HttpRequestConfig = {}
  ): Promise<HttpResponse<T>> {
    const {
      method = "GET",
      headers = {},
      body,
      timeout = this.timeout,
      params,
    } = config;

    const fullUrl = this.buildUrl(endpoint, params);

    // 요청 설정
    const requestInit: RequestInit = {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
    };

    if (body && method !== "GET") {
      requestInit.body = typeof body === "string" ? body : JSON.stringify(body);
    }

    // 타임아웃 처리
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(fullUrl, {
        ...requestInit,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Request timeout after ${timeout}ms`);
      }

      throw error;
    }
  }

  /**
   * URL 구성 및 쿼리 파라미터 처리
   */
  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean>
  ): string {
    // 상대 경로를 절대 URL로 변환
    const base = this.baseUrl.endsWith("/") ? this.baseUrl.slice(0, -1) : this.baseUrl;
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    let fullUrl = `${base}${path}`;

    // 쿼리 파라미터 추가
    const searchParams = new URLSearchParams();

    // TMDB API 키 자동 추가
    searchParams.append("api_key", API_CONFIG.API_KEY);

    // 추가 파라미터 처리
    if (params && Object.keys(params).length > 0) {
      for (const [key, value] of Object.entries(params)) {
        searchParams.append(key, String(value));
      }
    }

    return `${fullUrl}?${searchParams.toString()}`;
  }
}
