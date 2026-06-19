import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { searchMovies } from "../../services/tmdb";
import type { MoviesResponse } from "../../types/movie";

import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery<MoviesResponse>({
    queryKey: ["movies", query, page],
    queryFn: () => searchMovies(query, page),
    enabled: Boolean(query),
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      {data && (
        <>
          <MovieGrid movies={data.results} />

          <Pagination
            page={page}
            totalPages={data.total_pages}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
}