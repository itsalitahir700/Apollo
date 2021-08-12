import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getRta } from "../../../services/Rta";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Chip } from "primereact/chip";
import { useHistory } from "react-router-dom";
import "./rtatable.css";

function RTATable() {
    const [rtalist, setrtalist] = useState([]);
    const [loading, setloading] = useState(false);
    const [expandedRows, setExpandedRows] = useState();

    const history = useHistory();

    const getRtaList = useCallback(async () => {
        setloading(true);
        await window.setTimeout(async () => setrtalist(await getRta()), 0);
        setloading(false);
    }, []);

    const skeleteon = () => {
        return <Skeleton></Skeleton>;
    };

    const tableSkeleton = () => {
        return (
            <DataTable value={[{}, {}, {}, {}, {}, {}]}>
                <Column body={skeleteon} header="Created On" sortable filterMatchMode="contains"></Column>
                <Column body={skeleteon} header="Reference Number" sortable filterMatchMode="contains"></Column>
                <Column body={skeleteon} header="Clients Name" sortable filterMatchMode="contains"></Column>
                <Column body={skeleteon} header="Contact Due" sortable filterMatchMode="contains"></Column>
                <Column body={skeleteon} header="Current Task" sortable filterMatchMode="contains"></Column>
                <Column body={skeleteon} header="Status" sortable filterMatchMode="contains"></Column>
                <Column body={skeleteon} header="Acts" filterMatchMode="contains"></Column>
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
                {rowData.editflag === "Y" ? <Button icon="pi pi-pencil" onClick={() => history.push(`rtaCase?id=${rowData?.rtacode}&mode=e`)} className="p-button-rounded p-button-warning p-mr-2" /> : ""}
                <Button icon="pi pi-eye" onClick={() => history.push(`rtaCase?id=${rowData?.rtacode}&mode=v`)} className="p-button-rounded p-button-primary" />
            </div>
        );
    };

    const statusTemplate = (rowData) => {
        return (
            <center>
                <Chip label={rowData?.status} className="p-px-4 custom-chip" />
            </center>
        );
    };

    const nameTemplate = (rowData) => {
        const {firstname,middlename,lastname}=rowData
        return `${firstname!==null ? firstname :""} ${middlename!==null ? middlename :""} ${lastname!==null ? lastname :""}`
    };

    const dateTemplate = (rowData) => { 
            let allDate = rowData.createdon.split(' ')
            let thisDate = allDate[0].split('-')
            let newDate = [thisDate[2],thisDate[1],thisDate[0] ].join("-")
            return newDate    
    };

    return (
        <Card>
            {!loading && rtalist && rtalist.length ? (
                <DataTable value={rtalist} expandedRows={expandedRows} dataKey="rtanumber" onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={rowExpansionTemplate}>
                    <Column expander style={{ width: "2.5rem" }} filterMatchMode="contains"></Column>
                    <Column field="createdon" body={dateTemplate} header="Created On" filter sortable ></Column>
                    <Column field="rtanumber" header="Reference Number" filter sortable filterMatchMode="contains"></Column>
                    <Column body={nameTemplate} header="Name" filter sortable filterMatchMode="contains"></Column>
                    <Column field="contactdue" header="Contact Due" filter sortable filterMatchMode="contains"></Column>
                    <Column field="contactdue" header="Current Task" filter sortable filterMatchMode="contains"></Column>
                    <Column field="status" body={statusTemplate} header="Status" filter sortable filterMatchMode="contains"></Column>
                    <Column body={actionTemplate} header="Acts" filterMatchMode="contains"></Column>
                </DataTable>
            ) : (
                tableSkeleton()
            )}
        </Card>
    );
}

export default RTATable;
