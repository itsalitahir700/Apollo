import React, { useState } from "react";
import { Fieldset } from "primereact/fieldset";
import { InputTextarea } from "primereact/inputtextarea";
import PassengerModal from "./passenger";
import { Button } from "primereact/button";
import ClaimantInfo from "./claimantinfo";
import MinorModal from "./minormodal";
import AccidentInfo from "./AccidentInfo";
import VehiclesInfo from "./VehiclesInfo";
import PassengersTable from "./passenger/passengertable";
import ImagesUpload from "../../components/ImageUpload";
import { postRta } from "../../services/Rta";

import "./rta.css";

function RTA() {
    let states = [
        {
            code: "Y",
            name: "Mr",
            type: null,
        },
        {
            code: "N",
            name: "Ms",
            type: null,
        },
    ];

    const [claimantDetails, setclaimantDetails] = useState();
    const [minorDetails, setMinorDetails] = useState();
    const [accidentDetails, setaccidentDetails] = useState();
    const [vehiclesDetails, setvehiclesDetails] = useState();
    const [images, setimages] = useState();
    const [passengers, setpassengers] = useState([]);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [showMinorModal, setShowMinorModal] = useState(false);

    const handleAddPassenger = (passenger) => {
        let newArr = JSON.parse(JSON.stringify(passengers));
        newArr.push(passenger);
        newArr[newArr.length - 1].id = newArr.length;
        setpassengers(newArr);
    };

    const handleRemovePassenger = (id) => {
        let newArr = JSON.parse(JSON.stringify(passengers));
        setpassengers(newArr.filter((elm) => Number(elm?.id) !== Number(id)));
    };

    const handleUpdatePassenger = (passenger) => {
        const filtered = passengers.filter((elm) => elm?.id !== passenger?.id);
        const index = passengers.findIndex((elm) => elm?.id === passenger?.id);
        filtered.splice(index, 0, passenger);
        setpassengers(filtered);
    };

    //Add API call in this Function
    const handleSubmit = () => {
        let post = { ...claimantDetails, ...minorDetails, ...accidentDetails, ...vehiclesDetails, passengers: passengers, files: images };
        postRta(post, localStorage.getItem("token"));
    };

    return (
        <>
            <Fieldset className="p-mt-2" legend="Claimant Info">
                <ClaimantInfo handleClaimantReturn={setclaimantDetails} showMinorModal={setShowMinorModal} />
            </Fieldset>

            <Fieldset className="p-mt-2" legend="Accident Info">
                <AccidentInfo handleAccidentReturn={setaccidentDetails} />
            </Fieldset>

            <Fieldset className="p-mt-2" legend="Vehicles Info">
                <VehiclesInfo handleVehicleInfoReturn={setvehiclesDetails} />
                <PassengerModal status={states} show={displayBasic} hide={setDisplayBasic} handlePassengerReturn={handleAddPassenger} />
            </Fieldset>

            <Fieldset className="p-mt-2" legend="Passenger Info">
                <Button label="Add" icon="pi pi-external-link" onClick={() => setDisplayBasic(!displayBasic)} />
                <PassengersTable handleUpdatePassenger={handleUpdatePassenger} passengers={passengers} handleRemovePassenger={handleRemovePassenger} />
                <div className="p-field p-col-12 p-md-4">
                    <label>Pasanger Info</label>
                    <InputTextarea />
                </div>
            </Fieldset>
            <Fieldset className="p-mt-2" legend="Attachments">
                <ImagesUpload handleImages={setimages} />
            </Fieldset>
            <center className="p-mt-2 p-button-outlined" onClick={handleSubmit}>
                <Button label="NEXT" />
            </center>
            <MinorModal handleMinorReturn={setMinorDetails} show={showMinorModal} hide={setShowMinorModal} />
        </>
    );
}

export default RTA;
