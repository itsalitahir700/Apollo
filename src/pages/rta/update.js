import React, { useState, useEffect, useCallback } from "react";
import { getClaimantDetails } from "../../redux/actions/claimantAction";
import ClaimantInfo from "./claimantinfo";
import AccidentInfo from "./AccidentInfo";
import VehiclesInfo from "./VehiclesInfo";
import PassengersTable from "./passenger/passengertable";
import MinorModal from "./minormodal";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { claimantdetails, minordetails, accidentdetails, vehicledetails } from "../../utilities/constants";
import { updataRta, getPassengers } from "../../services/Rta";
import { Badge } from "primereact/badge";

function UpdateClaimant() {
    const url = require("url");
    const urlObj = url.parse(document.location.href, true);

    const [claimantDetails, setClaimantDetails] = useState(claimantdetails);
    const [minorDetails, setMinorDetails] = useState(minordetails);
    const [accidentDetails, setAccidentDetails] = useState(accidentdetails);
    const [vehicleDetails, setVehicleDetails] = useState(vehicledetails);
    const [showMinorModal, setShowMinorModal] = useState(false);
    const [passengers, setpassengers] = useState("");
    const claimantstore = useSelector((state) => state.claimantSlice.claimantDetails);
    const rtaNumber = useSelector((state) => state.claimantSlice.claimantDetails.rtanumber);
    const status = useSelector((state) => state.claimantSlice.claimantDetails.status);
    const [viewmode, setviewmode] = useState(false);
    const [loading, setloading] = useState(false);

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

    const handleSubmit = async () => {
        setloading(true);
        const rtaCode = { rtacode: urlObj?.query?.id };
        const post = { ...claimantDetails, ...accidentDetails, ...vehicleDetails, ...rtaCode };
        await updataRta(post, token);
        setloading(false);
    };

    const funcGetPassengers = async () => {
        const rtaCode = urlObj?.query?.id;
        const res = await getPassengers(rtaCode, token);
        setpassengers(res);
    };

    useEffect(() => {
        funcGetPassengers();
    }, []);

    return (
        <div>
            <center>
                <Badge value={"Rta No. : " + rtaNumber} size="large" severity="info" className="p-mr-2"></Badge>
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

            <Fieldset className="p-mt-2" legend="Passenger Info">
                <PassengersTable isView={true} passengers={passengers} />
            </Fieldset>

            <MinorModal handleMinorReturn={setMinorDetails} minorData={minorDetails} viewmode={viewmode} show={showMinorModal} hide={setShowMinorModal} />
            <center className="p-mt-2 p-button-outlined" onClick={handleSubmit}>
                <Button disabled={loading} icon={loading ? "pi pi-spin pi-spinner" : ""} label="Update" />
            </center>
        </div>
    );
}

export default UpdateClaimant;
