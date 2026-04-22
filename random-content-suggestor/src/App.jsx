import React, { useState } from 'react'
import Results from './results';
import Filter from './filter';
import './app.css'

const App = () => {
  // 1. Initialize the state with your default starting filters
  const [activeFilters, setActiveFilters] = useState({
    type: "all",
    yearMin: 1990,
    yearMax: new Date().getFullYear(),
    ratingMin: 70,
    ratingMax: 100,
    genre: ""
  });

  // 2. This function is the "bridge"
  // It receives the data from Filter.jsx and saves it here
  const handleSearch = (newFilters) => {
    setActiveFilters({ ...newFilters });
  };

  return (
    <div className="main-container">
      {/* 3. Pass the handler to Filter */}
      <Filter onSearch={handleSearch} />
      
      {/* 4. Pass the actual state to Results */}
      <Results filters={activeFilters} />
    </div>
  );
}

export default App;