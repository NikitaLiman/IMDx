import { SearchResultItem } from "@/interfaces";

export function getTitle(item: SearchResultItem) {
  if (item?.media_type === "movie") return item?.title ?? "";
  if (item?.media_type === "tv") return item?.name ?? "";
  if (item?.media_type === "person") return item?.name ?? "";
  if (item?.media_type === "company" || (!item?.media_type && item?.name)) {
    return item?.name ?? "";
  }
  return "";
}
export function getImagePath(item: SearchResultItem) {
  if (item?.media_type === "movie" || item?.media_type === "tv")
    return item?.poster_path;
  if (item?.media_type === "person") return item?.profile_path;
  if (
    item?.media_type === "company" ||
    (!item?.media_type && item?.logo_path)
  ) {
    return item.logo_path;
  }
  return null;
}
export function getYear(item: SearchResultItem) {
  if (item.media_type === "movie" && item.release_date)
    return new Date(item.release_date).getFullYear();
  if (item.media_type === "tv" && item.first_air_date)
    return new Date(item.first_air_date).getFullYear();
  return null;
}

export function getKnowFor(item: SearchResultItem) {
  if (item?.media_type === "movie" || item?.media_type === "tv")
    return item?.popularity;
  if (item?.media_type === "person")
    return item?.known_for.map((item) => item.original_title);
  if (item?.media_type === "company") return item?.logo_path;
  return null;
}
