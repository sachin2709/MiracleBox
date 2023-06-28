import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Search } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid, volReqData, volReqGrid } from './demo2';
import { Header } from '../components';



const VolReq = () => {
  const toolbarOptions = ['Search'];
  const editing = { allowDeleting: true, allowEditing: true };
  const [volunteerList, setvolunteerList] = useState([]);
  useEffect(() => {
    fetch('http://localhost:9000/api/user/all').then(response => {
      response.json().then(posts => {
        const updatedData = posts
          .filter(obj => obj.role === 0) // Filter records with role = 0
          .map(obj => {
            // Adding the 'btnText' property to each object

            const updatedobj = { ...obj, btnText: "Approve" }
            updatedobj.date = new Date(updatedobj.createdAt).toLocaleString("en-GB");
            return updatedobj;
          });

        setvolunteerList(updatedData)
        volunteerList.push(updatedData)
        console.log(volunteerList);
      })
    })

  }, [])

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Requests" />
      <GridComponent
        id="gridcomp"
        dataSource={volunteerList}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {volReqGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search]} />
      </GridComponent>


    </div>

  );
};
export default VolReq;
