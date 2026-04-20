import { useState } from 'react';

const Filter = () => {
  const currentYear = new Date().getFullYear();
  const minYear = 1927;

  const [type, setType] = useState("all");
  const [years, setYears] = useState({ min: 2010, max: currentYear });
  const [rating, setRating] = useState({ min: 70, max: 100 });

  const getPercent = (value, min, max) => ((value - min) / (max - min)) * 100;

  return (
    <div className="filter-card">
      {/* Type Toggle */}
      <div className="filter-section">
        <div className="content-group">
          {["movie", "tv", "all"].map((id) => (
            <label key={id} htmlFor={id} className={`radio-btn ${type === id ? 'active' : ''}`}>
              <input 
                type="radio" 
                id={id}
                name="content-type"
                className="hidden-radio" 
                checked={type === id}
                onChange={() => setType(id)} 
              />
              {id.toUpperCase()}
            </label>
          ))}
        </div>
      </div>

      {/* Year Slider */}
      <div className="filter-section">
        <div className="range-labels">
          <span>Year: {years.min}</span>
          <span>{years.max}</span>
        </div>
        <div className="range-slider">
          <div 
            className="range-track" 
            style={{ 
              left: `${getPercent(years.min, minYear, currentYear)}%`, 
              right: `${100 - getPercent(years.max, minYear, currentYear)}%` 
            }} 
          />
          <input
            type="range" min={minYear} max={currentYear} value={years.min}
            onChange={(e) => setYears({ ...years, min: Math.min(Number(e.target.value), years.max - 1) })}
            className="range-input"
          />
          <input
            type="range" min={minYear} max={currentYear} value={years.max}
            onChange={(e) => setYears({ ...years, max: Math.max(Number(e.target.value), years.min + 1) })}
            className="range-input"
          />
        </div>
      </div>

      {/* Rating Slider */}
      <div className="filter-section">
        <div className="range-labels">
          <span>Score: {rating.min}</span>
          <span>{rating.max}</span>
        </div>
        <div className="range-slider">
          <div 
            className="range-track" 
            style={{ left: `${rating.min}%`, right: `${100 - rating.max}%` }} 
          />
          <input
            type="range" min="0" max="100" value={rating.min}
            onChange={(e) => setRating({ ...rating, min: Math.min(Number(e.target.value), rating.max - 1) })}
            className="range-input"
          />
          <input
            type="range" min="0" max="100" value={rating.max}
            onChange={(e) => setRating({ ...rating, max: Math.max(Number(e.target.value), rating.min + 1) })}
            className="range-input"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;