import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const GrowthChart = ({ interval }) => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get(`https://rapidquest-xv5p.onrender.com/sales-growth?interval=${interval}`)
      .then(response => {
        const growthData = response.data;
        // console.log(growthData)
        setData({
          labels: growthData.map(item => item.period.year),
          datasets: [
            {
              label: 'Sales Growth Rate (%)',
              data: growthData.map(item => item.growthRate),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
            }
          ]
        });
      })
      .catch(error => console.error('Error fetching growth data:', error));
  }, [interval]);

  return (
    <div className="chart-container">
      <Line data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
};

export default GrowthChart;
