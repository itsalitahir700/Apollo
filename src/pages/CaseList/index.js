import React, { useState } from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import {Button} from 'primereact/button'
import { getRtaCaseReport } from '../../services/Rta';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CSVLink } from "react-csv";
import { Chip } from "primereact/chip";
import {FaFileExcel} from "react-icons/all"

function CaseList() {
  const [rtacases, setrtacases] = useState([])
  const [expandedRows, setExpandedRows] = useState();
  const [loading, setloading] = useState(false)
  const [value, onChange] = useState([new Date(), new Date()]);

  const  formatDate= (input) => {
    var datePart = input.match(/\d+/g),
    year = datePart[0], // get only two digits
    month = datePart[1], day = datePart[2];
   return day+'-'+month+'-'+year;
  }

  const dateTemplate = (rowData) => { 
    let allDate = rowData.date_created.split(' ')
    let thisDate = allDate[0].split('-')
    let newDate = [thisDate[2],thisDate[1],thisDate[0] ].join("-")
    return newDate    
};

  const searchCases=async()=>
  {
    setloading(true)
    setrtacases(await getRtaCaseReport(formatDate(value[0].toISOString().slice(0, 10)),formatDate(value[1].toISOString().slice(0, 10))))
    setloading(false) 
}


  const statusTemplate = (rowData) => {
    return (
        <center>
            <Chip label={rowData?.status} className="p-px-4 custom-chip" />
        </center>
    );
 };

 const headers = [
    { label: "Date Created", key: "date_created" },
    { label: "Reference Number", key: "reference_number" },
    { label: "Client Name", key: "client_name" },
    { label: "Accident Date", key: "accident_date" },
    { label: "Introducer", key: "introducer" },
    { label: "Aml", key: "aml" },
    { label: "CFA", key: "cfa" },
    { label: "Solicitor", key: "solicitor" },
    { label: "Submitted On", key: "submitted_on" },
    { label: "DOB", key: "date_of_birth" },
    { label: "Proof Of ID", key: "proof_of_id" },
    { label: "Proof Of Address", key: "proof_of_address" },
    { label: "Current Task", key: "current_task" },
    { label: "Status", key: "status" },
    
  ];

  const rowExpansionTemplate = (data) => {
    return (
        <div className="expanded-card">
            <div className="p-grid">
                <div className="p-col-4">
                    <div className="box">
                        <strong>Introducer : </strong>
                        <p>{data?.introducer||''}</p>
                    </div>
                    <div className="box">
                        <strong> AML: </strong>
                        <p>{data?.aml==="Y" ? "Yes" : 'No'}</p>
                    </div>
                    <div className="box">
                        <strong>CFA : </strong>
                        <p>{data?.cfa==="Y" ? "Yes" : 'No'}</p>
                    </div>
                </div>
                <div className="p-col-4">
                    <div className="box">
                        <strong>Solicitor : </strong>
                        <p>{data?.solicitor||''}</p>
                    </div>
                    <div className="box">
                        <strong>Submitted On : </strong>
                        <p>{data?.submitted_on}</p>
                    </div>
                    <div className="box">
                        <strong>DOB : </strong>
                        <p>{data?.date_of_birth}</p>
                    </div>
                </div>
                <div className="p-col-4">
                    <div className="box">
                        <strong>Proof of ID : </strong>
                        <p>{data?.proof_of_id==="Y"?"Yes":"No"}</p>
                    </div>
                    <div className="box">
                        <strong>Proof of Address : </strong>
                        <p>{data?.proof_of_id==="Y"?"Yes":"No"}</p>
                    </div>
                    <div className="box">
                        <strong>Current Task : </strong>
                        <p>{data?.current_task||''}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

  return (
    <>
    <div className="expanded-card p-d-flex p-jc-between">
      <div className="p-d-flex "><DateTimeRangePicker
        autoFocus={true}
        format="y-MM-dd"
        onChange={onChange}
        value={value}
      />
      &nbsp;
      <Button disabled={loading} label={loading ? "Searching..." : "Search" } onClick={searchCases}/>
      </div> 
      <CSVLink data={rtacases} headers={headers}><Button disabled={loading}><FaFileExcel/>&nbsp;Export</Button></CSVLink>
    </div>
    
    <DataTable value={rtacases} expandedRows={expandedRows} paginator="true" dataKey="rtacode" onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={rowExpansionTemplate}>
      <Column expander style={{ width: "2.5rem" }} filterMatchMode="contains"></Column>
      <Column field="date_created"  body={dateTemplate}  header="Created On" filter sortable  filterMatchMode="contains"></Column>
      <Column field="reference_number" header="Reference Number" filter sortable filterMatchMode="contains"></Column>
      <Column  field="client_name" header="Client Name" filter sortable filterMatchMode="contains"></Column>
      <Column field="accident_date" header="Accident Date" filter sortable filterMatchMode="contains"></Column>
      <Column field="status"  body={statusTemplate}  header="Status" filter sortable filterMatchMode="contains"></Column>
    </DataTable>
    </>

  );
}
export default CaseList