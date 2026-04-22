const API_KEY = import.meta.env.VITE_TMDB_API;
const BASE_URL = "https://api.themoviedb.org/3/";

export const fetchRandomMedia = async (filters) => {
  const { type, yearMin, yearMax, ratingMin, ratingMax, genre } = filters;

  // Handle "all" by randomly picking movie or tv
  let mediaType = type === "all" ? (Math.random() > 0.5 ? "movie" : "tv") : type;

  // TMDB only allows up to page 500 in discover
  const page = Math.floor(Math.random() * 20) + 1; 
  
  const url = new URL(`${BASE_URL}discover/${mediaType}`);
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("page", page);
  url.searchParams.append("vote_average.gte", ratingMin / 10);
  url.searchParams.append("vote_average.lte", ratingMax / 10);
  url.searchParams.append("primary_release_date.gte", `${yearMin}-01-01`);
  url.searchParams.append("primary_release_date.lte", `${yearMax}-12-31`);
  if (genre) url.searchParams.append("with_genres", genre);

  const response = await fetch(url.toString());
  const data = await response.json();
  
  if (!data.results || data.results.length === 0) return null;

  const basicItem = data.results[Math.floor(Math.random() * data.results.length)];

  // Get full details (to get runtime/tagline which aren't in 'discover')
  const detailResponse = await fetch(`${BASE_URL}${mediaType}/${basicItem.id}?api_key=${API_KEY}`);
  const fullData = await detailResponse.json();
  
  return { ...fullData, media_type: mediaType };
};