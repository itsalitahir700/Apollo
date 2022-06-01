import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

function MessagesTable({ messages, loading }) {
    const [expandedRows, setExpandedRows] = useState();

    const skeleteon = () => {
        return <Skeleton></Skeleton>;
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="expanded-card">
                <div className="p-grid">
                    <div className="p-col-5">
                        <div className="box">
                            <strong>Message : </strong>
                            <p>{data?.message || "-"}</p>
                        </div>
                    </div>
                    <div className="p-col-5">
                        <div className="box">
                            <strong>Remarks : </strong>
                            <p>{data?.remarks || "-"}</p>
                        </div>
                    </div>
                    <div className="p-col-2">
                        <div className="box">
                            <strong>From : </strong>
                            <p>admin@apollo.co.uk</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const tableSkeleton = () => {
        return (
            <DataTable value={[{}, {}, {}, {}, {}, {}]}>
                <Column style={{ width: "2.5rem" }} filterMatchMode="contains"></Column>
                <Column body={skeleteon} header="Sent To" sortable filterMatchMode="contains"></Column>
                <Column body={skeleteon} header="User Name" sortable filterMatchMode="contains"></Column>
                <Column body={skeleteon} header="Created On" sortable filterMatchMode="contains"></Column>
                <Column body={skeleteon} header="Current Task" sortable filterMatchMode="contains"></Column>
            </DataTable>
        );
    };

    return (
        <Card>
            {!loading && messages && messages.length ? (
                <DataTable value={messages} dataKey="rtamessagecode" expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={rowExpansionTemplate}>
                    <Column expander style={{ width: "2.5rem" }} filterMatchMode="contains"></Column>
                    <Column field="sentto" header="Sent To" filter sortable filterMatchMode="contains"></Column>
                    <Column field="userName" header="User Name" filter sortable filterMatchMode="contains"></Column>
                    <Column field="createdon" header="Created On" filter sortable filterMatchMode="contains"></Column>
                </DataTable>
            ) : (
                tableSkeleton()
            )}
        </Card>
    );
}

export default MessagesTable;
