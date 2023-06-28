//chote graph chahiye ho to

import React from 'react';
import { pieChartData } from '../data/dummy';
import { ChartsHeader, Pie as PieChart } from '../components';

const CommunityStatus = () => (
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader category="Pie" title="Project Cost Breakdown" />
    <div className="w-full flex flex-wrap">
      <div className="w-full md:w-1/2 lg:w-1/4 p-2">
        <PieChart id="chart-pie" data={pieChartData} legendVisiblity height="170" />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4 p-2">
        <PieChart id="chart-pie-2" data={pieChartData} legendVisiblity height="170" />
      </div>
      {/* Add more PieChart components with appropriate column classes */}
    </div>
  </div>
);

export default CommunityStatus;