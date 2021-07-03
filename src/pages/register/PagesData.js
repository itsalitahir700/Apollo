import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { getAllMenuPages } from "../../services/Pages";
import "./DataTable.css";

const PagesData = ({ pagesData, editRow, viewDetails }) => {
    const [usersData, setusersData] = useState(null);
    const dt = useRef(null);
    const location = useHistory().location;
    const query = queryString.parse(location.search);
    const moduleCode = query.m;

    const funcGetPages = async () => {
        const res = await getAllMenuPages(moduleCode);
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
                {rowData.pagename}
            </React.Fragment>
        );
    };

    const descrfeeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Description</span>
                {rowData.pagedescr}
            </React.Fragment>
        );
    };

    const iconBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Icon</span>
                {rowData.pageicon}
            </React.Fragment>
        );
    };

    const pathBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Path</span>
                {rowData.pagepath}
            </React.Fragment>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Status</span>
                {rowData.pagestatus === "Y" ? <Badge value="Active" severity="success" className="p-mr-2"></Badge> : <Badge value="Inactive" severity="warning" className="p-mr-2"></Badge>}
            </React.Fragment>
        );
    };

    return (
        <div className="datatable-filter-demo">
            <div className="card p-datatable-sm">
                <DataTable ref={dt} value={usersData} paginator rows={10} className="p-datatable-customers" emptyMessage="No data found.">
                    <Column style={{ textAlign: "center" }} field="pagename" header="Name" body={nameBodyTemplate} filter sortable />
                    <Column style={{ textAlign: "center" }} field="pagedescr" header="Description" body={descrfeeBodyTemplate} filter sortable />
                    <Column style={{ textAlign: "center" }} field="pageicon" header="Icon" body={iconBodyTemplate} filter sortable />
                    <Column style={{ textAlign: "center" }} field="pagepath" header="Path" body={pathBodyTemplate} filter sortable />
                    <Column style={{ textAlign: "center" }} field="pagestatus" header="Status" body={statusBodyTemplate} filter sortable />
                    {/* <Column
            style={{ textAlign: "center" }}
            body={actionBodyTemplate}
          ></Column> */}
                </DataTable>
            </div>
        </div>
    );
};
export default PagesData;
