import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className="backdrop" onClick={handleBackdrop}>
      <div className="modal">
        <button className="closeBtn" onClick={onClose}>
          ✕
        </button>

        <h2>{movie.title}</h2>

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
        />

        <p>{movie.overview}</p>
        <p>Release: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
      </div>
    </div>,
    document.body
  );
}