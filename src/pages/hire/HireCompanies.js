import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { handlePostRequest } from "../../services/PostTemplate";
import { Dropdown } from "primereact/dropdown";
import { handleGetRequest } from "../../services/GetTemplate";

const HireCompanies = ({ hireclaimcode, hireBusinessData }) => {
    const [taskData, settaskData] = useState(null);
    const dt = useRef(null);
    const [showModal, setshowModal] = useState(false);
    const [loading, setloading] = useState(false);
    const [companyWiseUser, setcompanyWiseUser] = useState("");
    const [companyWiseUserValue, setcompanyWiseUserValue] = useState("");
    const [hireCompanies, sethireCompanies] = useState("");
    const [hireCompaniesValue, sethireCompaniesValue] = useState("");

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

    const handleUser = async (rowData) => {
        sethireCompaniesValue({ code: rowData.tblCompanyprofile.companycode, name: rowData.tblCompanyprofile.name, type: null });
        setshowModal(true);
        const res = await handleGetRequest(`lovCompanyWiseUSer/${rowData.tblCompanyprofile.companycode}`);
        setcompanyWiseUser(res.data);
    };

    const handleWidthdrawAction = async (rowData) => {
        const data = {
            bussinessStatus: "W",
            status: "W",
            hireclaimcode,
            companyCode: rowData.tblCompanyprofile.companycode,
        };
        await handlePostRequest(data, "hire/changeHireBusinessStatus");
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.status !== "W" ? (
                    <span>
                        <Button icon="pi pi-eject" tooltip="Widthdraw" className="p-button-rounded p-button-info p-button-plain p-mr-2" onClick={() => handleWidthdrawAction(rowData)} />
                        <Button icon="pi pi-user-edit" tooltip="Change User" className="p-button-rounded  p-button-secondary p-button-plain p-mr-2" onClick={() => handleUser(rowData)} />
                    </span>
                ) : (
                    ""
                )}
            </React.Fragment>
        );
    };

    const funcgetLovHireCompanies = async () => {
        const res = await handleGetRequest("lovHireCompanies");
        sethireCompanies(res.data);
    };

    const handleSubmit = async () => {
        const data = {
            userCode: companyWiseUserValue.code,
            hireclaimcode,
            companyCode: hireCompaniesValue.code,
        };
        await handlePostRequest(data, "hire/changeHireBusinessUser");
    };

    useEffect(() => {
        funcgetLovHireCompanies();
    }, []);

    return (
        <div>
            <div className="datatable-filter-demo">
                <div className="card p-datatable-sm">
                    <DataTable ref={dt} value={taskData} stripedRows paginator rows={10} className="p-datatable-customers" emptyMessage="No data found.">
<<<<<<< HEAD
                        <Column field="tblCompanyprofile.name" header="Name" body={NameBodyTemplate} filter sortable />
                        <Column style={{ width: "28%", textAlign: "left" }} field="statususername" header="User Name" body={UserBodyTemplate} filter sortable />
                        <Column style={{ textAlign: "end" }} field="status" header="Status" body={statusBodyTemplate} filter sortable />
                        <Column header="Action" body={actionBodyTemplate}></Column>
=======
                        <Column field="tblCompanyprofile.name" header="Name" body={NameBodyTemplate} filter sortable  filterMatchMode="contains" />
                        <Column field="statususername" header="User Name" body={UserBodyTemplate} filter sortable  filterMatchMode="contains" />
                        <Column field="status" header="Status" body={statusBodyTemplate} filter sortable  filterMatchMode="contains" />
                        <Column header="Action" body={actionBodyTemplate} filterMatchMode="contains"></Column>
>>>>>>> d25ebc89e6507d4f9ba7c312814a6993f02d9225
                    </DataTable>
                </div>
            </div>
            <Dialog header="Hire Business User" visible={showModal} style={{ width: "70vw" }} onHide={() => setshowModal(false)}>
                <div className="p-fluid p-formgrid p-grid" style={{ paddingBottom: "20%" }}>
                    <div className="p-field p-col-12 p-md-6">
                        <label>Hire company</label>
                        <Dropdown disabled options={hireCompanies} value={hireCompaniesValue} placeholder="Select" optionLabel="name" />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label>Hire Company User</label>
                        <Dropdown
                            options={companyWiseUser}
                            value={companyWiseUserValue}
                            onChange={(e) => {
                                setcompanyWiseUserValue(e.value);
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                </div>
                <center className="p-mt-2 p-button-outlined" onClick={handleSubmit}>
                    <Button disabled={loading} icon={loading ? "pi pi-spin pi-spinner" : ""} label="Submit" />
                </center>
            </Dialog>
        </div>
    );
};
export default HireCompanies;
