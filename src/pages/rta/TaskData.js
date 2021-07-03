import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { handlePostRequest } from "../../services/PostTemplate";

const TaskData = ({ rtaCode, taskActionData }) => {
    const [taskData, settaskData] = useState(null);
    const dt = useRef(null);

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
        console.log("res ::", rowData);
        const data = {
            rtaCode,
            taskCode: rowData?.tblTask?.taskcode,
        };
        await handlePostRequest(data, "rta/performTask");
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-play" className="p-button-rounded p-button-plain p-mr-2" onClick={() => handleTaskAction(rowData)} />
            </React.Fragment>
        );
    };

    return (
        <div className="datatable-filter-demo">
            <div className="card p-datatable-sm">
                <DataTable ref={dt} value={taskData} paginator rows={10} className="p-datatable-customers" emptyMessage="No customers found.">
                    <Column field="tblTask.descr" header="Description" body={descBodyTemplate} filter sortable />
                    <Column field="status" header="Status" body={statusBodyTemplate} filter sortable />
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    );
};
export default TaskData;
