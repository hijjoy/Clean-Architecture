import type { MovieUIItem } from "../../types/movie.types";
import { getImageUrl } from "../../../core/utils/image-utils";

interface MovieCardProps {
  movie: MovieUIItem;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="flex flex-col gap-2 p-2 border border-gray-200 rounded-md max-w-[400px] cursor-pointer">
      <MoviePoster posterPath={movie.posterPath} title={movie.title} />
      <MovieInfo movie={movie} />
    </div>
  );
}

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
  formattedVoteAverage: string;
}

function MovieRating({ formattedVoteAverage }: MovieRatingProps) {
  return (
    <div>
      <span>⭐</span>
      <span>{formattedVoteAverage}</span>
    </div>
  );
}

interface MovieTitleHeaderProps {
  title: string;
}

function MovieTitleHeader({ title }: MovieTitleHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h3>{title}</h3>
    </div>
  );
}

interface MovieInfoProps {
  movie: MovieUIItem;
}

function MovieInfo({ movie }: MovieInfoProps) {
  return (
    <div className="flex flex-col">
      <MovieTitleHeader title={movie.title} />
      <p>{movie.releaseDate}</p>
      <MovieRating formattedVoteAverage={movie.formattedVoteAverage} />
      <p>{movie.overview}</p>
    </div>
  );
}
