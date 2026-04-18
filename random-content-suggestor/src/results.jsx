import { useEffect, useState } from 'react'
const Results = () => {
  const [trending, setTrending] = useState(null);
  const [content, setContent] = useState("");
  
  const API_KEY = import.meta.env.VITE_TMDB_API; 
  const BASE_URL = "https://api.themoviedb.org/3/";
  const BASE_IMAGE = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    const randomResult = Math.floor(Math.random() * 20);
    const contentType = Math.floor(Math.random() * 2) + 1;

    let url = contentType === 1 
      ? `${BASE_URL}discover/tv?api_key=${API_KEY}&page=${randomNumber}`
      : `${BASE_URL}discover/movie?api_key=${API_KEY}&page=${randomNumber}`;

    const fetchTrending = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTrending(data.results[randomResult]);
        setContent(contentType === 1 ? "TV" : "Movie");
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchTrending();
  }, [API_KEY]);

  if (!trending) return <h1>Loading...</h1>;

  return (
    <div>
      <div className="poster">
        <img src={BASE_IMAGE + trending.poster_path} alt={trending.title} />
        <p>Type: {content}</p>
      </div>
      <div className="details">
        <h1>{trending.title || trending.name}</h1>
        <p>Rating: {trending.vote_average}</p>
        <p>Released: {trending.release_date || trending.first_air_date}</p>
      </div>
    </div>
  )
}

export default Results;