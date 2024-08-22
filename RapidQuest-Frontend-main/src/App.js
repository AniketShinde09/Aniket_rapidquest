import React, { useState } from 'react';
import SalesChart from './components/SalesChart';
import GrowthChart from './components/GrowthChart';
import NewCustomersChart from './components/NewCustomersChart';
import RepeatCustomersChart from './components/RepeatCustomersChart';
import GeographicalDistributionChart from './components/GeographicalDistributionChart';
import CustomerLTVChart from './components/CustomerLTVChart';
import './styles.css';

const App = () => {
  const [interval, setInterval] = useState('monthly');

  return (
    <div className="app-container">
      <header>
        <h1>RapidQuest Dashboard</h1>
        <select onChange={(e) => setInterval(e.target.value)} value={interval}>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </header>
      <main>
        <section>
          <h2>Total Sales Over Time</h2>
          <SalesChart interval={interval} />
        </section>
        <section>
          <h2>Sales Growth Rate Over Time</h2>
          <GrowthChart interval={interval} />
        </section>

        <section>
          <h2>New Customers Added Over Time</h2>
          <NewCustomersChart interval={interval} />
        </section>
        <section>
          <h2>Number of Repeat Customers</h2>
          <RepeatCustomersChart interval={interval} />
        </section>

        <section>
          <h2>Geographical Distribution of Customers</h2>
          <GeographicalDistributionChart />
        </section>

        <section>
          <h2>Customer Lifetime Value by Cohorts</h2>
          <CustomerLTVChart />
        </section>
      </main>
    </div>
  );
};

export default App;

