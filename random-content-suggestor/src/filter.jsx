import { useState } from 'react';

const Filter = ({ onSearch }) => {
  const currentYear = new Date().getFullYear();
  const minYear = 1927;

  const [localFilters, setLocalFilters] = useState({
    type: "movie",
    yearMin: 2010,
    yearMax: currentYear,
    ratingMin: 70,
    ratingMax: 100,
    genre: ""
  });

  const updateFilter = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const getPercent = (value, min, max) => ((value - min) / (max - min)) * 100;

  return (
    <div className="filter-card">
      {/* Type Toggle */}
      <div className="filter-section">
        <div className="content-group">
          {["movie", "tv"].map((id) => (
            <label key={id} className={`radio-btn ${localFilters.type === id ? 'active' : ''}`}>
              <input 
                type="radio" 
                className="hidden-radio" 
                checked={localFilters.type === id}
                onChange={() => updateFilter('type', id)} 
              />
              {id.toUpperCase()}
            </label>
          ))}
        </div>
      </div>

      {/* Year Slider */}
      <div className="filter-section">
        <div className="range-labels">
          <span>{localFilters.yearMin} - {localFilters.yearMax}</span>
        </div>
        <div className="range-slider">
          <div 
            className="range-track" 
            style={{ 
              left: `${getPercent(localFilters.yearMin, minYear, currentYear)}%`, 
              right: `${100 - getPercent(localFilters.yearMax, minYear, currentYear)}%` 
            }} 
          />
          <input
            type="range" min={minYear} max={currentYear} value={localFilters.yearMin}
            onChange={(e) => updateFilter('yearMin', Math.min(Number(e.target.value), localFilters.yearMax - 1))}
            className="range-input"
          />
          <input
            type="range" min={minYear} max={currentYear} value={localFilters.yearMax}
            onChange={(e) => updateFilter('yearMax', Math.max(Number(e.target.value), localFilters.yearMin + 1))}
            className="range-input"
          />
        </div>
      </div>

      {/* Genre List */}
      <div className="genre-section">
        <select 
          value={localFilters.genre} 
          onChange={(e) => updateFilter('genre', e.target.value)}
        >
          <option value="">Any Genre</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="14">Fantasy</option>
          <option value="36">History</option>
          <option value="27">Horror</option>
          <option value="9648">Mystery</option>
          <option value="10749">Romance</option>
          <option value="878">Sci-Fi</option>
          <option value="53">Thriller</option>
        </select>
      </div>

      {/* Rating Slider */}
      <div className="filter-section">
        <div className="range-labels">
          {/* Corrected labels to show ratings */}
          <span>Score: {localFilters.ratingMin} - {localFilters.ratingMax}</span>
        </div>
        <div className="range-slider">
          <div 
            className="range-track" 
            style={{ 
              /* Fix: Use 0 and 100 for the min/max math of a rating slider */
              left: `${getPercent(localFilters.ratingMin, 0, 100)}%`, 
              right: `${100 - getPercent(localFilters.ratingMax, 0, 100)}%` 
            }} 
          />
          <input
            type="range" min="0" max="100" value={localFilters.ratingMin}
            onChange={(e) => updateFilter('ratingMin', Math.min(Number(e.target.value), localFilters.ratingMax - 1))}
            className="range-input"
          />
          <input
            type="range" min="0" max="100" value={localFilters.ratingMax}
            onChange={(e) => updateFilter('ratingMax', Math.max(Number(e.target.value), localFilters.ratingMin + 1))}
            className="range-input"
          />
        </div>
      </div>


      <button 
        className="btn-primary" 
        onClick={() => onSearch(localFilters)}
      >
        Re-spin
      </button>
    </div>
  );
};

export default Filter;