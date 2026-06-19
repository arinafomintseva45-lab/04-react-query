import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import SearchBar from "../SearchBar/SearchBar";
import MovieList from "../MovieList/MovieList";
import Pagination from "../Pagination/Pagination";

import { searchMovies } from "../../services/tmdb";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => searchMovies(query, page),
    enabled: Boolean(query),
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />

      {isLoading && <p>Loading...</p>}

      {isError && <p>Error loading movies</p>}

      {data && (
        <>
          <MovieList movies={data.results} />

          <Pagination
            page={page}
            totalPages={data.total_pages}
            setPage={setPage}
          />
        </>
      )}
    </>
  );
}