import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import "./DataTable.css";

const JobsData = () => {
  const [usersData, setusersData] = useState(null);
  const dt = useRef(null);

  const companyUsersData = useSelector(
    (state) => state.profileSlice.usersData?.data
  );

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
        </DataTable>
      </div>
    </div>
  );
};
export default JobsData;
