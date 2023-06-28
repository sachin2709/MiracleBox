import React from 'react';
//pie chart 
import { pieChartData } from '../data/dummy';
import { ChartsHeader, Pie as PieChart } from '../components';


//bar chart

import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';

import { barCustomSeries, barPrimaryXAxis, barPrimaryYAxis } from '../data/dummy';


//area chart 
import {   DateTime, SplineAreaSeries } from '@syncfusion/ej2-react-charts';
import { areaCustomSeries, areaPrimaryXAxis, areaPrimaryYAxis } from '../data/dummy';


import { useStateContext } from '../contexts/ContextProvider';


const CommunityStatus = () => {
    const { currentMode } = useStateContext();

    return(
    <>

    {/* //pie chart */}
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader category="People Engagement" title="Prople From Different Community Joined Us 😍" />
    <div className="w-full">
      <PieChart id="chart-pie" data={pieChartData} legendVisiblity height="full" />
    </div>
    
  </div>

  {/* //bar graph  */}
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="People Beneifeted" title="People Affected in Different Aspects" />
      <div className=" w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={barPrimaryXAxis}
          primaryYAxis={barPrimaryYAxis}
          chartArea={{ border: { width: 0.5 } }}
          tooltip={{ enable: true }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
          legendSettings={{ background: 'white' }}
        >
          <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
          <SeriesCollectionDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {barCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
    

    

    

  

  </>
  );
};

export default CommunityStatus;
