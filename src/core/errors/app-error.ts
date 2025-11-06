/**
 * 📍 CORE LAYER - ERROR HANDLING
 *
 * 역할: 애플리케이션 전체의 에러 처리 표준화
 * - 구조화된 에러 클래스 정의
 * - 에러 타입별 분류
 * - 로깅 및 사용자 메시지 분리
 *
 * 특징: 모든 레이어에서 사용 가능한 표준 에러
 */

/**
 * 에러 타입 정의
 */
export const ErrorType = {
  // 네트워크 관련
  NETWORK_ERROR: 'NETWORK_ERROR',
  API_ERROR: 'API_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',

  // 비즈니스 로직 관련
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  BUSINESS_RULE_ERROR: 'BUSINESS_RULE_ERROR',

  // 시스템 관련
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  CONFIGURATION_ERROR: 'CONFIGURATION_ERROR'
} as const;

export type ErrorType = typeof ErrorType[keyof typeof ErrorType];

/**
 * 애플리케이션 표준 에러 클래스
 */
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly code: string;
  public readonly timestamp: Date;
  public readonly userMessage: string;
  public readonly originalError?: Error;

  constructor(
    type: ErrorType,
    message: string,
    userMessage?: string,
    code?: string,
    originalError?: Error
  ) {
    super(message);

    this.name = 'AppError';
    this.type = type;
    this.code = code || type;
    this.timestamp = new Date();
    this.userMessage = userMessage || '일시적인 오류가 발생했습니다. 다시 시도해주세요.';
    this.originalError = originalError;

    // Error 스택 트레이스 유지 (Node.js 환경에서만)
    if (typeof (Error as any).captureStackTrace === 'function') {
      (Error as any).captureStackTrace(this, AppError);
    }
  }

  /**
   * 네트워크 에러 생성
   */
  static networkError(message: string, originalError?: Error): AppError {
    return new AppError(
      ErrorType.NETWORK_ERROR,
      message,
      '네트워크 연결을 확인해주세요.',
      'NETWORK_001',
      originalError
    );
  }

  /**
   * API 에러 생성
   */
  static apiError(message: string, code?: string, originalError?: Error): AppError {
    return new AppError(
      ErrorType.API_ERROR,
      message,
      '서버에 일시적인 문제가 발생했습니다.',
      code || 'API_001',
      originalError
    );
  }

  /**
   * 검증 에러 생성
   */
  static validationError(message: string, userMessage?: string): AppError {
    return new AppError(
      ErrorType.VALIDATION_ERROR,
      message,
      userMessage || '입력값을 확인해주세요.',
      'VALIDATION_001'
    );
  }

  /**
   * 에러 로깅용 객체 변환
   */
  toLogObject(): Record<string, any> {
    return {
      type: this.type,
      message: this.message,
      code: this.code,
      timestamp: this.timestamp.toISOString(),
      stack: this.stack,
      originalError: this.originalError?.message
    };
  }
}