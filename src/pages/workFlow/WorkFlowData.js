import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { handleGetRequest } from "../../services/GetTemplate";
import { handlePostRequest } from "../../services/PostTemplate";
import { getLovCompany, getlovStatus, getlovCompaign, getLovUserCategory } from "../../services/Lovs";
import WorkFlowDetails from "./WorkFlowDetails";
import "./WorkFlow.css";

const WorkFlowData = () => {
    const [workFlowData, setworkFlowData] = useState(null);
    const [showModal, setshowModal] = useState(false);
    const [showModalDetails, setshowModalDetails] = useState(false);
    const [showModalAddDetails, setshowModalAddDetails] = useState(false);
    const [companyCode, setcompanyCode] = useState([]);
    const [companyCodeValue, setcompanyCodeValue] = useState("");
    const [userCategory, setuserCategory] = useState([]);
    const [userCategoryValue, setuserCategoryValue] = useState("");
    const [status, setstatus] = useState([]);
    const [statusValue, setstatusValue] = useState("");
    const [compaign, setcompaign] = useState([]);
    const [compaignValue, setcompaignValue] = useState("");
    const [loading, setloading] = useState(false);
    const [details, setdetails] = useState("");
    const [buttonname, setbuttonname] = useState("");
    const [apiFlagValue, setapiFlagValue] = useState("");
    const [rtaflowcode, setrtaflowcode] = useState("");
    const [taskflag, settaskflag] = useState("");
    const [editflag, seteditflag] = useState("");
    const [acceptflag, setacceptflag] = useState("");
    const [assignflag, setassignflag] = useState("");
    const [rejectflag, setrejectflag] = useState("");
    const [compaignCheck, setcompaignCheck] = useState("");
    const dt = useRef(null);

    const funcGetWorkFlow = async () => {
        const res = await handleGetRequest("rta/getWorkFlow");
        const workflowdata = res.data;
        setworkFlowData(workflowdata);
    };

    const funcgetCircumstances = async () => {
        const res = await getLovCompany();
        setcompanyCode(res);
    };

    const funcgetlovStatus = async () => {
        const res = await getlovStatus();
        setstatus(res);
    };

    const funcgetlovCompaign = async () => {
        const res = await getlovCompaign();
        setcompaign(res);
    };

    const funcgetLovUserCategory = async () => {
        const res = await getLovUserCategory();
        setuserCategory(res);
    };

    const handleAddWorkFlow = async () => {
        setloading(true);
        const listusercategory = userCategoryValue.map((item) => {
            return item.code;
        });
        const usercategoryList = listusercategory.toString();
        const data = {
            companycode: companyCodeValue.code,
            compaingcode: compaignValue.code,
            statuscode: statusValue.code,
            editflag: editflag.code,
            taskflag: taskflag.code,
            usercategory: `${usercategoryList}`,
        };
        await handlePostRequest(data, "rta/addWorkFlow");
        setInitialValue();
        funcGetWorkFlow();
        setloading(false);
        setshowModal(false);
    };

    const setInitialValue = async () => {
        setapiFlagValue("");
        seteditflag("");
        settaskflag("");
        setcompanyCodeValue("");
        setcompaignValue("");
        setbuttonname("");
        setuserCategoryValue("");
        setrtaflowcode("");
        setstatusValue("");
    };

    const handleAddDetails = async () => {
        setloading(true);
        const listusercategory = userCategoryValue.map((item) => {
            return item.code;
        });
        const usercategoryList = listusercategory.toString();
        const data = {
            apiflag: apiFlagValue.code,
            buttonname,
            listusercategory: `${usercategoryList}`,
            rtaflowcode,
            rtastatuscode: statusValue.code,
            caseacceptdialog: acceptflag.code,
            caseassigndialog: assignflag.code,
            caserejectdialog: rejectflag.code,
        };
        await handlePostRequest(data, "rta/addWorkFlowDetail");
        funcGetWorkFlow();
        setloading(false);
        setInitialValue();
        setshowModalAddDetails(false);
    };

    useEffect(() => {
        funcGetWorkFlow();
        funcgetCircumstances();
        funcgetlovStatus();
        funcgetlovCompaign();
        funcgetLovUserCategory();
    }, []);

    const nameBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Compaign Name</span>
                {rowData.tblCompaign.compaignname}
            </React.Fragment>
        );
    };

    const descrfeeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Status</span>
                {rowData.tblRtastatus.descr}
            </React.Fragment>
        );
    };

    const viewDetails = (rowData) => {
        setdetails(rowData.tblRtaflowdetails);
        setshowModalDetails(true);
    };

    const addDetails = (rowData) => {
        setcompaignCheck(rowData?.tblCompaign?.compaignname);
        setrtaflowcode(rowData.rtaflowcode);
        setshowModalAddDetails(true);
    };

    let apiFlag = [
        {
            code: "Y",
            name: "Yes",
            type: null,
        },
        {
            code: "N",
            name: "No",
            type: null,
        },
    ];

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-plus" onClick={() => addDetails(rowData)} className="p-button-rounded p-button-secondary mr-2" />
                <Button icon="pi pi-eye" onClick={() => viewDetails(rowData)} className="p-button-rounded p-button-warning mr-2" />
            </React.Fragment>
        );
    };

    const renderFooter = () => {
        return (
            <div>
                <Button label="Submit" disabled={loading} onClick={handleAddWorkFlow} icon="pi pi-check" className="p-button-success" />
                <Button
                    label="Cancel"
                    icon="pi pi-times"
                    onClick={(e) => {
                        setInitialValue();
                        setshowModal(false);
                        setloading(false);
                    }}
                    className="p-button-danger"
                />
            </div>
        );
    };

    const renderFooterAddDetails = () => {
        return (
            <div>
                <Button label="Submit" disabled={loading} onClick={handleAddDetails} icon="pi pi-check" className="p-button-success" />
                <Button
                    label="Cancel"
                    icon="pi pi-times"
                    onClick={(e) => {
                        setshowModalAddDetails(false);
                        setloading(false);
                        setInitialValue();
                    }}
                    className="p-button-danger"
                />
            </div>
        );
    };

    const header = (
        <div className="header">
            <h3 className="heading-3">Work Flow</h3>
            <Button
                icon="pi pi-plus"
                className="p-button p-button-sucess mb-10px"
                onClick={() => {
                    setshowModal(true);
                }}
            ></Button>
        </div>
    );

    return (
        <div className="datatable-filter-demo">
            <div className="card p-datatable-sm">
                <DataTable header={header} ref={dt} value={workFlowData} paginator rows={10} className="p-datatable-customers" emptyMessage="No data found.">
                    <Column style={{ textAlign: "center" }} field="rolename" header="Compaign Name" body={nameBodyTemplate} filter sortable  filterMatchMode="contains"/>
                    <Column style={{ textAlign: "center" }} field="descr" header="Description" body={descrfeeBodyTemplate} filter sortable   filterMatchMode="contains"/>
                    <Column style={{ textAlign: "center" }} body={actionBodyTemplate} filterMatchMode="contains"></Column>
                </DataTable>
            </div>
            <Dialog header="Add Work Flow" visible={showModal} style={{ width: "50vw" }} footer={renderFooter("displayBasic")} onHide={() => setshowModal(false)}>
                <div className="p-fluid p-formgrid p-grid" style={{ paddingBottom: "30%" }}>
                    <div className="p-field p-col-4">
                        <label>Comapany</label>
                        <Dropdown
                            options={companyCode}
                            value={companyCodeValue}
                            onChange={(e) => {
                                setcompanyCodeValue(e.value);
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                    <div className="p-field p-col-4">
                        <label>Status</label>
                        <Dropdown
                            options={status}
                            value={statusValue}
                            onChange={(e) => {
                                setstatusValue(e.value);
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                    <div className="p-field p-col-4">
                        <label>Compaign</label>
                        <Dropdown
                            options={compaign}
                            value={compaignValue}
                            onChange={(e) => {
                                setcompaignValue(e.value);
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                    <div className="p-field p-col-4">
                        <label>User Category</label>
                        <MultiSelect
                            options={userCategory}
                            value={userCategoryValue}
                            onChange={(e) => {
                                setuserCategoryValue(e.value);
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                    <div className="p-field p-col-4">
                        <label>Task Flag</label>
                        <Dropdown
                            options={[
                                { code: "Y", name: "Yes" },
                                { code: "N", name: "No" },
                            ]}
                            value={taskflag}
                            onChange={(e) => {
                                settaskflag(e.value);
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                    <div className="p-field p-col-4">
                        <label>Edit Flag</label>
                        <Dropdown
                            options={[
                                { code: "Y", name: "Yes" },
                                { code: "N", name: "No" },
                            ]}
                            value={editflag}
                            onChange={(e) => {
                                seteditflag(e.value);
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                </div>
            </Dialog>
            <Dialog header="View Details" visible={showModalDetails} style={{ width: "50vw" }} onHide={() => setshowModalDetails(false)}>
                <div>
                    <WorkFlowDetails details={details} />
                </div>
            </Dialog>
            <Dialog header="Add Details" visible={showModalAddDetails} footer={renderFooterAddDetails} style={{ width: "50vw" }} onHide={() => setshowModalAddDetails(false)}>
                <div className="p-fluid p-formgrid p-grid" style={{ paddingBottom: "15%" }}>
                    <div className="p-field p-col-6">
                        <label>Status</label>
                        <Dropdown
                            options={status}
                            value={statusValue}
                            onChange={(e) => {
                                setstatusValue(e.value);
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                    <div className="p-field p-col-6">
                        <label>User Category</label>
                        <MultiSelect
                            options={userCategory}
                            value={userCategoryValue}
                            onChange={(e) => {
                                setuserCategoryValue(e.value);
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>

                    <div className="p-field p-col-6">
                        <label>Button Name</label>
                        <InputText
                            value={buttonname}
                            onChange={(e) => {
                                setbuttonname(e.target.value);
                            }}
                            placeholder="Button Name"
                        />
                    </div>
                    {compaignCheck === "RTA" ? (
                        <div className="p-field p-col-6">
                            <label>Api Flag</label>
                            <Dropdown
                                options={apiFlag}
                                value={apiFlagValue}
                                onChange={(e) => {
                                    setapiFlagValue(e.value);
                                }}
                                placeholder="Select"
                                optionLabel="name"
                            />
                        </div>
                    ) : (
                        ""
                    )}

                    {compaignCheck === "HIRE" ? (
                        <React.Fragment>
                            {" "}
                            <div className="p-field p-col-6 ">
                                <label>Case Accepting Flag</label>
                                <Dropdown
                                    options={[
                                        { code: "Y", name: "Yes" },
                                        { code: "N", name: "No" },
                                    ]}
                                    value={acceptflag}
                                    onChange={(e) => {
                                        setacceptflag(e.value);
                                    }}
                                    placeholder="Select"
                                    optionLabel="name"
                                />
                            </div>
                            <div className="p-field p-col-6 ">
                                <label>Case Assigning Flag</label>
                                <Dropdown
                                    options={[
                                        { code: "Y", name: "Yes" },
                                        { code: "N", name: "No" },
                                    ]}
                                    value={assignflag}
                                    onChange={(e) => {
                                        setassignflag(e.value);
                                    }}
                                    placeholder="Select"
                                    optionLabel="name"
                                />
                            </div>
                            <div className="p-field p-col-6 ">
                                <label>Case Reject Flag</label>
                                <Dropdown
                                    options={[
                                        { code: "Y", name: "Yes" },
                                        { code: "N", name: "No" },
                                    ]}
                                    value={rejectflag}
                                    onChange={(e) => {
                                        setrejectflag(e.value);
                                    }}
                                    placeholder="Select"
                                    optionLabel="name"
                                />
                            </div>
                        </React.Fragment>
                    ) : (
                        ""
                    )}
                </div>
            </Dialog>
        </div>
    );
};
export default WorkFlowData;
