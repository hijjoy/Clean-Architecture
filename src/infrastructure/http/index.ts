/**
 * 📍 INFRASTRUCTURE LAYER - HTTP MODULE
 *
 * 역할: HTTP 관련 의존성 주입 및 모듈 관리
 * - DI Container에서 HTTP 클라이언트 생성을 위한 팩토리 제공
 * - 설정은 DI Container에서 관리
 */

import { FetchHttpClient } from "./fetch-http-client";
import type { IHttpClient, HttpClientConfig } from "./http-client.interface";

/**
 * 의존성 주입을 위한 팩토리 함수
 * DI Container에서 설정과 함께 호출
 */
export function createHttpClient(config: HttpClientConfig): IHttpClient {
  return new FetchHttpClient(config);
}

// 타입 및 인터페이스 재export
export type {
  IHttpClient,
  HttpResponse,
  HttpRequestConfig,
  HttpClientConfig,
} from "./http-client.interface";
export { FetchHttpClient } from "./fetch-http-client";
