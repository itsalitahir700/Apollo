import React, { useState, useEffect, useCallback } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Badge } from "primereact/badge";
import { getClaimantDetails, ActionOnHire } from "../../redux/actions/claimantAction";
import ClaimantInfo from "./claimantinfo";
import AccidentInfo from "./AccidentInfo";
import VehiclesInfo from "./VehiclesInfo";
import MinorModal from "./minormodal";
import { RadioButton } from "primereact/radiobutton";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { claimantdetails, minordetails, accidentdetails, vehicledetails } from "../../utilities/constants";
import { handleGetRequest } from "../../services/GetTemplate";
import HireCompanies from "./HireCompanies";
import "./Hire.css"

function ViewClaimant() {
    const url = require("url");
    const urlObj = url.parse(document.location.href, true);

    const [claimantDetails, setClaimantDetails] = useState(claimantdetails);
    const [minorDetails, setMinorDetails] = useState(minordetails);
    const [accidentDetails, setAccidentDetails] = useState(accidentdetails);
    const [vehicleDetails, setVehicleDetails] = useState(vehicledetails);
    const [showMinorModal, setShowMinorModal] = useState(false);
    const claimantstore = useSelector((state) => state.claimantSlice.claimantDetails);
    const [viewmode] = useState(true);
    const [hireActionModal, sethireActionModal] = useState(false);
    const [hireCompanies, sethireCompanies] = useState("");
    const [hireCompaniesValue, sethireCompaniesValue] = useState("");
    const [companyWiseUser, setcompanyWiseUser] = useState("");
    const [companyWiseUserValue, setcompanyWiseUserValue] = useState("");
    const [btnValue, setbtnValue] = useState("");
    const [message, setmessage] = useState("");
    const [caseDialogs, setcaseDialogs] = useState("");
    const [acceptanceFor, setacceptanceFor] = useState("");
    const [mode, setmode] = useState("");
    const [bookingDate, setbookingDate] = useState("");
    const [hireStartDate, sethireStartDate] = useState("");
    const [hireEndDate, sethireEndDate] = useState("");
    const [caseOutsourced, setcaseOutsourced] = useState("");
    const [caseOutsourcedTo, setcaseOutsourcedTo] = useState("");
    const [caseOutsourcedReason, setcaseOutsourcedReason] = useState("");
    const [loading, setloading] = useState(false);
    const [loadingIcon, setloadingIcon] = useState("");
    const [hireBusinessData, sethireBusinessData] = useState("");
    const [showModal, setshowModal] = useState(false);
    const hireActionButtons = useSelector((state) => state.claimantSlice.claimantDetails.hireActionButtons);
    const hirenumber = useSelector((state) => state.claimantSlice?.claimantDetails?.hirenumber);
    const status = useSelector((state) => state.claimantSlice?.claimantDetails?.tblRtastatus?.descr);

    const dispatch = useDispatch();

    const fetchClaimantDetails = useCallback(() => {
        const hireCode = urlObj?.query?.id;
        dispatch(getClaimantDetails("hire/getHireCaseById/", hireCode));
    }, [dispatch, urlObj?.query?.id]);

    useEffect(() => {
        fetchClaimantDetails();
    }, [fetchClaimantDetails]);

    const breakpoints = { "960px": "75vw", "640px": "100vw" };

    const mapData = useCallback(() => {
        if (Object.keys(claimantstore).length) {
            let newclaimantObj = {};
            let newminorObj = {};
            let newaccidentObj = {};
            let newvehicleObj = {};
            Object.keys(claimantstore).forEach((element) => {
                if (element in claimantDetails) {
                    newclaimantObj[element] = claimantstore[element];
                }
                if (element in minorDetails) {
                    newminorObj[element] = claimantstore[element];
                }
                if (element in accidentdetails) {
                    newaccidentObj[element] = claimantstore[element];
                }
                if (element in vehicledetails) {
                    newvehicleObj[element] = claimantstore[element];
                }
            });
            setClaimantDetails(newclaimantObj);
            setMinorDetails(newminorObj);
            setAccidentDetails(newaccidentObj);
            setVehicleDetails(newvehicleObj);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [claimantstore]);

    useEffect(() => {
        mapData();
    }, [mapData]);

    const funcgetSolicitorsForRta = async () => {
        const res = await handleGetRequest("lovHireCompanies");
        sethireCompanies(res.data);
    };

    const funcGetHireBusiness = async () => {
        const hireCode = urlObj?.query?.id;
        const res = await handleGetRequest(`hire/getHireBusinesses/${hireCode}`);
        sethireBusinessData(res.data);
    };

    useEffect(() => {
        funcgetSolicitorsForRta();
        funcGetHireBusiness();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hireclaimcode = urlObj?.query?.id;

    const actionButtons = (
        <div>
            {hireActionButtons
                ? hireActionButtons.map((item) => {
                    return (
                        <Button
                            value={item.buttonvalue}
                            onClick={(e) => {
                                handleActionBtn(item);
                            }}
                            label={item.buttonname}
                            className="p-button-sm p-button-primary p-mr-2 p-mb-2"
                        />
                    );
                })
                : ""}
        </div>
    );

    const getHireCompanyUser = async (e) => {
        sethireCompaniesValue(e.value);
        const res = await handleGetRequest(`lovCompanyWiseUSer/${e.value.code}`);
        setcompanyWiseUser(res.data);
    };

    const handleActionSubmit = async () => {
        setloading(true);
        setloadingIcon("pi pi-spin pi-spinner");
        let key = "message";
        let data = {};
        let url = "";
        let bussinessStatus = "";
        if (caseDialogs.caserejectdialog === "Y") {
            bussinessStatus = "R";
        }
        if (caseDialogs.caseacceptdialog === "Y") {
            bussinessStatus = "A";
        }
        if (caseDialogs.caserejectdialog === "Y" || caseDialogs?.caseacceptdialog === "Y") {
            url = "hire/changeHireBusinessStatus";
            key = "note";
            data = {
                hireclaimcode,
                [key]: message,
                companyCode: hireCompaniesValue.code,
                status: btnValue,
                bussinessStatus,
                userCode: "",
                hireBusinessDetailRequest: {
                    bookingdate: bookingDate,
                    bookingmode: mode,
                    createdby: "",
                    hireenddate: hireEndDate,
                    hirestartdate: hireStartDate,
                    outsourced: caseOutsourced,
                    outsourcedto: caseOutsourcedTo,
                    reason: caseOutsourcedReason,
                    service: acceptanceFor,
                },
            };
        } else {
            url = "hire/assignCaseToBusiness";
            data = {
                hireclaimcode,
                [key]: message,
                companyprofilecode: companyWiseUserValue.code,
                userCode: hireCompaniesValue.code,
                statusCode: btnValue,
            };
        }

        await dispatch(ActionOnHire(data, url));
        setloading(false);
        setloadingIcon("");
        sethireActionModal(false);
    };

    const footer = (
        <div>
            <center className="p-mt-2 p-button-outlined">
                <Button icon={loadingIcon || ""} iconPos="right" disabled={loading} onClick={handleActionSubmit} label="Submit" />
            </center>
        </div>
    );

    const handleActionBtn = async (value) => {
        if (value.caserejectdialog === "N" && value.caseassigndialog === "N" && value.caseacceptdialog === "N") {
            const data = {
                hireCode: hireclaimcode,
                toStatus: value.buttonvalue,
            };
            await dispatch(ActionOnHire(data, "hire/performActionOnHire"));
        } else {
            setcaseDialogs(value);
            sethireActionModal(true);
            setbtnValue(value.buttonvalue);
        }
    };

    const HireHeading = caseDialogs?.caseassigndialog === "Y" ? <h2>Hire Assign</h2> : caseDialogs?.caserejectdialog === "Y" ? <h2>Hire Reject</h2> : caseDialogs?.caseacceptdialog === "Y" ? <h2>Hire Accept</h2> : "";

    return (
        <div>
            <div>
                <center>
                    <Badge value={"Rta No. : " + hirenumber} size="large" severity="info" className="p-mr-2"></Badge>
                    <Badge value={"Status : " + status} size="large" severity="warning" className="p-mr-2"></Badge>
                </center>
            </div>
            <div className="p-d-flex p-jc-between">
                <div className="p-mr-2">{actionButtons}</div>
            </div>

            <div className="p-grid">
                <div className="p-col-8">
                    <Fieldset className="p-mt-2 custom-fieldset" legend="Claimant Info">
                        <ClaimantInfo handleClaimantReturn={setClaimantDetails} claimantdata={claimantDetails} viewmode={viewmode} showMinorModal={setShowMinorModal} />
                    </Fieldset>
                </div>
                <div className="p-col">
                    <Fieldset className="p-mt-2 custom-fieldset" legend="Assigned Companies">
                        <HireCompanies hireBusinessData={hireBusinessData} />
                    </Fieldset>
                </div>
            </div>

            <Fieldset className="p-mt-2 custom-fieldset" legend="Accident Info">
                <AccidentInfo viewmode={viewmode} accidentdata={accidentDetails} handleAccidentReturn={setAccidentDetails} />
            </Fieldset>

            <Fieldset className="p-mt-2 custom-fieldset" legend="Vehicles Info">
                <VehiclesInfo viewmode={viewmode} vehicledata={vehicleDetails} handleVehicleInfoReturn={setVehicleDetails} />
            </Fieldset>

            <MinorModal handleMinorReturn={setMinorDetails} minorData={minorDetails} viewmode={viewmode} show={showMinorModal} hide={setShowMinorModal} />

            <Dialog header={HireHeading} visible={hireActionModal} footer={footer} onHide={() => sethireActionModal(false)} breakpoints={breakpoints} style={{ width: "50vw" }}>
                <div className="p-fluid p-formgrid p-grid" style={{ paddingBottom: "10%" }}>
                    {caseDialogs?.caseassigndialog === "Y" ? (
                        <div className="p-field p-col-12 p-md-6">
                            <label>Hire company</label>
                            <Dropdown
                                options={hireCompanies}
                                value={hireCompaniesValue}
                                onChange={(e) => {
                                    getHireCompanyUser(e);
                                }}
                                placeholder="Select"
                                optionLabel="name"
                            />
                        </div>
                    ) : (
                        <div className="p-field p-col-12 p-md-12">
                            <label>Hire company</label>
                            <Dropdown
                                options={hireCompanies}
                                value={hireCompaniesValue}
                                onChange={(e) => {
                                    getHireCompanyUser(e);
                                }}
                                placeholder="Select"
                                optionLabel="name"
                            />
                        </div>
                    )}

                    {caseDialogs?.caseassigndialog === "Y" ? (
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
                    ) : (
                        ""
                    )}

                    {caseDialogs?.caseacceptdialog === "Y" ? (
                        <React.Fragment>
                            <div className="p-field p-col-12 p-md-12">
                                <label>Is this for</label>
                                <div className="p-field-radiobutton p-d-flex">
                                    <RadioButton
                                        value="HR"
                                        onChange={(e) => {
                                            setacceptanceFor(e.value);
                                        }}
                                        checked={acceptanceFor === "HR"}
                                    />
                                    <label>Hire & Repair</label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <RadioButton
                                        value="HO"
                                        onChange={(e) => {
                                            setacceptanceFor(e.value);
                                        }}
                                        checked={acceptanceFor === "HO"}
                                    />
                                    <label>Hire Only </label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <RadioButton
                                        value="RO"
                                        onChange={(e) => {
                                            setacceptanceFor(e.value);
                                        }}
                                        checked={acceptanceFor === "RO"}
                                    />
                                    <label>Repair Only </label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <RadioButton
                                        value="TL"
                                        onChange={(e) => {
                                            setacceptanceFor(e.value);
                                        }}
                                        checked={acceptanceFor === "TL"}
                                    />
                                    <label>Total Loss</label>
                                </div>
                            </div>

                            {acceptanceFor === "HR" || acceptanceFor === "HO" ? (
                                <div className="p-field p-col-12 p-md-12">
                                    <label>Mode</label>
                                    <div className="p-field-radiobutton p-d-flex">
                                        <RadioButton
                                            value="D"
                                            onChange={(e) => {
                                                setmode(e.value);
                                            }}
                                            checked={mode === "D"}
                                        />
                                        <label>Driveable</label>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <RadioButton
                                            value="N"
                                            onChange={(e) => {
                                                setmode(e.value);
                                            }}
                                            checked={mode === "N"}
                                        />
                                        <label>Non-Driveable</label>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}

                            {acceptanceFor === "HR" || acceptanceFor === "HO" || acceptanceFor === "RO" ? (
                                <React.Fragment>
                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Booking in date</label>
                                        <InputText
                                            value={bookingDate}
                                            onChange={(e) => {
                                                setbookingDate(e.target.value);
                                            }}
                                            placeholder="Date"
                                            type="date"
                                        />
                                    </div>
                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Hire start date</label>
                                        <InputText
                                            value={hireStartDate}
                                            onChange={(e) => {
                                                sethireStartDate(e.target.value);
                                            }}
                                            placeholder="Date"
                                            type="date"
                                        />
                                    </div>
                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Hire end date</label>
                                        <InputText
                                            value={hireEndDate}
                                            onChange={(e) => {
                                                sethireEndDate(e.target.value);
                                            }}
                                            placeholder="Date"
                                            type="date"
                                        />
                                    </div>
                                </React.Fragment>
                            ) : (
                                ""
                            )}

                            {acceptanceFor === "HR" || acceptanceFor === "HO" ? (
                                <React.Fragment>
                                    <div className="p-field p-col-12 p-md-12">
                                        <label>Was this Case Outsourced?</label>
                                        <div className="p-field-radiobutton p-d-flex">
                                            <RadioButton
                                                value="Y"
                                                onChange={(e) => {
                                                    setcaseOutsourced(e.value);
                                                }}
                                                checked={caseOutsourced === "Y"}
                                            />
                                            <label>Yes</label>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <RadioButton
                                                value="N"
                                                onChange={(e) => {
                                                    setcaseOutsourced(e.value);
                                                }}
                                                checked={caseOutsourced === "N"}
                                            />
                                            <label>No</label>
                                        </div>
                                    </div>
                                    {caseOutsourced === "Y" ? (
                                        <React.Fragment>
                                            <div className="p-field p-col-12 p-md-6">
                                                <label>Outsourced to</label>
                                                <InputText
                                                    value={caseOutsourcedTo}
                                                    onChange={(e) => {
                                                        setcaseOutsourcedTo(e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div className="p-field p-col-12 p-md-6">
                                                <label>Outsourced reason</label>
                                                <InputText
                                                    value={caseOutsourcedReason}
                                                    onChange={(e) => {
                                                        setcaseOutsourcedReason(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                        ""
                                    )}
                                </React.Fragment>
                            ) : (
                                ""
                            )}
                        </React.Fragment>
                    ) : (
                        ""
                    )}
                    {caseDialogs?.caseassigndialog === "Y" ? (
                        <div className="p-field p-col-12 p-md-12">
                            <label>Message</label>
                            <InputTextarea value={message} onChange={(e) => setmessage(e.target.value)} rows={5} cols={30} />
                        </div>
                    ) : (caseDialogs?.caseacceptdialog === "Y" && (acceptanceFor === "HR" || acceptanceFor === "HO")) || caseDialogs?.caserejectdialog === "Y" ? (
                        <div className="p-field p-col-12 p-md-12">
                            <label>Notes</label>
                            <InputTextarea value={message} onChange={(e) => setmessage(e.target.value)} rows={5} cols={30} />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </Dialog>

            <Dialog header="Hire Companies" visible={showModal} onHide={() => setshowModal(false)} breakpoints={breakpoints} style={{ width: "50vw" }}>
                <HireCompanies hireBusinessData={hireBusinessData} />
            </Dialog>
        </div>
    );
}

export default ViewClaimant;
