import React, { useState, useEffect, useCallback } from "react";
import { getClaimantDetails } from "../../redux/actions/claimantAction";
import ClaimantInfo from "./claimantinfo";
import AccidentInfo from "./AccidentInfo";
import VehiclesInfo from "./VehiclesInfo";
import MinorModal from "./minormodal";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";
import { claimantdetails, minordetails, accidentdetails, vehicledetails } from "../../utilities/constants";
import { updataRta } from "../../services/Rta";

function UpdateClaimant() {
    const url = require("url");
    const urlObj = url.parse(document.location.href, true);

    const [claimantDetails, setClaimantDetails] = useState(claimantdetails);
    const [minorDetails, setMinorDetails] = useState(minordetails);
    const [accidentDetails, setAccidentDetails] = useState(accidentdetails);
    const [vehicleDetails, setVehicleDetails] = useState(vehicledetails);
    const [showMinorModal, setShowMinorModal] = useState(false);
    const claimantstore = useSelector((state) => state.claimantSlice.claimantDetails);
    const [viewmode, setviewmode] = useState(true);

    const dispatch = useDispatch();

    const fetchClaimantDetails = useCallback(() => {
        const rtaCode = urlObj?.query?.id;
        dispatch(getClaimantDetails(rtaCode));
    }, [dispatch, urlObj?.query?.id]);

    useEffect(() => {
        fetchClaimantDetails();
    }, [fetchClaimantDetails]);

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

    const token = localStorage.getItem("token");

    const handleSubmit = () => {
        const rtaCode = { rtacode: urlObj?.query?.id };
        const post = { ...claimantDetails, ...accidentDetails, ...vehicleDetails, ...rtaCode };
        updataRta(post, token);
    };

    return (
        <div className="card">
            <Button onClick={() => setviewmode(!viewmode)} label={viewmode ? "Edit" : "Update"} icon={viewmode ? "pi pi-pencil" : "pi pi-check"} className="p-button-sm p-mr-2 p-mb-2" />
            <Button
                onClick={() => {
                    setviewmode(true);
                    mapData();
                }}
                disabled={viewmode}
                label="Reset"
                icon="pi pi-undo"
                className="p-button-sm p-button-secondary p-mr-2 p-mb-2"
            />

            <Accordion className="p-mb-2" activeIndex={0}>
                <AccordionTab header="Claimant Info">
                    <ClaimantInfo handleClaimantReturn={setClaimantDetails} claimantdata={claimantDetails} viewmode={viewmode} showMinorModal={setShowMinorModal} />
                </AccordionTab>
            </Accordion>

            <Accordion className="p-mb-2" activeIndex={0}>
                <AccordionTab header="Accident Info">
                    <AccidentInfo viewmode={viewmode} accidentdata={accidentDetails} handleAccidentReturn={setAccidentDetails} />
                </AccordionTab>
            </Accordion>

            <Accordion className="p-mb-2" activeIndex={0}>
                <AccordionTab header="Vehicle & Passenger Info">
                    <VehiclesInfo viewmode={viewmode} vehicledata={vehicleDetails} handleVehicleInfoReturn={setVehicleDetails} />
                </AccordionTab>
            </Accordion>

            <MinorModal handleMinorReturn={setMinorDetails} minorData={minorDetails} viewmode={viewmode} show={showMinorModal} hide={setShowMinorModal} />
            <center className="p-mt-2 p-button-outlined" onClick={handleSubmit}>
                <Button label="Update" />
            </center>
        </div>
    );
}

export default UpdateClaimant;
