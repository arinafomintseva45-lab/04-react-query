import axios from "axios";
import type{ MoviesResponse } from "../types/movie";

const API_KEY = "993425227ddde7f187522407a3922218";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const searchMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  const { data } = await api.get<MoviesResponse>("/search/movie", {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });

  return data;
};