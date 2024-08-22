import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const CustomerLTVChart = () => {
    const [data, setData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        axios.get(`https://rapidquest-xv5p.onrender.com/customer-ltv-cohorts`)
            .then(response => {
                const ltvData = response.data;
                console.log(ltvData)
                setData({
                    labels: ltvData.map(item => item._id),
                    datasets: [
                        {
                            label: 'Customer Lifetime Value',
                            data: ltvData.map(item => item.avgLTV),
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                        }
                    ]
                });
            })
            .catch(error => console.error('Error fetching customer LTV data:', error));
    }, []);

    return (
        <div className="chart-container">
            <Bar data={data} options={{
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { callbacks: { label: (context) => `LTV: ${context.raw}` } }
                }
            }}
            />
        </div>
    );
};

export default CustomerLTVChart;
