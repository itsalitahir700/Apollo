import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import PassengerModal from "../../passenger";

function PassengerTable({ passengers, handleRemovePassenger, handleUpdatePassenger, isView, viewmode }) {
    let states = [
        {
            code: "Mr",
            name: "Mr",
            type: null,
        },
        {
            code: "Mrs",
            name: "Mrs",
            type: null,
        },
        {
            code: "Miss",
            name: "Miss",
            type: null,
        },
        {
            code: "Ms",
            name: "Ms",
            type: null,
        },
        {
            code: "Mstr",
            name: "Mstr",
            type: null,
        },
        {
            code: "Dr",
            name: "Dr",
            type: null,
        },
        {
            code: "Prof",
            name: "Prof",
            type: null,
        },
        {
            code: "Rev",
            name: "Rev",
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
                {isView === true ? <Column body={actionTemplateView} header="Acts"></Column> : <Column body={actionTemplate} header="Acts"></Column>}
            </DataTable>
            <PassengerModal status={states} viewmode={viewmode} show={displayBasic} hide={setDisplayBasic} passenger={passenger} handlePassengerReturn={handleUpdatePassenger} isEdit={true} />
        </div>
    );
}

export default PassengerTable;
