import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import "./DataTable.css";

const JobsData = () => {
    const [jobsData, setjobsData] = useState(null);
    const dt = useRef(null);

    const companyJobsData = useSelector((state) => state.profileSlice.jobsFreshData);

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
                {rowData.childfee}
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

    const scotchildfeeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Scot Child Fee</span>
                {rowData.scotchildfee}
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

    return (
        <div className="datatable-filter-demo">
            <div className="card p-datatable-sm">
                <DataTable ref={dt} value={jobsData} paginator rows={10} className="p-datatable-customers" emptyMessage="No customers found.">
                    <Column field="compaigndescr" header="Compaign" body={compaignfeeBodyTemplate} filter sortable />
                    <Column field="adultfee" header="Adult Fee" body={adultfeeBodyTemplate} filter sortable />
                    <Column field="childfee" header="Child Fee" body={childfeeBodyTemplate} filter sortable />
                    <Column field="scotadultfee" header="Scot Adult Fee" body={scotadultfeeBodyTemplate} filter sortable />
                    <Column field="childpostreforms" header="Child Post Reforms" body={childpostreformsBodyTemplate} filter sortable />
                    <Column field="adultpostreforms" header="Adult Post Reforms" body={adultpostreformsBodyTemplate} filter sortable />
                    <Column field="scotchildfee" header="Scot Child Fee" body={scotchildfeeBodyTemplate} filter sortable />
                    <Column field="status" header="Status" body={statusBodyTemplate} filter sortable />
                </DataTable>
            </div>
        </div>
    );
};
export default JobsData;
