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
import { updataRta, getPassengers, postPassengers } from "../../services/Rta";
import { Badge } from "primereact/badge";
import PassengerModal from "./passenger";

function UpdateClaimant() {
    let states = [
        {
            code: "Mr",
            name: "Mr",
            type: null,
        },
        {
            code: "Mrs",
            name: "Mrs",
            type: null,
        },
        {
            code: "Miss",
            name: "Miss",
            type: null,
        },
        {
            code: "Ms",
            name: "Ms",
            type: null,
        },
        {
            code: "Mstr",
            name: "Mstr",
            type: null,
        },
        {
            code: "Dr",
            name: "Dr",
            type: null,
        },
        {
            code: "Prof",
            name: "Prof",
            type: null,
        },
        {
            code: "Rev",
            name: "Rev",
            type: null,
        },
    ];

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
    const [viewmode] = useState(false);
    const [loading, setloading] = useState(false);
    const [displayBasic, setDisplayBasic] = useState(false);

    const dispatch = useDispatch();
    const rtaCode = urlObj?.query?.id;

    const fetchClaimantDetails = useCallback(() => {
        dispatch(getClaimantDetails("rta/getAuthRtaCase/", rtaCode));
    }, [dispatch, rtaCode]);

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

    const handleMinorReturn = (obj) => {
        setMinorDetails(obj);
    };

    const handleSubmit = async () => {
        setloading(true);
        const rtaCode = { rtacode: urlObj?.query?.id };
        const post = { ...claimantDetails, ...minorDetails, ...accidentDetails, ...vehicleDetails, ...rtaCode };
        await updataRta(post, token);
        setloading(false);
    };

    const funcGetPassengers = async () => {
        const res = await getPassengers(rtaCode, token);
        setpassengers(res);
    };

    const handleAddPassenger = async (passenger) => {
        const pObj = { passengers: [{ ...passenger }], rtacode: rtaCode };
        setpassengers(await postPassengers(pObj));
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
                <Button
                    label="Add"
                    className="add-passenger-btn"
                    icon="pi pi-external-link"
                    onClick={() => {
                        setDisplayBasic(!displayBasic);
                    }}
                />
                <PassengersTable isView={true} passengers={passengers} />
                <PassengerModal
                    claimantAddress={{ gpostalcode: claimantDetails?.postalcode, gaddress1: claimantDetails?.address1, gaddress2: claimantDetails?.address2, gaddress3: claimantDetails?.address3, gcity: claimantDetails?.city, gregion: claimantDetails?.region }}
                    driverOrPassenger={accidentDetails?.driverpassenger}
                    status={states}
                    show={displayBasic}
                    hide={setDisplayBasic}
                    handlePassengerReturn={handleAddPassenger}
                />
            </Fieldset>

            <MinorModal
                claimantAddress={{ gpostalcode: claimantDetails?.postalcode, gaddress1: claimantDetails?.address1, gaddress2: claimantDetails?.address2, gaddress3: claimantDetails?.address3, gcity: claimantDetails?.city, gregion: claimantDetails?.region }}
                handleMinorReturn={handleMinorReturn}
                minorData={minorDetails}
                viewmode={viewmode}
                show={showMinorModal}
                hide={setShowMinorModal}
            />
            <center className="p-mt-2 p-button-outlined" onClick={handleSubmit}>
                <Button disabled={loading} icon={loading ? "pi pi-spin pi-spinner" : ""} label="Update" />
            </center>
        </div>
    );
}

export default UpdateClaimant;
