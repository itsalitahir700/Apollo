import React, { useState, useEffect, useCallback } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Badge } from "primereact/badge";
import { getClaimantDetails, ActionOnRtaFromDirectIntro, ActionOnRta } from "../../redux/actions/claimantAction";
import ClaimantInfo from "./claimantinfo";
import AccidentInfo from "./AccidentInfo";
import VehiclesInfo from "./VehiclesInfo";
import PassengersTable from "./passenger/passengertable";
import MinorModal from "./minormodal";
import TaskData from "./TaskData";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { claimantdetails, minordetails, accidentdetails, vehicledetails } from "../../utilities/constants";
import { getPassengers } from "../../services/Rta";
import { getSolicitorsForRta, getCompanyWiseUser } from "../../services/Lovs";
import { handleGetRequest } from "../../services/GetTemplate";

function ViewClaimant() {
    const url = require("url");
    const urlObj = url.parse(document.location.href, true);

    const [claimantDetails, setClaimantDetails] = useState(claimantdetails);
    const [minorDetails, setMinorDetails] = useState(minordetails);
    const [accidentDetails, setAccidentDetails] = useState(accidentdetails);
    const [vehicleDetails, setVehicleDetails] = useState(vehicledetails);
    const [showMinorModal, setShowMinorModal] = useState(false);
    const [passengers, setpassengers] = useState("");
    const claimantstore = useSelector((state) => state.claimantSlice.claimantDetails);
    const [viewmode, setviewmode] = useState(true);
    const [rtaHotkeyModal, setrtaHotkeyModal] = useState(false);
    const [solicitorRtaData, setsolicitorRtaData] = useState("");
    const [solicitorRtaDataValue, setsolicitorRtaDataValue] = useState("");
    const [companyWiseUser, setcompanyWiseUser] = useState("");
    const [companyWiseUserValue, setcompanyWiseUserValue] = useState("");
    const [btnValue, setbtnValue] = useState("");
    const [taskBtnLoading, settaskBtnLoading] = useState(false);
    const [showModal, setshowModal] = useState(false);
    const [taskActionData, settaskActionData] = useState(false);
    const rtaActionButtons = useSelector((state) => state.claimantSlice.claimantDetails.rtaActionButtons);
    const taskFlag = useSelector((state) => state.claimantSlice.claimantDetails.taskflag);
    const rtaNumber = useSelector((state) => state.claimantSlice.claimantDetails.rtanumber);
    const status = useSelector((state) => state.claimantSlice.claimantDetails.status);
    const directIntroducer = useSelector((state) => state.authenticationSlice?.directIntroducer);

    const dispatch = useDispatch();

    const fetchClaimantDetails = useCallback(() => {
        const rtaCode = urlObj?.query?.id;
        dispatch(getClaimantDetails("rta/getAuthRtaCase/", rtaCode));
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
        const res = await getSolicitorsForRta();
        setsolicitorRtaData(res.data);
    };

    useEffect(() => {
        funcgetSolicitorsForRta();
    }, []);

    const token = localStorage.getItem("token");
    const rtaCode = urlObj?.query?.id;

    const funcGetPassengers = async () => {
        const rtaCode = urlObj?.query?.id;
        const res = await getPassengers(rtaCode, token);
        setpassengers(res);
    };

    const handleTaskAction = async () => {
        settaskBtnLoading(true);
        const rtaCode = urlObj?.query?.id;
        const res = await handleGetRequest(`rta/getAuthRtaCaseTasks/${rtaCode}`);
        console.log("res", res);
        settaskBtnLoading(false);
        setshowModal(true);
        settaskActionData(res.data);
    };

    const refreshTasks = async () => {
        const res = await handleGetRequest(`rta/getAuthRtaCaseTasks/${rtaCode}`);
        settaskActionData(res.data);
    };

    const taskButton = <div>{taskFlag === "Y" ? <Button onClick={handleTaskAction} label="Tasks" icon="pi pi-check" iconPos="right" className="p-button-info" /> : ""}</div>;

    const actionButtons = (
        <div>
            {rtaActionButtons
                ? rtaActionButtons.map((item) => {
                      if (item.apiflag === "Y" && directIntroducer === "true")
                          return (
                              <Button
                                  value={item.buttonvalue}
                                  onClick={(e) => {
                                      handleActionHotKey(item.buttonvalue);
                                  }}
                                  label={item.buttonname}
                                  className="p-button-sm p-button-primary p-mr-2 p-mb-2"
                              />
                          );
                      else if (item.apiflag === "N")
                          return (
                              <Button
                                  value={item.buttonvalue}
                                  onClick={(e) => {
                                      handleActionButton(item.buttonvalue);
                                  }}
                                  label={item.buttonname}
                                  className="p-button-sm p-button-primary p-mr-2 p-mb-2"
                              />
                          );
                  })
                : ""}
        </div>
    );

    const handleSolicitor = async (e) => {
        setsolicitorRtaDataValue(e.value);
        const res = await getCompanyWiseUser(e.value.code);
        setcompanyWiseUser(res.data);
    };

    const handleSubmitSolicitor = async () => {
        const data = {
            rtaCode,
            toStatus: btnValue,
            solicitioCode: companyWiseUserValue.code,
            solicitorUserCode: solicitorRtaDataValue.code,
        };
        await dispatch(ActionOnRtaFromDirectIntro(data));
        setrtaHotkeyModal(false);
    };

    const footer = (
        <div>
            <center className="p-mt-2 p-button-outlined">
                <Button onClick={handleSubmitSolicitor} label="Submit" />
            </center>
        </div>
    );

    const handleActionHotKey = (value) => {
        setrtaHotkeyModal(true);
        setbtnValue(value);
    };

    const handleActionButton = async (value) => {
        const data = {
            rtaCode,
            toStatus: value,
        };
        await dispatch(ActionOnRta(data));
    };

    useEffect(() => {
        funcGetPassengers();
    }, []);

    return (
        <div>
            <div>
                <center>
                    <Badge value={"Rta No. : " + rtaNumber} size="large" severity="info" className="p-mr-2"></Badge>
                    <Badge value={"Status : " + status} size="large" severity="warning" className="p-mr-2"></Badge>
                </center>
            </div>
            <div className="p-d-flex p-jc-between">
                <div className="p-mr-2">{taskButton}</div>
                <div className="p-mr-2">{actionButtons}</div>
            </div>

            <Fieldset className="p-mt-2" legend="Claimant Info">
                <ClaimantInfo handleClaimantReturn={setClaimantDetails} claimantdata={claimantDetails} viewmode={viewmode} showMinorModal={setShowMinorModal} />
            </Fieldset>

            <Fieldset className="p-mt-2" legend="Accident Info">
                <AccidentInfo viewmode={viewmode} accidentdata={accidentDetails} handleAccidentReturn={setAccidentDetails} />
            </Fieldset>

            <Fieldset className="p-mt-2" legend="Vehicles Info">
                <VehiclesInfo viewmode={viewmode} vehicledata={vehicleDetails} handleVehicleInfoReturn={setVehicleDetails} />
            </Fieldset>

            <Fieldset className="p-mt-2" legend="Passenger Info">
                <PassengersTable viewmode={viewmode} isView={true} passengers={passengers} />
            </Fieldset>

            <MinorModal handleMinorReturn={setMinorDetails} minorData={minorDetails} viewmode={viewmode} show={showMinorModal} hide={setShowMinorModal} />

            <Dialog header="Solicitor for RTA" visible={rtaHotkeyModal} footer={footer} onHide={() => setrtaHotkeyModal(false)} breakpoints={breakpoints} style={{ width: "50vw" }}>
                <div className="p-fluid p-formgrid p-grid" style={{ paddingBottom: "30%" }}>
                    <div className="p-field p-col-12 p-md-6">
                        <label>Solicitor for Rta</label>
                        <Dropdown
                            options={solicitorRtaData}
                            value={solicitorRtaDataValue}
                            onChange={(e) => {
                                handleSolicitor(e);
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label>Solicitor for Rta</label>
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
            </Dialog>
            <Dialog header="Tasks" visible={showModal} style={{ width: "70vw" }} onHide={() => setshowModal(false)}>
                <TaskData rtaCode={rtaCode} refreshTasks={() => refreshTasks()} taskActionData={taskActionData} />
            </Dialog>
        </div>
    );
}

export default ViewClaimant;
