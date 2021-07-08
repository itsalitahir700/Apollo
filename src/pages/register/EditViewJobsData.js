import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import "./DataTable.css";

const EditViewJobsData = ({ editRow, companyJobsData }) => {
    const [jobsData, setjobsData] = useState(null);
    const dt = useRef(null);

    useEffect(() => {
        setjobsData(companyJobsData);
    }, [companyJobsData]);

    const compaignfeeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Compaign</span>
                {rowData.tblCompaign.compaignname}
            </React.Fragment>
        );
    };

    const adultfeeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Adult Fee</span>
                {rowData.adultfee}
            </React.Fragment>
        );
    };

    const childfeeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Child Fee</span>
                {rowData.childfee}
            </React.Fragment>
        );
    };

    const scotadultfeeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Scot Adult Fee</span>
                {rowData.scotadultfee}
            </React.Fragment>
        );
    };

    const scotchildfeeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Scot Child Fee</span>
                {rowData.scotchildfee}
            </React.Fragment>
        );
    };

    const childpostreformsBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Child Post Reforms</span>
                {rowData.childpostreforms}
            </React.Fragment>
        );
    };

    const adultpostreformsBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Adult Post Reforms</span>
                {rowData.adultpostreforms}
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
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-plain p-mr-2" onClick={() => editRow(rowData)} />
                <Button icon="pi pi-eye" className="p-button-rounded p-button-secondary" onClick={() => editRow(rowData)} />
            </React.Fragment>
        );
    };

    return (
        <div className="datatable-filter-demo">
            <div className="card p-datatable-sm">
                <DataTable ref={dt} value={jobsData} paginator rows={10} className="p-datatable-customers" emptyMessage="No customers found.">
                    <Column field="compaigndescr" header="Compaign" body={compaignfeeBodyTemplate} filter sortable />
                    <Column field="adultfee" header="Adult Fee" body={adultfeeBodyTemplate} filter sortable />
                    <Column field="childfee" header="Child Fee" body={childfeeBodyTemplate} filter sortable />
                    <Column field="scotadultfee" header="Scot Adult Fee" body={scotadultfeeBodyTemplate} filter sortable />
                    <Column field="scotchildfee" header="Scot Child Fee" body={scotchildfeeBodyTemplate} filter sortable />
                    <Column field="childpostreforms" header="Child Post Reforms" body={childpostreformsBodyTemplate} filter sortable />
                    <Column field="adultpostreforms" header="Adult Post Reforms" body={adultpostreformsBodyTemplate} filter sortable />
                    <Column field="status" header="Status" body={statusBodyTemplate} filter sortable />
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    );
};
export default EditViewJobsData;
