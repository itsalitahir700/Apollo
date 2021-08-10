import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

function MessagesTable({ messages, loading }) {
    const skeleteon = () => {
        return <Skeleton></Skeleton>;
    };

    const tableSkeleton = () => {
        return (
            <DataTable value={[{}, {}, {}, {}, {}, {}]}>
                <Column body={skeleteon} header="Sent To" sortable></Column>
                <Column body={skeleteon} header="User Name" sortable></Column>
                <Column body={skeleteon} header="Message" sortable></Column>
                <Column body={skeleteon} header="Created On" sortable></Column>
                <Column body={skeleteon} header="Current Task" sortable></Column>
                <Column body={skeleteon} header="Remarks" sortable></Column>
                <Column body={skeleteon} header="Acts"></Column>
            </DataTable>
        );
    };

    const actionTemplate = (rowData) => {
        return (
            <center>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" />
                <Button icon="pi pi-eye" className="p-button-rounded p-button-primary" />
            </center>
        );
    };
    return (
        <Card>
            {!loading && messages && messages.length ? (
                <DataTable value={messages} dataKey="rtamessagecode">
                    <Column field="sentto" header="Sent To" filter sortable></Column>
                    <Column field="userName" header="User Name" filter sortable></Column>
                    <Column field="message" header="Message" filter sortable></Column>
                    <Column field="createdon" header="Created On" filter sortable></Column>
                    <Column field="remarks" header="Remarks" filter sortable></Column>
                    <Column body={actionTemplate} header="Acts"></Column>
                </DataTable>
            ) : (
                tableSkeleton()
            )}
        </Card>
    );
}

export default MessagesTable;
