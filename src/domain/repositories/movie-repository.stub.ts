import type { Pagination } from "../../core/types/pagination.type";
import { Movie } from "../entities/movie";
import type { MovieRepository } from "./movie-repository";

/**
 * Movie Repository Stub
 *
 * Mock 데이터를 반환하는 Repository Stub 구현
 * - 테스트 환경에서 사용
 * - 실제 API 호출하지 않고 예측 가능한 데이터 제공
 * - 다양한 시나리오 테스트 지원
 */
export class MovieRepositoryStub implements MovieRepository {
  private mockMovies: Movie[] = [
    // 페이지 1 - 고평점 한국 영화들
    new Movie({
      id: 1,
      title: "기생충",
      overview:
        "전원백수로 살 길 막막하지만 사이는 좋은 기택 가족. 장남 기우에게 명문대생 친구가 연결시켜 준 고액 과외 자리는 모처럼 싹튼 고정수입의 희망이다.",
      releaseDate: new Date("2019-05-30"),
      posterPath: "https://picsum.photos/id/237/200/300",
      voteAverage: 9.5,
    }),
    new Movie({
      id: 2,
      title: "올드보이",
      overview:
        "15년간 이유도 모른 채 감금되어 있다가 풀려난 오대수가 자신을 가둔 자를 찾아 복수하는 이야기.",
      releaseDate: new Date("2003-11-21"),
      posterPath: "https://picsum.photos/id/238/200/300",
      voteAverage: 9.2,
    }),
    new Movie({
      id: 3,
      title: "살인의 추억",
      overview:
        "1986년 경기도 화성에서 발생한 연쇄 살인사건을 모티브로 한 영화. 시골 형사들이 미제 사건을 추적한다.",
      releaseDate: new Date("2003-05-02"),
      posterPath: "https://picsum.photos/id/239/200/300",
      voteAverage: 8.9,
    }),
    new Movie({
      id: 4,
      title: "태극기 휘날리며",
      overview:
        "한국전쟁을 배경으로 강제 징집된 두 형제의 비극적인 운명을 그린 전쟁 영화.",
      releaseDate: new Date("2004-02-05"),
      posterPath: "https://picsum.photos/id/240/200/300",
      voteAverage: 8.8,
    }),
    new Movie({
      id: 5,
      title: "버닝",
      overview:
        "알바를 전전하며 살아가는 종수 앞에 어린 시절 동네 친구였던 해미가 나타난다. 해미가 아프리카 여행을 떠난 사이, 종수는 그녀를 기다린다.",
      releaseDate: new Date("2018-05-17"),
      posterPath: null,
      voteAverage: 8.5,
    }),

    // 페이지 2 - 중간 평점 한국 영화들
    new Movie({
      id: 6,
      title: "곡성",
      overview:
        "낯선 외지인이 나타난 후 의문의 사건들이 발생하는 작은 마을. 딸이 기괴한 병에 걸리자 종구는 진실을 파헤치기 시작한다.",
      releaseDate: new Date("2016-05-12"),
      posterPath: "https://picsum.photos/id/241/200/300",
      voteAverage: 7.8,
    }),
    new Movie({
      id: 7,
      title: "아가씨",
      overview:
        "일제강점기, 사기꾼 백작이 거액의 재산을 상속받은 아가씨를 유혹하기 위해 하녀를 심어놓는다.",
      releaseDate: new Date("2016-06-01"),
      posterPath: "https://picsum.photos/id/242/200/300",
      voteAverage: 7.9,
    }),
    new Movie({
      id: 8,
      title: "신과함께: 죄와 벌",
      overview:
        "화재 사고로 죽음을 맞이한 자홍이 저승 재판을 받으며 과거를 돌아보는 판타지 영화.",
      releaseDate: new Date("2017-12-20"),
      posterPath: "https://picsum.photos/id/243/200/300",
      voteAverage: 7.7,
    }),
    new Movie({
      id: 9,
      title: "극한직업",
      overview:
        "범죄조직 소탕을 위해 치킨집을 위장 창업한 마약반 형사들의 좌충우돌 코미디.",
      releaseDate: new Date("2019-01-23"),
      posterPath: "https://picsum.photos/id/244/200/300",
      voteAverage: 7.6,
    }),
    new Movie({
      id: 10,
      title: "베테랑",
      overview: "재벌 3세의 갑질에 맞서는 광수대 강력반 형사들의 이야기.",
      releaseDate: new Date("2015-08-05"),
      posterPath: "https://picsum.photos/id/245/200/300",
      voteAverage: 7.4,
    }),

    // 페이지 3 - 낮은 평점 한국 영화들
    new Movie({
      id: 11,
      title: "리얼",
      overview:
        "도시 전체를 지배하는 거대한 카지노 왕국의 실소유주 조태오와 그의 또 다른 자아의 대결.",
      releaseDate: new Date("2017-06-28"),
      posterPath: "https://picsum.photos/id/246/200/300",
      voteAverage: 3.6,
    }),
    new Movie({
      id: 12,
      title: "인천상륙작전",
      overview: "한국전쟁의 전세를 뒤바꾼 인천상륙작전을 그린 전쟁 영화.",
      releaseDate: new Date("2016-07-27"),
      posterPath: null,
      voteAverage: 4.8,
    }),
    new Movie({
      id: 13,
      title: "기술자들",
      overview:
        "희대의 다이아몬드를 훔치기 위해 모인 최고의 기술자들의 이야기.",
      releaseDate: new Date("2014-12-24"),
      posterPath: "https://picsum.photos/id/247/200/300",
      voteAverage: 5.2,
    }),
    new Movie({
      id: 14,
      title: "미스터 고",
      overview:
        "중국 서커스단에서 자란 고릴라가 한국 프로야구 선수가 되는 이야기.",
      releaseDate: new Date("2013-07-17"),
      posterPath: "https://picsum.photos/id/248/200/300",
      voteAverage: 5.5,
    }),
    new Movie({
      id: 15,
      title: "7광구",
      overview:
        "석유 시추선에서 발생한 괴생명체와의 사투를 그린 해양 재난 영화.",
      releaseDate: new Date("2011-08-04"),
      posterPath: "https://picsum.photos/id/249/200/300",
      voteAverage: 6.1,
    }),
  ];

  async getPopularMovies(page: number = 1): Promise<Pagination<Movie>> {
    // 페이지 유효성 검증
    if (page < 1) {
      throw new Error("페이지 번호는 1 이상이어야 합니다.");
    }

    // 페이지네이션 설정
    const pageSize = 5;
    const totalMovies = this.mockMovies.length;
    const totalPages = Math.ceil(totalMovies / pageSize);

    // 요청한 페이지가 총 페이지 수를 초과하는 경우
    if (page > totalPages) {
      return {
        page,
        results: [],
        totalPages,
        totalResults: totalMovies,
      };
    }

    // 해당 페이지의 영화들 추출
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageMovies = this.mockMovies.slice(startIndex, endIndex);

    return {
      page,
      results: pageMovies,
      totalPages,
      totalResults: totalMovies,
    };
  }
}
