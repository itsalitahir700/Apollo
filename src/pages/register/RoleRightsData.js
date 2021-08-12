import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { getRoleRights } from "../../services/RoleRights";
import "./DataTable.css";

const RoleRightsData = ({ pagesData, editRow, viewDetails }) => {
    const [usersData, setusersData] = useState(null);
    const dt = useRef(null);
    const location = useHistory().location;
    const query = queryString.parse(location.search);
    const roleCode = query.m;

    const funcGetPages = async () => {
        const res = await getRoleRights(roleCode);
        const pagesData = res.data;
        setusersData(pagesData);
    };

    useEffect(() => {
        funcGetPages();
    }, []);

    useEffect(() => {
        setusersData(pagesData);
    }, [pagesData]);

    const nameBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Name</span>
                {rowData?.tblPage?.tblModule?.modulename}
            </React.Fragment>
        );
    };

    const descrfeeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Page Description</span>
                {rowData?.tblPage?.pagedescr}
            </React.Fragment>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Status</span>
                {rowData.status === "Y" ? <Badge value="Active" severity="success" className="p-mr-2"></Badge> : <Badge value="Inactive" severity="warning" className="p-mr-2"></Badge>}
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
                <Button label="Details" className="p-button-rounded p-button-info" onClick={() => viewDetails(rowData)} />
            </React.Fragment>
        );
    };

    return (
        <div className="datatable-filter-demo">
            <div className="card p-datatable-sm">
                <DataTable ref={dt} value={usersData} paginator rows={10} className="p-datatable-customers" emptyMessage="No data found.">
                    <Column style={{ textAlign: "center" }} field="modulename" header="Module Name" body={nameBodyTemplate} filter sortable />
                    <Column style={{ textAlign: "center" }} field="pagedescr" header="Description" body={descrfeeBodyTemplate} filter sortable />
                    <Column style={{ textAlign: "center" }} field="status" header="Status" body={statusBodyTemplate} filter sortable />
                    {/* <Column
            style={{ textAlign: "center" }}
            body={actionBodyTemplate}
           filterMatchMode="contains"></Column> */}
                </DataTable>
            </div>
        </div>
    );
};
export default RoleRightsData;
