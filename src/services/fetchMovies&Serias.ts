import { tmdb } from "@/lib/tmdb";

export const GetMovies = async () => {
  const res = await tmdb.get("/movie/popular");
  console.log(res.data);
};

export const GetUpComingMovies = async () => {
  const res = await tmdb.get("/movie/upcoming");
  console.log(res.data);
};
export const GetWeeklyMovies = async () => {
  const res = await tmdb.get("/trending/movie/week");
  console.log(res.data, "awdada");
  return res.data;
};
export const GetReleaseMovies = async () => {
  const res = await tmdb.get("/movie/now_playing");
  console.log(res.data.results.slice(0, 5), "release movies");
  return res.data.results.slice(0, 5);
};
export const getMovieRecommendations = async (id: number) => {
  const res = await tmdb.get(`/movie/${id}/recommendations`);
  const sortbyPopularity = res.data.results.sort(
    (a: any, b: any) => b.popularity - a.popularity
  );
  return sortbyPopularity;
};

export const getTvRecommendations = async (id: number) => {
  const res = await tmdb.get(`/tv/${id}/recommendations`);
  const sortbyPopularity = res.data.results.sort(
    (a: any, b: any) => b.popularity - a.popularity
  );
  return sortbyPopularity;
};

export const GetCurrentMovie = async (id: number) => {
  const res = await tmdb.get(`/movie/${id}`);
  console.log(res.data);
  return res.data;
};
export const GetSerias = async () => {
  const res = await tmdb.get("/trending/tv/week");
  console.log(res.data, "tv");
  return res.data.results;
};
export const GetSeriasCurrent = async (id: number) => {
  const res = await tmdb.get(`/tv/${id}`);
  console.log(res.data, "tvwadaw");
  return res.data;
};
