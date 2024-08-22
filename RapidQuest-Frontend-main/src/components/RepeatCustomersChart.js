import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const RepeatCustomersChart = ({ interval }) => {
    const [data, setData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        axios.get(`https://rapidquest-xv5p.onrender.com/repeat-customers?interval=${interval}`)
            .then(response => {
                const repeatCustomersData = response.data;
                console.log(repeatCustomersData)
                setData({
                    labels: repeatCustomersData.map(item => item._id
                        .year),
                    datasets: [
                        {
                            label: 'Repeat Customers',
                            data: repeatCustomersData.map(item => item.repeatCustomers),
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                        }
                    ]
                });
            })
            .catch(error => console.error('Error fetching repeat customers data:', error));
    }, [interval]);

    return (
        <div className="chart-container">
            <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>
    );
};

export default RepeatCustomersChart;
