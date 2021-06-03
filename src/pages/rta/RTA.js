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
import { validation } from "../../utilities/validation";
import { claimantdetails, accidentdetails, minordetails, vehicledetails } from "../../utilities/constants";

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

    const [claimantDetails, setclaimantDetails] = useState(claimantdetails);
    const [minorDetails, setMinorDetails] = useState(minordetails);
    const [accidentDetails, setaccidentDetails] = useState(accidentdetails);
    const [vehiclesDetails, setvehiclesDetails] = useState(vehicledetails);
    const [images, setimages] = useState();
    const [passengers, setpassengers] = useState([]);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [showMinorModal, setShowMinorModal] = useState(false);
    const [errors, seterrors] = useState({});

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
    const handleSubmit = async () => {
        let post = { ...claimantDetails, ...minorDetails, ...accidentDetails, ...vehiclesDetails, passengers: passengers, files: images };
        const isvalid = await validation(post);
        seterrors(isvalid?.errors);
        if (!Object.keys(isvalid?.errors).length) {
            postRta(post, localStorage.getItem("token"));
        }
    };

    return (
        <>
            <Fieldset className="p-mt-2" legend="Claimant Info" toggleable>
                <ClaimantInfo handleClaimantReturn={setclaimantDetails} showMinorModal={setShowMinorModal} errors={errors} />
            </Fieldset>

            <Fieldset className="p-mt-2" legend="Accident Info" toggleable>
                <AccidentInfo handleAccidentReturn={setaccidentDetails} errors={errors} />
            </Fieldset>

            <Fieldset className="p-mt-2" legend="Vehicles & Passenger Info" toggleable>
                <VehiclesInfo handleVehicleInfoReturn={setvehiclesDetails} errors={errors} />

                <PassengerModal status={states} show={displayBasic} hide={setDisplayBasic} handlePassengerReturn={handleAddPassenger} />

                <Button label="Add" icon="pi pi-external-link" onClick={() => setDisplayBasic(!displayBasic)} />

                <PassengersTable handleUpdatePassenger={handleUpdatePassenger} passengers={passengers} handleRemovePassenger={handleRemovePassenger} />

                <div className="p-field p-col-12 p-md-4">
                    <label>Pasanger Info</label>
                    <InputTextarea />
                </div>
            </Fieldset>

            <Fieldset className="p-mt-2" legend="Attachments" toggleable>
                <ImagesUpload handleImages={setimages} />
            </Fieldset>
            <center className="p-mt-2 p-button-outlined" onClick={handleSubmit}>
                {Object.keys(errors).length && <p className="p-error p-d-block">Please fill out required fields</p>}
                <Button label="NEXT" />
            </center>
            <MinorModal handleMinorReturn={setMinorDetails} show={showMinorModal} hide={setShowMinorModal} />
        </>
    );
}

export default RTA;
