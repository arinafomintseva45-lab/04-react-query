import axios from "axios";
import type { Movie } from "../types/movie";

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export const searchMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  const { data } = await api.get<MoviesResponse>("/search/movie", {
    params: { query, page },
  });

  return data;
};