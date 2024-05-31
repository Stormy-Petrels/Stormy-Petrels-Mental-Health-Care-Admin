import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getTotalApointment');
        const data = await response.json();
        if (data && data.totalApointments) {
          const labels = data.totalApointments.map(appointment => appointment.doctorName);
          const counts = data.totalApointments.map(appointment => parseInt(appointment.totalCount));
          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'Doctor',
                data: counts,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return chartData ? <Bar data={chartData} options={options} /> : <div>Loading...</div>;
};

export default BarChart;
