import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { handlePostRequest } from "../../services/PostTemplate";
import ImagesUpload from "../../components/ImageUpload";

const TaskData = ({ rtaCode, taskActionData }) => {
    const [taskData, settaskData] = useState(null);
    const dt = useRef(null);
    const [showModal, setshowModal] = useState(false);
    const [uploaddocs, setuploaddocs] = useState([]);
    const [loading, setloading] = useState(false);
    const [taskCode, settaskCode] = useState(false);

    useEffect(() => {
        settaskData(taskActionData);
    }, [taskActionData]);

    const descBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Description</span>
                {rowData.tblTask.descr}
            </React.Fragment>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Status</span>
                {rowData.status === "N" ? <Badge value="New" severity="warning" className="p-mr-2"></Badge> : rowData.status === "P" ? <Badge value="Pending" severity="info" className="p-mr-2"></Badge> : <Badge value="Completed" severity="success" className="p-mr-2"></Badge>}
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
            console.log(data);
            setloading(false);
            setshowModal(false);
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-play" className="p-button-rounded p-button-plain p-mr-2" onClick={() => handleTaskAction(rowData)} />
            </React.Fragment>
        );
    };

    return (
        <div>
            <div className="datatable-filter-demo">
                <div className="card p-datatable-sm">
                    <DataTable ref={dt} value={taskData} paginator rows={10} className="p-datatable-customers" emptyMessage="No customers found.">
                        <Column field="tblTask.descr" header="Description" body={descBodyTemplate} filter sortable />
                        <Column field="status" header="Status" body={statusBodyTemplate} filter sortable />
                        <Column body={actionBodyTemplate}></Column>
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
export default TaskData;
