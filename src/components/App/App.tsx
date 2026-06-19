import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { searchMovies } from "../../services/movieService";

import type { Movie } from "../../types/movie";
import type { MoviesResponse } from "../../services/movieService";

import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isFetching, isError, isSuccess } =
    useQuery<MoviesResponse>({
      queryKey: ["movies", query, page],
      queryFn: () => searchMovies(query, page),
      enabled: Boolean(query),
      placeholderData: keepPreviousData,
    });

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  if (isSuccess && data?.results.length === 0) {
    toast.error("No movies found");
  }

  return (
    <div className={css.container}>
      <Toaster />

      <SearchBar onSubmit={handleSearch} />

      {(isLoading || isFetching) && <Loader />}

      {isError && <ErrorMessage />}

      {data && data.results.length > 0 && (
        <>
          <MovieGrid
            movies={data.results}
            onSelect={setSelectedMovie}
          />

          <Pagination
            pageCount={data.total_pages}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
          />
        </>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}