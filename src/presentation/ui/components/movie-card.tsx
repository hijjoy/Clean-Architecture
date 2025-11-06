import type { Movie } from "../../../domain/entities/movie";
import { getImageUrl } from "../../../core/utils/image-utils";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="flex flex-col gap-2 p-2 border border-gray-200 rounded-md max-w-[400px] cursor-pointer">
      <MoviePoster posterPath={movie.posterPath} title={movie.title} />
      <MovieInfo movie={movie} />
    </div>
  );
}

interface HighRatedBadgeProps {
  isHighRated: boolean;
}

function HighRatedBadge({ isHighRated }: HighRatedBadgeProps) {
  if (!isHighRated) return null;

  return (
    <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">
      ⭐ 고평점
    </span>
  );
}

// 📍 영화 포스터 컴포넌트
interface MoviePosterProps {
  posterPath: string | null;
  title: string;
}

function MoviePoster({ posterPath, title }: MoviePosterProps) {
  const posterUrl = getImageUrl(posterPath);

  return (
    <div>
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={title}
          loading="lazy"
          className="size-40 object-cover"
        />
      ) : (
        <div>
          <span>No Image</span>
        </div>
      )}
    </div>
  );
}

interface MovieRatingProps {
  voteAverage: number;
}

function MovieRating({ voteAverage }: MovieRatingProps) {
  return (
    <div>
      <span>⭐</span>
      <span>{voteAverage.toFixed(1)}</span>
    </div>
  );
}

interface MovieTitleHeaderProps {
  title: string;
  isHighRated: boolean;
}

function MovieTitleHeader({ title, isHighRated }: MovieTitleHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h3>{title}</h3>
      <HighRatedBadge isHighRated={isHighRated} />
    </div>
  );
}

interface MovieInfoProps {
  movie: Movie;
}

function MovieInfo({ movie }: MovieInfoProps) {
  const releaseYear = new Date(movie.releaseDate).getFullYear();

  return (
    <div className="flex flex-col">
      <MovieTitleHeader title={movie.title} isHighRated={movie.isHighRated()} />
      <p>{releaseYear}</p>
      <MovieRating voteAverage={movie.voteAverage} />
      <p>{movie.overview}</p>
    </div>
  );
}
