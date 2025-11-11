# Clean Architecture

클린 아키텍쳐에 대한 개인적인 학습을 위한 레파지토리입니다 🐿️

## 프로젝트 개요

- **아키텍처**: Clean Architecture
- **프론트엔드**: React 19 + TypeScript + Vite + TailwindCSS
- **API**: TMDB (The Movie Database) API
- **패키지 매니저**: Bun

## 프로젝트 구조

```bash
src/
├── 📱 presentation/          # PRESENTATION LAYER (UI & React 컴포넌트)
│   ├── ui/
│   │   ├── components/      # 재사용 가능한 UI 컴포넌트
│   │   ├── sections/        # 화면별 섹션
│   │   └── views/           # 전체 화면
│   ├── hooks/              # React 커스텀 훅
│   ├── adapters/           # Domain Entity → UI Model 변환
│   ├── types/              # UI 전용 타입 정의
│   └── navigation/         # 라우팅
│
├── 🎯 domain/               # DOMAIN LAYER (비즈니스 핵심)
│   ├── entities/           # 비즈니스 엔티티
│   ├── usecases/           # 비즈니스 유스케이스
│   └── repositories/       # Repository 인터페이스 (추상화)
│
├── 💾 data/                # DATA LAYER (외부 데이터 처리)
│   ├── datasources/        # 외부 API 통신
│   ├── dto/               # 데이터 전송 객체
│   ├── repositories/       # Repository 구현체
│   └── mappers/            # DTO ↔ Entity 변환
│
├── 🏗️ infrastructure/       # INFRASTRUCTURE LAYER (기술적 세부사항)
│   └── http/              # HTTP 클라이언트 (인터페이스 + 구현)
│
├── ⚙️ core/                # 공통 유틸리티 & 설정
│   ├── config/            # 설정
│   ├── errors/            # 에러 처리
│   ├── types/             # 공통 타입 정의
│   └── utils/             # 유틸 함수
│
├── 🔌 di/                  # DEPENDENCY INJECTION
│   ├── movie-container.ts  # Movie 도메인 DI 컨테이너
│   └── index.ts
│
└── App.tsx                # 애플리케이션 엔트리 포인트
```

## Clean Architecture란?

### 핵심 원칙

1. **의존성 규칙**: 모든 의존성은 안쪽(Domain)을 향해야 함
2. **의존성 역전**: 구체적인 구현이 아닌 추상화(인터페이스)에 의존
3. **관심사 분리**: 각 계층은 **단일 책임**을 가짐
4. **테스트 용이성**: 각 계층을 **독립적으로 테스트** 가능

## 레이어별 역할

### 📍 Domain Layer (핵심 - 가장 안정적)

- 비즈니스 규칙과 엔티티 정의
- 외부 시스템에 의존하지 않음
- 가장 변화가 적고 안정적인 계층

### 📍 Data Layer (외부 데이터 처리)

- 외부 API/DB와의 실제 통신
- DTO를 Domain Entity로 변환
- Domain의 Repository 인터페이스 구현

### 📍 Presentation Layer (UI)

- 사용자 인터페이스 표시
- UseCase를 호출하여 비즈니스 로직 실행
- 사용자 상호작용 처리

### 📍 Infrastructure Layer (기술적 세부사항)

- HTTP 통신의 추상화와 구현 분리
- 의존성 역전 원칙 적용 (인터페이스에 의존)
- 다른 HTTP 라이브러리로 쉽게 교체 가능

### 📍 DI Container (의존성 주입)

- **Static Class 패턴**으로 의존성 관리
- **Nullish coalescing (`??=`)** 으로 싱글톤 구현
- 계층별 의존성을 순서대로 조립
- UseCase는 stateless이므로 매번 새 인스턴스 생성
- Repository와 DataSource는 싱글톤으로 재사용

## 데이터 흐름

```
1. 📱 MoviesSection Component
   ↓ useMovies() Hook 호출

2. 📱 useMovies Hook
   ↓ MovieContainer.getPopularMoviesUseCase (getter 접근)
   ↓ getPopularMovies.execute(page) 호출

3. 🎯 GetPopularMovies UseCase
   ↓ 페이지 번호 검증 (등.. 비즈니스 로직 수행)
   ↓ movieRepository.getPopularMovies() 호출

4. 💾 MovieRepositoryImpl
   ↓ tmdbApiDataSource.getPopularMovies() 호출

5. 💾 TMDBApiDataSource
   ↓ httpClient.get(endpoint, {params}) 호출 (실제 api 호출)

6. 🏗️ FetchHttpClient
   ↓ buildUrl()에서 baseUrl + endpoint + API 키 자동 추가
   ↓ 실제 HTTP 요청 → TMDB API

7. 💾 MovieMapper
   ↓ DTO → Domain Entity 변환 (snake_case → camelCase)

8. 📱 MovieAdapter
   ↓ Domain Entity → UI Model 변환
   ↓ 화면 표시용 데이터 가공 (포스터 URL 생성, 평점 포맷팅 등)

9. 📱 UI 리렌더링
   MovieList → MovieCard 컴포넌트들로 영화 목록 표시
```
