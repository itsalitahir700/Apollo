import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { handlePostRequest } from "../../services/PostTemplate";
import ImagesUpload from "../../components/ImageUpload";

const HireCompanies = ({ rtaCode, hireBusinessData, refreshTasks }) => {
    const [taskData, settaskData] = useState(null);
    const dt = useRef(null);
    const [showModal, setshowModal] = useState(false);
    const [uploaddocs, setuploaddocs] = useState([]);
    const [loading, setloading] = useState(false);
    const [taskCode, settaskCode] = useState(false);

    useEffect(() => {
        settaskData(hireBusinessData);
    }, [hireBusinessData]);

    const NameBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Name</span>
                {rowData?.tblCompanyprofile?.name}
            </React.Fragment>
        );
    };

    const UserBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">User Name</span>
                {rowData?.statususername}
            </React.Fragment>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Status</span>
                {rowData.status === "W" ? (
                    <Badge value="Widthdraw" severity="warning" className="p-mr-2"></Badge>
                ) : rowData.status === "P" ? (
                    <Badge value="Pending" severity="info" className="p-mr-2"></Badge>
                ) : rowData.status === "P" ? (
                    <Badge value="Accepted" severity="success" className="p-mr-2"></Badge>
                ) : (
                    ""
                )}
            </React.Fragment>
        );
    };

    const handleTaskAction = async (rowData) => {
        settaskCode(rowData?.tblTask?.taskcode);
        if (rowData.tblTask.fileupload === "Y") {
            handleFileUpload(rowData);
        } else {
            const data = {
                rtaCode,
                taskCode,
            };
            await handlePostRequest(data, "rta/performTask");
            refreshTasks();
        }
    };

    const handleFileUpload = async (rowData) => {
        setshowModal(true);
    };

    const handleUpload = async () => {
        if (uploaddocs.length) {
            setloading(true);
            const data = { files: uploaddocs, rtaCode, taskCode };
            await handlePostRequest(data, "rta/performTask");
            setloading(false);
            setshowModal(false);
            refreshTasks();
        }
    };

    const actionBodyTemplate = (rowData) => {
        return <React.Fragment>{rowData.status === "N" || rowData.status === "P" ? <Button icon="pi pi-send" className="p-button-rounded p-button-plain p-mr-2" onClick={() => handleTaskAction(rowData)} /> : ""}</React.Fragment>;
    };

    return (
        <div>
            <div className="datatable-filter-demo">
                <div className="card p-datatable-sm">
                    <DataTable ref={dt} value={taskData} stripedRows paginator rows={10} className="p-datatable-customers" emptyMessage="No data found.">
                        <Column field="tblCompanyprofile.name" header="Name" body={NameBodyTemplate} filter sortable  filterMatchMode="contains" />
                        <Column field="statususername" header="User Name" body={UserBodyTemplate} filter sortable  filterMatchMode="contains" />
                        <Column field="status" header="Status" body={statusBodyTemplate} filter sortable  filterMatchMode="contains" />
                        <Column header="Action" body={actionBodyTemplate} filterMatchMode="contains"></Column>
                    </DataTable>
                </div>
            </div>
            <Dialog header="Tasks" visible={showModal} style={{ width: "70vw" }} onHide={() => setshowModal(false)}>
                <ImagesUpload handleImages={setuploaddocs} />
                <center className="p-mt-4">
                    <Button disabled={loading} onClick={handleUpload}>
                        <i className={loading ? "pi pi-spin pi-spinner" : "pi pi-upload p-mr-2"}></i>&nbsp;Upload
                    </Button>
                </center>
            </Dialog>
        </div>
    );
};
export default HireCompanies;
