import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
} from 'chart.js';

// Register components and plugins
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

const SalesChart = ({ interval }) => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get(`https://rapidquest-xv5p.onrender.com/total-sales?interval=${interval}`)
      .then(response => {
        const salesData = response.data;
        console.log(salesData)
        setData({
          labels: salesData.map(item => item._id.year),
          datasets: [
            {
              label: 'Total Sales',
              data: salesData.map(item => item.totalSales),
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,  // This option requires the Filler plugin
            }
          ]
        });
      })
      .catch(error => console.error('Error fetching sales data:', error));
  }, [interval]);

  return (
    <div className="chart-container">
      <Line 
        data={data} 
        options={{ 
          responsive: true, 
          plugins: { 
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: (context) => `Total Sales: ${context.raw}`
              }
            }
          } 
        }} 
      />
    </div>
  );
};

export default SalesChart;


