import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const NewCustomersChart = ({ interval }) => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get(`https://rapidquest-xv5p.onrender.com/new-customers?interval=${interval}`)
      .then(response => {
        const newCustomersData = response.data;
         console.log(newCustomersData)
        setData({
          labels: newCustomersData.map(item => item._id.year),
          datasets: [
            {
              label: 'New Customers',
              data: newCustomersData.map(item => item.count),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            }
          ]
        });
      })
      .catch(error => console.error('Error fetching new customers data:', error));
  }, [interval]);

  return (
    <div className="chart-container">
      <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
};

export default NewCustomersChart;
