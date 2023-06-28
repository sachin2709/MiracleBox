import React, { useState } from "react";

import { pieChartData, peopleData } from "../data/dummy";
import { peopleGrid} from './demo3'
import { Button, ChartsHeader, Pie as PieChart } from "../components";
// import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { } from "../"

//bar chart

import {
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

import { sessionsData, contextMenuItems } from "../data/dummy";
import { Header } from "../components";

import { LineChart } from '../components';
import { useEffect } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";

// import { useStateContext } from "../contexts/ContextProvider";

const SessionDetails = () => {
  const { currentColor, currentMode } = useStateContext();
  const [header, setHeader] = useState('');
  const [peopleList, setPeopleList] = useState([]);
  const { id } = useParams();

  const editing = { allowDeleting: true, allowEditing: true };
  useEffect(() => {

    const fetchData = async () => {
      try {

        const response1 = await fetch(`http://localhost:9000/api/session_details/${id}`);
        const data1 = await response1.json();
        setHeader(data1.name);

        const response2 = await fetch(`http://localhost:9000/api/session/people/${id}`);
        const data2 = await response2.json();
        // console.log(data2);
        setPeopleList(data2)
        peopleList.push(data2)
        // console.log(sessionList);
        // console.log(sessions)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])
  let grid;
  const navigate = useNavigate();
  // const rowSelected = () => {
  //   console.log("dnkk");
  //   if (grid) {
  //     /** Get the selected row indexes */
  //     const selectedrowindex = grid.getSelectedRowIndexes();
  //     /** Get the selected records. */
  //     const selectedrecords = grid.getSelectedRecords();
  //     // console.log(selectedrecords);
  //     alert(selectedrowindex + " : " + JSON.stringify(selectedrecords));
  //     // const linkid=sessionList[selectedrowindex]._id;
  //     navigate(`/community/session_details/people/${selectedrecords[0]._id}`);
  //   }
  // };

  return (
    <>
      <div className="m-4 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl overflow-scroll">
        <Header category="Session" title={`${header} Details`} />
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
            <ChartsHeader category="Line" title="Inflation Rate" />
            <div className="w-full">
              <LineChart />
            </div>
          </div>

          {/* //bar graph  */}
          <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
            <ChartsHeader
              category="People Beneifeted"
              title="People Affected in Different Aspects"
            />
            <div className=" w-full">
              <ChartComponent
                id="charts"
                width="300px" // Set the desired width
                height="300px" // Set the desired height
                primaryXAxis={barPrimaryXAxis}
                primaryYAxis={barPrimaryYAxis}
                chartArea={{ border: { width: 0.2 } }}
                tooltip={{ enable: true }}
                background={currentMode === "Dark" ? "#33373E" : "#fff"}
                legendSettings={{ background: "white" }}
              >
                <Inject
                  services={[
                    ColumnSeries,
                    Legend,
                    Tooltip,
                    Category,
                    DataLabel,
                  ]}
                />
                <SeriesCollectionDirective>
                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                  {barCustomSeries.map((item, index) => (
                    <SeriesDirective key={index} {...item} />
                  ))}
                </SeriesCollectionDirective>
              </ChartComponent>
            </div>
          </div>
        </div>

        {/* //People  */}
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <div className='flex justify-between'>
            <Header category={header} title="Peoples" />
            <div className="mt-3" onClick={() => { }}>
              <Link to={`/add_people/${id}`}>
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Add New People"
                  borderRadius="10px"
                />
              </Link>
            </div>
          </div>

          <div style={{ overflow: 'scroll' }} className="cursor-pointer">
            <GridComponent
              id="gridcomp"
              dataSource={peopleList}
              allowPaging
              allowSorting
              allowExcelExport
              allowPdfExport
              contextMenuItems={contextMenuItems}
              editSettings={editing}
              // rowSelected={rowSelected} ref={g => grid = g}

            >
              <ColumnsDirective>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                {peopleGrid.map((item, index) => (
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

export default SessionDetails;
