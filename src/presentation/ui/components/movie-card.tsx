import type { MovieUIItem } from "../../types/movie.types";

interface MovieCardProps {
  movie: MovieUIItem;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="flex flex-col gap-2 p-2 border border-gray-200 rounded-md max-w-[400px] cursor-pointer relative">
      {movie.ratingBadge && <MovieBadge ratingBadge={movie.ratingBadge} />}
      <MoviePoster posterUrl={movie.posterUrl} title={movie.title} />
      <MovieInfo movie={movie} />
    </div>
  );
}

interface MovieBadgeProps extends Pick<MovieUIItem, "ratingBadge"> {}

function MovieBadge({ ratingBadge }: MovieBadgeProps) {
  return (
    <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
      {ratingBadge}
    </span>
  );
}

interface MoviePosterProps extends Pick<MovieUIItem, "posterUrl" | "title"> {}

function MoviePoster({ posterUrl, title }: MoviePosterProps) {
  return (
    <img
      src={posterUrl}
      alt={title}
      loading="lazy"
      className="size-40 object-cover"
    />
  );
}

interface MovieRatingProps
  extends Pick<MovieUIItem, "formattedVoteAverage" | "ratingColor"> {}

function MovieRating({ formattedVoteAverage, ratingColor }: MovieRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <span>⭐</span>
      <span className={ratingColor}>{formattedVoteAverage}</span>
    </div>
  );
}

interface MovieTitleHeaderProps extends Pick<MovieUIItem, "title"> {}

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
      <MovieRating
        formattedVoteAverage={movie.formattedVoteAverage}
        ratingColor={movie.ratingColor}
      />
      <p>{movie.overview}</p>
    </div>
  );
}
