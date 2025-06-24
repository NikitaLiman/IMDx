import { tmdb } from "@/lib/tmdb";

export const getMovieCredits = async (id: number) => {
  try {
    const { data } = await tmdb.get(`/movie/${id}/credits`);
    console.log(data, "creditsMovies");
    const sortedCredits = data.cast.sort((a: any, b: any) => {
      a.order - b.order;
    });
    return sortedCredits;
  } catch (error: any) {
    console.error(error.message);
    throw new Error("MOVIE-CREDITS[ERROR]");
  }
};

export const getTVCredits = async (id: number) => {
  try {
    const { data } = await tmdb.get(`/tv/${id}/aggregate_credits`);
    const sortedCredits = data.cast.sort((a: any, b: any) => {
      a.order - b.order;
    });

    return sortedCredits;
  } catch (error: any) {
    console.error(error.message);
    throw new Error("TV-CREDITS[ERROR]");
  }
};

export const GetPopularPersons = async () => {
  try {
    const res = await tmdb.get(`/person/popular`);
    console.log(res.data.results, "adfweqafew ");
    return res.data.results;
  } catch (error: any) {
    console.error(error.message);
    throw new Error("TV-CREDITS[ERROR]");
  }
};

export const GetListOfPersons = async (limit = 100) => {
  try {
    const totalPeople: any[] = [];
    const pagesNeeded = Math.ceil(limit / 20);

    for (let page = 1; page <= pagesNeeded; page++) {
      const res = await tmdb.get(`/person/popular`, {
        params: { page },
      });
      totalPeople.push(...res.data.results);
    }

    return totalPeople.slice(0, limit);
  } catch (error: any) {
    console.error(error.message);
    throw new Error("POPULAR-PERSONS[ERROR]");
  }
};
