import { useEffect, useState } from 'react';

const Results = () => {
  const [trending, setTrending] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_TMDB_API;
  const BASE_URL = "https://api.themoviedb.org/3/";
  const BASE_IMAGE = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const controller = new AbortController();

    const getRandomData = async () => {
      try {
        setLoading(true);
        const randomNumber = Math.floor(Math.random() * 500) + 1;
        const isTV = Math.floor(Math.random() * 2) === 0;
        const mediaType = isTV ? "tv" : "movie";

        const listUrl = `${BASE_URL}discover/${mediaType}?api_key=${API_KEY}&page=${randomNumber}`;
        const listResponse = await fetch(listUrl, { signal: controller.signal });
        const listData = await listResponse.json();

        if (listData.results && listData.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * listData.results.length);
          const basicItem = listData.results[randomIndex];

          const detailUrl = `${BASE_URL}${mediaType}/${basicItem.id}?api_key=${API_KEY}`;
          const detailResponse = await fetch(detailUrl, { signal: controller.signal });
          const fullDetailData = await detailResponse.json();

          setTrending(fullDetailData);
          setContent(isTV ? "TV" : "Movie");
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error fetching data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    getRandomData();

    return () => controller.abort();
  }, [API_KEY]);

  const formatDuration = (data) => {
    let minutes = data.runtime || 
                  (data.episode_run_time && data.episode_run_time[0]) || 
                  data.last_episode_to_air?.runtime;

    if (!minutes || minutes <= 0) return "TBD";

    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }

    return `${minutes}m`;
  };

  if (loading) return <div className="loading">Loading spotlight...</div>;
  if (!trending) return null;

  return (
    <div className="result" 
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9)), url(${trending.backdrop_path ? BASE_IMAGE + trending.backdrop_path : ''})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="poster">
        <img 
          src={trending.poster_path ? BASE_IMAGE + trending.poster_path : 'placeholder.jpg'} 
          alt={trending.title || trending.name} 
        />
        <p className="badge">{content}</p>
      </div>
      
      <div className="details">
        <h1>{trending.title || trending.name}</h1>

        <p className="genres">
          {trending?.genres?.map(genre => genre.name).join(', ')}
        </p>
      
        <div className="metadata">
          <span className="year">
            {(trending.release_date || trending.first_air_date || "").slice(0, 4)}
          </span>
          <span className="rating">{(trending.vote_average * 10).toFixed(0)}</span>
          <span className="runtime">{formatDuration(trending)}</span>
        </div>
        
        {trending.tagline && <p className="tagline">"{trending.tagline}"</p>}

        {trending.overview && <p className="overview">{trending.overview}</p>}

        <div className="buttons">
          <button className="btn-primary">Re-spin</button>
          <button className="btn-secondary">Save for Later</button>
          <button className="btn-secondary">Mark Watched</button>
        </div>
      </div>
    </div>
  );
};

export default Results;