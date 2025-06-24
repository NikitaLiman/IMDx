import { tmdb } from "@/lib/tmdb";

export const GetPersonalInfo = async (id: number) => {
  try {
    const { data } = await tmdb.get(`/person/${id}`);
    console.log(data, "person");
    return data;
  } catch (err: any) {
    console.error(err.message, "INFOCREDIT[ERROR]");
    throw new Error("ERROR");
  }
};
export const GetCreditInfo = async (id: number) => {
  try {
    const { data } = await tmdb.get(`/person/${id}/movie_credits`);
    console.log(data, "person");
    const sortedCredits = data.cast
      .sort((a: any, b: any) => {
        return b.popularity - a.popularity;
      })
      .slice(0, 20);
    return sortedCredits;
  } catch (err: any) {
    console.error(err.message, "INFOCREDIT[ERROR]");
    throw new Error("ERROR");
  }
};
