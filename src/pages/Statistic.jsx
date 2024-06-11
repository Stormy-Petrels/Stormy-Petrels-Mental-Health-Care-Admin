// src/App.js

import React from 'react';
import Chart from '../components/BarChart.jsx';
import Appointment from './Appointments';

function Statistic() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Total slot appointment each doctor</h1>
        <Chart />
      </header>
    </div>
  );
}

export default Statistic;
