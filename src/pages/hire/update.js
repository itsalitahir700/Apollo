import React, { useState, useEffect, useCallback } from "react";
import { getClaimantDetails } from "../../redux/actions/claimantAction";
import ClaimantInfo from "./claimantinfo";
import AccidentInfo from "./AccidentInfo";
import VehiclesInfo from "./VehiclesInfo";
import MinorModal from "./minormodal";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { claimantdetails, minordetails, accidentdetails, vehicledetails } from "../../utilities/constants";
import { handlePostRequest } from "../../services/PostTemplate";
import { Badge } from "primereact/badge";

function UpdateClaimant() {
    const url = require("url");
    const urlObj = url.parse(document.location.href, true);

    const [claimantDetails, setClaimantDetails] = useState(claimantdetails);
    const [minorDetails, setMinorDetails] = useState(minordetails);
    const [accidentDetails, setAccidentDetails] = useState(accidentdetails);
    const [vehicleDetails, setVehicleDetails] = useState(vehicledetails);
    const [showMinorModal, setShowMinorModal] = useState(false);
    const claimantstore = useSelector((state) => state.claimantSlice.claimantDetails);
    const hirenumber = useSelector((state) => state.claimantSlice?.claimantDetails?.hirenumber);
    const status = useSelector((state) => state.claimantSlice?.claimantDetails?.tblRtastatus?.descr);
    const [viewmode, setviewmode] = useState(false);
    const [loading, setloading] = useState(false);

    const dispatch = useDispatch();

    const fetchClaimantDetails = useCallback(() => {
        const hireCode = urlObj?.query?.id;
        dispatch(getClaimantDetails("hire/getHireCaseById/", hireCode));
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

    const handleSubmit = async () => {
        setloading(true);
        const hireCode = { hirecode: urlObj?.query?.id };
        const post = { ...claimantDetails, ...accidentDetails, ...vehicleDetails, ...hireCode };
        await handlePostRequest(post, "/hire/updateHireCase");
        setloading(false);
    };

    return (
        <div>
            <center>
                <Badge value={"Rta No. : " + hirenumber} size="large" severity="info" className="p-mr-2"></Badge>
                <Badge value={"Status : " + status} size="large" severity="warning" className="p-mr-2"></Badge>
            </center>
            <div style={{ textAlign: "right" }}>
                <Button
                    onClick={() => {
                        mapData();
                    }}
                    label="Reset"
                    icon="pi pi-undo"
                    className="p-button-sm p-button-secondary p-mr-2 p-mb-2"
                />
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

            <MinorModal handleMinorReturn={setMinorDetails} minorData={minorDetails} viewmode={viewmode} show={showMinorModal} hide={setShowMinorModal} />
            <center className="p-mt-2 p-button-outlined" onClick={handleSubmit}>
                <Button disabled={loading} icon={loading ? "pi pi-spin pi-spinner" : ""} label="Update" />
            </center>
        </div>
    );
}

export default UpdateClaimant;
