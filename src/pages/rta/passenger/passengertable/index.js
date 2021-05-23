import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

function PassengerTable({ passengers, handleRemovePassenger }) {
    console.log("PassengerTable", passengers);
    const actionTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" />
                <Button icon="pi pi-trash" onClick={() => handleRemovePassenger(rowData?.id)} className="p-button-rounded p-button-warning" />
            </React.Fragment>
        );
    };

    return (
        <div className="card">
            <DataTable value={passengers}>
                <Column field="firstname" header="Name"></Column>
                <Column field="dob" header="DOB"></Column>
                <Column body={actionTemplate} header="Actions"></Column>
            </DataTable>
        </div>
    );
}

export default PassengerTable;
