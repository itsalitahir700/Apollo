import React, { useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function WorkFlowDetails({ details }) {
    console.log("details :: ", details);
    const dt = useRef(null);

    const nameBodyTemplate = (rowData) => {
        return <React.Fragment>{rowData.buttonname}</React.Fragment>;
    };

    const descrfeeBodyTemplate = (rowData) => {
        return <React.Fragment>{rowData.apiflag === "Y" ? "Yes" : rowData.apiflag === "N" ? "No" : "-"}</React.Fragment>;
    };

    const statusBodyTemplate = (rowData) => {
        return <React.Fragment>{rowData.tblRtastatus.descr}</React.Fragment>;
    };

    return (
        <div>
            <div className="datatable-filter-demo">
                <div className="card p-datatable-sm">
                    <DataTable ref={dt} value={details} paginator rows={6} className="p-datatable-customers" emptyMessage="No data found.">
                        <Column style={{ textAlign: "center" }} field="buttonname" header="Button Name" body={nameBodyTemplate} filter sortable />
                        <Column style={{ textAlign: "center" }} field="apiflag" header="API Flag" body={descrfeeBodyTemplate} filter sortable />
                        <Column style={{ textAlign: "center" }} field="tblRtastatus.descr" header="Status" body={statusBodyTemplate} filter sortable />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default WorkFlowDetails;
