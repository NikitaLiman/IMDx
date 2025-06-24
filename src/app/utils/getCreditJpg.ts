export const GetCreditJpg = (path: string | null, size: string) => {
  if (!path) return "/default-image.jpg";

  return `https://image.tmdb.org/t/p/${size}${path}/w185`;
};
