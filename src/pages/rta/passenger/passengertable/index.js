import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import PassengerModal from "../../passenger";

function PassengerTable({ passengers, handleRemovePassenger, handleUpdatePassenger, isView, viewmode }) {
    let states = [
        {
            code: "Y",
            name: "Mr",
            type: null,
        },
        {
            code: "N",
            name: "Ms",
            type: null,
        },
    ];
    const [passenger, setpassenger] = useState();
    const [displayBasic, setDisplayBasic] = useState(false);

    const actionTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" onClick={() => handleEditPassenger(rowData)} className="p-button-rounded p-button-success p-mr-2" />
                <Button icon="pi pi-trash" onClick={() => handleRemovePassenger(rowData?.id)} className="p-button-rounded p-button-warning" />
            </React.Fragment>
        );
    };
    const actionTemplateView = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-eye" onClick={() => handleEditPassenger(rowData)} className="p-button-rounded p-button-success p-mr-2" />
            </React.Fragment>
        );
    };
    const handleEditPassenger = (passenger) => {
        setpassenger(passenger);
        setDisplayBasic(true);
    };

    return (
        <div className="card">
            <DataTable value={passengers}>
                <Column field="firstname" header="Name" sortable></Column>
                <Column field="dob" header="DOB" sortable></Column>
                {isView === true ? <Column body={actionTemplateView} header="Actions"></Column> : <Column body={actionTemplate} header="Actions"></Column>}
            </DataTable>
            <PassengerModal status={states} viewmode={viewmode} show={displayBasic} hide={setDisplayBasic} passenger={passenger} handlePassengerReturn={handleUpdatePassenger} isEdit={true} />
        </div>
    );
}

export default PassengerTable;
