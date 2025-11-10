import { describe, it, expect, beforeEach } from 'vitest'
import { MovieRepositoryStub } from '../../repositories/movie-repository.stub'
import type { MovieRepository } from '../../repositories/movie-repository'
import { GetPopularMovies } from '../get-popular-movies'
import MovieContainer from '../../../di/movie-container'

describe('GetPopularMovies UseCase', () => {
  let getPopularMovies: GetPopularMovies
  let repositoryStub: MovieRepository

  beforeEach(() => {
    // 각 테스트마다 새로운 stub 인스턴스 생성
    repositoryStub = new MovieRepositoryStub()

    // DI Container 초기화 후 stub 주입
    MovieContainer.reset()
    MovieContainer.setMovieRepository(repositoryStub)

    getPopularMovies = MovieContainer.getPopularMoviesUseCase
  })

  describe('정상 케이스', () => {
    it('첫 번째 페이지의 인기 영화를 반환해야 한다', async () => {
      // When
      const result = await getPopularMovies.execute(1)

      // Then
      expect(result.page).toBe(1)
      expect(result.results.length).toBeGreaterThan(0)
      expect(result.totalPages).toBeGreaterThan(0)
      expect(result.totalResults).toBeGreaterThan(0)

      // 첫 번째 영화 확인
      const firstMovie = result.results[0]
      expect(firstMovie.title).toBe('기생충')
      expect(firstMovie.isHighRated()).toBe(true)
    })

    it('두 번째 페이지의 영화를 반환해야 한다', async () => {
      // When
      const result = await getPopularMovies.execute(2)

      // Then
      expect(result.page).toBe(2)
      expect(result.results.length).toBeGreaterThan(0)
      expect(result.results[0].title).toBe('곡성')
    })

    it('페이지 번호가 없으면 기본값 1을 사용해야 한다', async () => {
      // When
      const result = await getPopularMovies.execute()

      // Then
      expect(result.page).toBe(1)
      expect(result.results.length).toBeGreaterThan(0)
    })
  })

  describe('경계 케이스', () => {
    it('마지막 페이지를 요청했을 때 올바르게 처리해야 한다', async () => {
      // When
      const result = await getPopularMovies.execute(3)

      // Then
      expect(result.page).toBe(3)
      expect(result.results.length).toBeGreaterThan(0)
      expect(result.results[0].title).toBe('리얼')
    })

    it('페이지 범위를 초과했을 때 빈 결과를 반환해야 한다', async () => {
      // When
      const result = await getPopularMovies.execute(999)

      // Then
      expect(result.page).toBe(999)
      expect(result.results).toHaveLength(0)
      expect(result.totalPages).toBeGreaterThan(0)
      expect(result.totalResults).toBeGreaterThan(0)
    })
  })

  describe('에러 케이스', () => {
    it('잘못된 페이지 번호일 때 에러를 발생시켜야 한다', async () => {
      // When & Then
      await expect(getPopularMovies.execute(0)).rejects.toThrow('페이지 번호는 1 이상이어야 합니다.')
      await expect(getPopularMovies.execute(-1)).rejects.toThrow('페이지 번호는 1 이상이어야 합니다.')
    })
  })

  describe('데이터 무결성', () => {
    it('Repository에서 반환된 영화 데이터가 올바른 형태여야 한다', async () => {
      // When
      const result = await getPopularMovies.execute(1)

      // Then
      result.results.forEach(movie => {
        expect(movie).toHaveProperty('id')
        expect(movie).toHaveProperty('title')
        expect(movie).toHaveProperty('overview')
        expect(movie).toHaveProperty('releaseDate')
        expect(movie).toHaveProperty('posterPath')
        expect(movie).toHaveProperty('voteAverage')
      })
    })
  })
})