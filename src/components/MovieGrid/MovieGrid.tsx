import type { Movie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}