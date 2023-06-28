import React from "react";

import { Button, ChartsHeader } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

// import {   DateTime, SplineAreaSeries } from '@syncfusion/ej2-react-charts';

import {
    DateTime,
  SplineAreaSeries,
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  ColumnSeries,
  DataLabel,
  
} from "@syncfusion/ej2-react-charts";

import {
  barCustomSeries,
  barPrimaryXAxis,
  barPrimaryYAxis,
  allPeopleGrid,
  allPeopleData
} from "../data/dummy";

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
} from "@syncfusion/ej2-react-grids";

import { sessionsData, contextMenuItems, sessionsGrid } from "../data/dummy";
import { Header } from "../components";

import { areaCustomSeries, areaPrimaryXAxis, areaPrimaryYAxis } from '../data/dummy';


const AllPeople = () => {
  const { currentColor, currentMode } = useStateContext();
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <>
      <div className="m-4 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="All People" />
        <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Area" title="Inflation Rate in percentage" />
      <div className="w-full">
        <ChartComponent
          id="charts"
          primaryXAxis={areaPrimaryXAxis}
          primaryYAxis={areaPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          background={currentMode === 'Dark' ? '#33373E' : '#fff'}
          legendSettings={{ background: 'white' }}
          height="50%"
        >
          <Inject services={[SplineAreaSeries, DateTime, Legend]} />
          <SeriesCollectionDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {areaCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
{/* //People  */}
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Header category="Page" title="All People" />
          <div style={{overflow:'scroll'}}>
          <GridComponent
            id="gridcomp"
            dataSource={allPeopleData}
            allowPaging
            allowSorting
            allowExcelExport
            allowPdfExport
            contextMenuItems={contextMenuItems}
            editSettings={editing}
            
          >
            <ColumnsDirective>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              {allPeopleGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject
              services={[
                Resize,
                Sort,
                ContextMenu,
                Filter,
                Page,
                ExcelExport,
                Edit,
                PdfExport,
              ]}
            />
          </GridComponent>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPeople;
