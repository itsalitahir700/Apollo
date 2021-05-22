import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { getAllModules } from "../../../services/Module";
import "./DataTable.css";

const ModuleData = ({ moduleData, editRow, viewDetails }) => {
  const [usersData, setusersData] = useState(null);
  const dt = useRef(null);

  const funcGetModules = async () => {
    const res = await getAllModules();
    const moduleData = res.data;
    setusersData(moduleData);
  };

  useEffect(() => {
    funcGetModules();
  }, []);

  useEffect(() => {
    setusersData(moduleData);
  }, [moduleData]);

  const nameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Name</span>
        {rowData.modulename}
      </React.Fragment>
    );
  };

  const descrfeeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Description</span>
        {rowData.descr}
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Status</span>
        {rowData.modulestatus === "Y" ? (
          <Badge value="Active" severity="success" className="p-mr-2"></Badge>
        ) : (
          <Badge value="Inactive" severity="warning" className="p-mr-2"></Badge>
        )}
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-plain p-mr-2"
          onClick={() => editRow(rowData)}
        /> */}
        <Button
          label="Details"
          className="p-button-rounded p-button-info"
          onClick={() => viewDetails(rowData)}
        />
      </React.Fragment>
    );
  };

  return (
    <div className="datatable-filter-demo">
      <div className="card p-datatable-sm">
        <DataTable
          ref={dt}
          value={usersData}
          paginator
          rows={10}
          className="p-datatable-customers"
          emptyMessage="No customers found."
        >
          <Column
            style={{ textAlign: "center" }}
            field="modulename"
            header="Name"
            body={nameBodyTemplate}
            filter
            sortable
          />
          <Column
            style={{ textAlign: "center" }}
            field="descr"
            header="Description"
            body={descrfeeBodyTemplate}
            filter
            sortable
          />
          <Column
            style={{ textAlign: "center" }}
            field="modulestatus"
            header="Status"
            body={statusBodyTemplate}
            filter
            sortable
          />
          <Column
            style={{ textAlign: "center" }}
            body={actionBodyTemplate}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default ModuleData;
