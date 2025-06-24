import { tmdb } from "@/lib/tmdb";

export const SearchMovies = async (query: string, type: string) => {
  try {
    let endpoint = "";
    switch (type) {
      case "multi":
        endpoint = "/search/multi";
        break;
      case "titles":
        endpoint = "/search/multi";
        break;
      case "companies":
        endpoint = "/search/company";
        break;
      default:
        endpoint = "/search/multi";
    }
    const { data } = await tmdb.get(endpoint, {
      params: { query },
    });

    if (type === "titles") {
      return data.results
        .filter(
          (item: any) => item.media_type === "movie" || item.media_type === "tv"
        )
        .sort((a: any, b: any) => b.popularity - a.popularity);
    }
    const sortedData = data.results.sort(
      (a: any, b: any) => b.popularity - a.popularity
    );
    return sortedData;
  } catch (err: any) {
    console.error(err.message, "SEARCH[ERROR]");
    throw new Error("ERROR");
  }
};
