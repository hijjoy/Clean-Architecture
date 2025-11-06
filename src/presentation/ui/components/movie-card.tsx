import type { Movie } from "../../../domain/entities/movie";
import { getImageUrl } from "../../../core/utils/image-utils";

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const posterUrl = getImageUrl(movie.posterPath);
  const releaseYear = new Date(movie.releaseDate).getFullYear();

  const handleClick = () => {
    onClick?.(movie);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col gap-2 p-2 border border-gray-200 rounded-md max-w-[400px] cursor-pointer"
    >
      <div>
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
            className="size-40 object-cover"
          />
        ) : (
          <div>
            <span>No Image</span>
          </div>
        )}
      </div>

      <div className="flex flex-col ">
        <h3>{movie.title}</h3>
        <p>{releaseYear}</p>
        <div>
          <span>⭐</span>
          <span>{movie.voteAverage.toFixed(1)}</span>
        </div>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}
