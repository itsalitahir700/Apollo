import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Fieldset } from "primereact/fieldset";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import PassengerModal from "./passenger";
import { Button } from "primereact/button";
import ClaimantInfo from "./claimantinfo";
import MinorModal from "./minormodal";
import PassengersTable from "./passenger/passengertable";
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

    return (
        <>
            <Fieldset legend="Claimant Info" toggleable>
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

            <Fieldset legend="Accident Info" toggleable>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-4">
                        <label>Address</label>
                        <InputText placeholder="Date" type="date" />
                        <InputText placeholder="Time" type="time" />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Circumstances</label>
                        <Dropdown inputId="Status" value={selectedState} options={states} placeholder="Select" optionLabel="name" />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Location</label>
                        <InputText />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Description</label>
                        <InputTextarea />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Road Weather Conditions</label>
                        <InputTextarea />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="city1" name="city" value="Chicago" />
                            <label htmlFor="city1">Chicago</label>
                        </div>
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="city2" name="city" value="Los Angeles" />
                            <label htmlFor="city2">Los Angeles</label>
                        </div>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Injury Classification</label>
                        <InputText />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Injury Description</label>
                        <InputTextarea />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Length Of Injury</label>
                        <div className="p-inputgroup">
                            <InputText type="number" />
                            <span className="p-inputgroup-addon">Weeks</span>
                        </div>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <Checkbox></Checkbox>
                        <label>Ongoing Injury</label>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <Checkbox></Checkbox>
                        <label>Medical evidence avaliable</label>
                    </div>
                </div>
            </Fieldset>

            <Fieldset legend="Vehicles & Passenger Info" toggleable>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-4">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="city1" name="city" value="Chicago" />
                            <label htmlFor="city1">Chicago</label>
                        </div>
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="city2" name="city" value="Los Angeles" />
                            <label htmlFor="city2">Los Angeles</label>
                        </div>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <Checkbox></Checkbox>
                        <label>Reported To Police</label>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <InputText placeholder="reported on" />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <InputText placeholder="reference number" />
                    </div>

                    {/* THIRD PARTY */}
                    <div className="p-field p-col-12 p-md-4">
                        <label>Registeration Number</label>
                        <div className="p-inputgroup">
                            <InputText />
                            <Dropdown inputId="Status" value={selectedState} options={states} placeholder="Select" optionLabel="name" />
                        </div>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Make Model</label>
                        <InputText />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Insurer</label>
                        <InputText placeholder="insurer" />
                        <InputText placeholder="policy number" />
                        <InputText placeholder="claim number" />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Registeration Number</label>
                        <div className="p-inputgroup">
                            <InputText />
                            <Dropdown inputId="Status" value={selectedState} options={states} placeholder="Select" optionLabel="name" />
                        </div>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Make Model</label>
                        <InputText />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Insurer</label>
                        <InputText placeholder="insurer" />
                        <InputText placeholder="policy number" />
                        <InputText placeholder="claim number" />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Green Number</label>
                        <InputText />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Third Party</label>
                        <InputText />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Contact Number</label>
                        <InputText type="number" />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Address</label>
                        <InputTextarea />
                    </div>

                    <PassengerModal status={states} show={displayBasic} hide={setDisplayBasic} handlePassengerReturn={handleAddPassenger} />

                    <Button label="Add" icon="pi pi-external-link" onClick={() => setDisplayBasic(!displayBasic)} />

                    <PassengersTable handleUpdatePassenger={handleUpdatePassenger} passengers={passengers} handleRemovePassenger={handleRemovePassenger} />

                    <div className="p-field p-col-12 p-md-4">
                        <label>Pasanger Info</label>
                        <InputTextarea />
                    </div>
                </div>
            </Fieldset>
            <MinorModal handleMinorReturn={setMinorDetails} show={showMinorModal} hide={setShowMinorModal} />
        </>
    );
}

export default RTA;
