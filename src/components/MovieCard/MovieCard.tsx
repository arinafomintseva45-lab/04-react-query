import type { Movie } from "../../types/movie";

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

export default function MovieCard({ movie, onSelect }: MovieCardProps) {
  return (
    <li onClick={() => onSelect(movie)}>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
    </li>
  );
}