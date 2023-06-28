import React, { useState, useEffect } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

import { scheduleData } from '../data/dummy';
import { Header } from '../components';

// eslint-disable-next-line react/destructuring-assignment
const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState();
  const [scheduleData2, setSecheduleData] = useState({});
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/community/all');
        const data1 = await response.json();
        const allSession = data1
          .flatMap(x => x.sessions) // Flatten the array of session arrays
          .filter(session => session.length > 0); // Filter out non-empty sessions
        // console.log(allSession);
        let k = 25;
        const obj = await Promise.all(allSession.map(async (x) => {
          const response2 = await fetch(`http://localhost:9000/api/session_details/${x}`);
          const data2 = await response2.json();
          const endtime2 = data2.date;
          const date = new Date(endtime2);
          date.setHours(date.getHours() + 1); // Increment the hour by 1
          const updatendTime = date.toISOString().replace(/T(\d{2}):/, (match, hour) => `T${hour.padStart(2, "0")}:`);

          const updateddata = {
            Id: k++,
            Subject: data2.category,
            Location: data2.district,
            StartTime: data2.date,
            EndTime: updatendTime,
            CategoryColor: "#1aaa55",
          }
          return updateddata;
        }));
        console.log(obj)
        setSecheduleData(obj);
        console.log(scheduleData2);
        console.log(scheduleData);


      } catch {

      }
    }
    fetchdata();
  }, [])

  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Sessions" title="Calendar" />
      <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date()}
        eventSettings={{ dataSource: scheduleData2 }}
        dragStart={onDragStart}
      >
        <ViewsDirective>
          {['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
      <PropertyPane>
        <table
          style={{ width: '100%', background: 'white' }}
        >
          <tbody>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                <DatePickerComponent
                  value={new Date()}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>
  );
};

export default Scheduler;
