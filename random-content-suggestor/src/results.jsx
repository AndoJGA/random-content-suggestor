import { useEffect, useState } from 'react';
import { fetchRandomMedia } from './services';

const Results = ({ filters }) => {
  const [trending, setTrending] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_IMAGE = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchRandomMedia(filters);
        setTrending(data);
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [filters]); // Refetches every time 'filters' object changes

  const formatDuration = (data) => {
    let minutes = data.runtime || (data.episode_run_time && data.episode_run_time[0]);
    if (!minutes) return "TBD";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (loading) return <div className="loading">Finding something great...</div>;
  if (!trending) return <div className="loading">No results found. Try adjusting filters.</div>;

  return (
    <div className="result" 
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${trending.backdrop_path ? BASE_IMAGE + trending.backdrop_path : ''})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="poster">
        <img src={trending.poster_path ? BASE_IMAGE + trending.poster_path : 'placeholder.jpg'} alt={trending.title || trending.name} />
        <p className="badge">{trending.media_type?.toUpperCase()}</p>
      </div>
      
      <div className="details">
        <h1>{trending.title || trending.name}</h1>
        <p className="genres">{trending.genres?.map(g => g.name).join(', ')}</p>
      
        <div className="metadata">
          <span className="year">{(trending.release_date || trending.first_air_date || "").slice(0, 4)}</span>
          <span className="rating">★ {(trending.vote_average * 10).toFixed(0)}%</span>
          <span className="runtime">{formatDuration(trending)}</span>
        </div>
        
        {trending.tagline && <p className="tagline">"{trending.tagline}"</p>}
        <p className="overview">{trending.overview}</p>

        <div className="buttons">
          <button className="btn-primary">Save for Later</button>
          <button className="btn-secondary">Mark Watched</button>
        </div>
      </div>
    </div>
  );
};

export default Results;