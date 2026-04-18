import React from 'react'
import Results from './results';
import Filter from './filter';
import './app.css'

const App = () => {
  return (
    <div className="main-container">
      <Filter />
      <Results />
    </div>
  );
}

export default App;