import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import "./DataTable.css";

const EditViewUsersData = ({ companyUsersData, editRow }) => {
  const [usersData, setusersData] = useState(null);
  const dt = useRef(null);

  useEffect(() => {
    setusersData(companyUsersData);
  }, [companyUsersData]);

  const userfeeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">UserName</span>
        {rowData.loginid}
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Status</span>
        {rowData.status === "Y" ? (
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
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-plain p-mr-2"
          onClick={() => editRow(rowData)}
        />
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-secondary"
          onClick={() => editRow(rowData)}
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
            field="loginid"
            header="User Name"
            body={userfeeBodyTemplate}
            filter
            sortable
          />
          <Column
            style={{ textAlign: "center" }}
            field="status"
            header="Status"
            body={statusBodyTemplate}
            filter
            sortable
          />
          <Column
            style={{ textAlign: "center" }}
            body={actionBodyTemplate}
           filterMatchMode="contains"></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default EditViewUsersData;
