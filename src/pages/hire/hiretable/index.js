import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { handleGetRequest } from "../..//../services/GetTemplate";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Chip } from "primereact/chip";
import { useHistory } from "react-router-dom";
import "./HireTable.css";

function HireTable() {
    const [rtalist, setrtalist] = useState([]);
    const [loading, setloading] = useState(false);
    const [expandedRows, setExpandedRows] = useState();

    const history = useHistory();

    const getRtaList = useCallback(async () => {
        setloading(true);
        await window.setTimeout(async () => {
            const res = await handleGetRequest("hire/getHireCases");
            setrtalist(res.data);
        }, 0);
        setloading(false);
    }, []);

    const skeleteon = () => {
        return <Skeleton></Skeleton>;
    };

    const tableSkeleton = () => {
        return (
            <DataTable value={[{}, {}, {}, {}, {}, {}]}>
                <Column body={skeleteon} header="Creation On" sortable></Column>
                <Column body={skeleteon} header="Code" sortable></Column>
                <Column body={skeleteon} header="Name" sortable></Column>
                <Column body={skeleteon} header="Contact Due" sortable></Column>
                <Column body={skeleteon} header="Current Task" sortable></Column>
                <Column body={skeleteon} header="Status" sortable></Column>
                <Column body={skeleteon} header="Actions"></Column>
            </DataTable>
        );
    };

    useEffect(() => {
        getRtaList();
    }, [getRtaList]);

    const rowExpansionTemplate = (data) => {
        return (
            <div className="expanded-card">
                <div className="p-grid">
                    <div className="p-col-4">
                        <div className="box">
                            <strong>Address : </strong>
                            <p>{data?.address1 || data?.address2 || data?.address3 || data?.gaddress1 || data?.gaddress2 || data?.gaddress3}</p>
                        </div>
                        <div className="box">
                            <strong>Tel : </strong>
                            <p>{data?.mobile || data?.landline}</p>
                        </div>
                        <div className="box">
                            <strong>Email : </strong>
                            <p>{data?.email || data?.gemail}</p>
                        </div>
                    </div>
                    <div className="p-col-4">
                        <div className="box">
                            <strong>Accident Time : </strong>
                            <p>{data?.acctime + " " + data?.accdate}</p>
                        </div>
                        <div className="box">
                            <strong>Accident Description : </strong>
                            <p>{data?.description}</p>
                        </div>
                        <div className="box">
                            <strong>Injury Description : </strong>
                            <p>{data?.injdescription}</p>
                        </div>
                    </div>
                    <div className="p-col-4">
                        <div className="box">
                            <strong>Introducer : </strong>
                            <p>{data?.introducer}</p>
                        </div>
                        <div className="box">
                            <strong>Solicitor : </strong>
                            <p>{data?.solicter}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const actionTemplate = (rowData) => {
        return (
            <div>
                {/* by pass for now */}
                {rowData.editflag !== "Y" ? <Button icon="pi pi-pencil" onClick={() => history.push(`hireCase?id=${rowData?.hirecode}&mode=e`)} className="p-button-rounded p-button-warning p-mr-2" /> : ""}
                <Button icon="pi pi-eye" onClick={() => history.push(`hireCase?id=${rowData?.hirecode}&mode=v`)} className="p-button-rounded p-button-primary" />
            </div>
        );
    };

    const statusTemplate = (rowData) => {
        return (
            <center>
                <Chip label={rowData?.tblRtastatus?.descr} className="p-px-4 custom-chip" />
            </center>
        );
    };

    return (
        <Card>
            {!loading && rtalist && rtalist.length ? (
                <DataTable value={rtalist} expandedRows={expandedRows} dataKey="rtanumber" onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={rowExpansionTemplate}>
                    <Column expander style={{ width: "2.5rem" }}></Column>
                    <Column field="createdon" header="Creation On" filter sortable></Column>
                    <Column field="hirenumber" header="Code" filter sortable></Column>
                    <Column field="firstname" header="Name" filter sortable></Column>
                    <Column field="contactdue" header="Contact Due" filter sortable></Column>
                    <Column field="status" body={statusTemplate} header="Status" filter sortable></Column>
                    <Column body={actionTemplate} header="Actions"></Column>
                </DataTable>
            ) : (
                tableSkeleton()
            )}
        </Card>
    );
}

export default HireTable;
