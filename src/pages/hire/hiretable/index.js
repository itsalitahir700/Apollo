import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { handleGetRequest } from "../..//../services/GetTemplate";
import { Skeleton } from "primereact/skeleton";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Chip } from "primereact/chip";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CopyHiretoRta } from "../../../redux/actions/claimantAction";
import "./HireTable.css";

function HireTable() {
    const [rtalist, setrtalist] = useState([]);
    const [loading, setloading] = useState(false);
    const [expandedRows, setExpandedRows] = useState();
    const [visible, setVisible] = useState(false);
    const [hireCode, sethireCode] = useState("");

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
                <Column body={skeleteon} header="Created On" sortable filterMatchMode="contains"></Column>
                <Column body={skeleteon} header="Reference Number" sortable filterMatchMode="contains"></Column>
                <Column body={skeleteon} header="Client Name" sortable filterMatchMode="contains"></Column>
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

    const confirmCopy = (hireCode) => {
        setVisible(true);
        sethireCode(hireCode);
    };
    const dispatch = useDispatch();
    const accept = async () => {
        const data = {
            hireCode,
            rtaCode: "",
        };
        const res = await dispatch(CopyHiretoRta(data, "/rta/copyHireToRta"));
        if (res?.responsecode === 1) history.push(`hireCase?id=${res?.data?.rtacode}&mode=v`);
    };

    const actionTemplate = (rowData) => {
        return (
            <div>
                {/* by pass for now */}
                {rowData.editflag !== "Y" ? <Button tooltip="Edit" icon="pi pi-pencil" onClick={() => history.push(`hireCase?id=${rowData?.hirecode}&mode=e`)} className="p-button-rounded p-button-warning p-mr-2" /> : ""}
                <Button tooltip="View" icon="pi pi-eye" onClick={() => history.push(`hireCase?id=${rowData?.hirecode}&mode=v`)} className="p-button-rounded p-button-primary p-mr-2" />
                <Button tooltip="Copy to RTA" icon="pi pi-copy" onClick={() => confirmCopy(rowData?.hirecode)} className="p-button-rounded p-button-info" />
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
                    <Column expander style={{ width: "2.5rem" }} filterMatchMode="contains"></Column>
                    <Column field="createdon" header="Created On" filter sortable filterMatchMode="contains"></Column>
                    <Column field="hirenumber" header="Reference Number" filter sortable filterMatchMode="contains"></Column>
                    <Column field="firstname" header="Name" filter sortable filterMatchMode="contains"></Column>
                    <Column field="contactdue" header="Contact Due" filter sortable filterMatchMode="contains"></Column>
                    <Column field="status" body={statusTemplate} header="Status" filter sortable filterMatchMode="contains"></Column>
                    <Column body={actionTemplate} header="Acts" filterMatchMode="contains"></Column>
                </DataTable>
            ) : (
                tableSkeleton()
            )}
            <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?" header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} />
        </Card>
    );
}

export default HireTable;
