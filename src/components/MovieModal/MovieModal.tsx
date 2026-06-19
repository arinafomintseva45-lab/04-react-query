import type { Movie } from "../../types/movie";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  if (!movie) return null;

  return (
    <div className="backdrop">
      <div className="modal">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}