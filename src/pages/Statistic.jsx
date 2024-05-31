// src/App.js

import React from 'react';
import Chart from '../components/BarChart.jsx';

function Statistic() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Chart Example</h1>
        <Chart />
      </header>
    </div>
  );
}

export default Statistic;
