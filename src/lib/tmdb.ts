import axios from "axios";

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const api_key = process.env.NEXT_PUBLIC_API_KEY;

console.log(api_key);
export const tmdb = axios.create({
  baseURL: BaseUrl,
  params: {
    api_key: api_key,
    language: "en-US",
  },
});
