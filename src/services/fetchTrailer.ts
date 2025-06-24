import { tmdb } from "@/lib/tmdb";

export const GetMovieTrailer = async (movieId: number) => {
  const res = await tmdb.get(`/movie/${movieId}/videos`);
  const data = res.data;
  const trailers = data.results.filter(
    (video: any) => video.type === "Trailer" && video.site === "YouTube"
  );
  console.log(trailers, "trailers");
  return trailers[0]?.key || null;
};
export const GetTvTrailer = async (TvId: number) => {
  const res = await tmdb.get(`/tv/${TvId}/videos`);
  const data = res.data;

  const trailers = data.results.filter(
    (video: any) => video.type === "Trailer" && video.site === "YouTube"
  );
  console.log(trailers, "trailers");
  return trailers[0]?.key || null;
};
