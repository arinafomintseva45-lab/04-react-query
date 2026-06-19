import axios from "axios";

const API_KEY = "993425227ddde7f187522407a3922218";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const searchMovies = async (query: string, page: number) => {
  const { data } = await api.get("/search/movie", {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });

  return data;
};