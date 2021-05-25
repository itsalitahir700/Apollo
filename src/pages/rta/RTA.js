import React, { useState, useEffect } from "react";
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

    const [selectedState, setSelectedState] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateBirth, setDateBirth] = useState("");
    const [niNumber, setNiNumber] = useState("");
    const [strEng, setStrEng] = useState("");
    const [mobile, setMobile] = useState("");
    const [landLine, setlandLine] = useState("");
    const [email, setemail] = useState("");
    const [postCode, setpostCode] = useState("");
    const [addressLine1, setaddressLine1] = useState("");
    const [addressLine2, setaddressLine2] = useState("");
    const [addressLine3, setaddressLine3] = useState("");
    const [city, setcity] = useState("");
    const [region, setregion] = useState("");
    const [checkedScotland, setCheckedScotland] = useState(false);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [minor, setMinor] = useState(false);
    const [showMinorModal, setShowMinorModal] = useState(false);
    const [minorDetails, setMinorDetails] = useState();
    const [accidentDetails, setaccidentDetails] = useState();
    const [vehiclesDetails, setvehiclesDetails] = useState();
    const [images, setimages] = useState();
    const [passengers, setpassengers] = useState([]);

    const handleMinorModal = React.useCallback(() => {
        if (minor) {
            setShowMinorModal(true);
        } else {
            setShowMinorModal(false);
        }
    }, [minor]);

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

    useEffect(() => {
        handleMinorModal();
    }, [handleMinorModal]);

    console.log(passengers);
    console.log(images);

    return (
        <>
            <Fieldset className="p-mt-2" legend="Claimant Info" toggleable>
                <ClaimantInfo
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    middleName={middleName}
                    setMiddleName={setMiddleName}
                    lastName={lastName}
                    setLastName={setLastName}
                    dateBirth={dateBirth}
                    setDateBirth={setDateBirth}
                    niNumber={niNumber}
                    setNiNumber={setNiNumber}
                    strEng={strEng}
                    setStrEng={setStrEng}
                    mobile={mobile}
                    setMobile={setMobile}
                    checkedScotland={checkedScotland}
                    setCheckedScotland={setCheckedScotland}
                    landLine={landLine}
                    email={email}
                    setemail={setemail}
                    setlandLine={setlandLine}
                    postCode={postCode}
                    setpostCode={setpostCode}
                    addressLine1={addressLine1}
                    setaddressLine1={setaddressLine1}
                    addressLine2={addressLine2}
                    setaddressLine2={setaddressLine2}
                    addressLine3={addressLine3}
                    setaddressLine3={setaddressLine3}
                    city={city}
                    setcity={setcity}
                    region={region}
                    setregion={setregion}
                    setMinor={setMinor}
                    minor={minor}
                    showMinorModal={setShowMinorModal}
                />
            </Fieldset>

            <Fieldset className="p-mt-2" legend="Accident Info" toggleable>
                <AccidentInfo handleAccidentReturn={setaccidentDetails} />
            </Fieldset>

            <Fieldset className="p-mt-2" legend="Vehicles & Passenger Info" toggleable>
                <VehiclesInfo handleVehicleInfoReturn={setvehiclesDetails} />

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

            <MinorModal handleMinorReturn={setMinorDetails} show={showMinorModal} hide={setShowMinorModal} />
        </>
    );
}

export default RTA;
