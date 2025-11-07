import { describe, it, expect } from "vitest";
import { Movie } from "../movie";

describe("Movie Entity", () => {
  describe("isHighRated", () => {
    it("평점이 8.0 이상이면 true를 반환해야 한다", () => {
      const highRatedMovie = new Movie({
        id: 1,
        title: "기생충",
        overview: "설명",
        releaseDate: new Date("2019-05-30"),
        posterPath: "/poster.jpg",
        voteAverage: 9.5,
      });

      expect(highRatedMovie.isHighRated()).toBe(true);
    });

    it("평점이 8.0 미만이면 false를 반환해야 한다", () => {
      const normalMovie = new Movie({
        id: 2,
        title: "극한직업",
        overview: "설명",
        releaseDate: new Date("2019-01-23"),
        posterPath: "/poster.jpg",
        voteAverage: 7.6,
      });

      expect(normalMovie.isHighRated()).toBe(false);
    });
  });
});
