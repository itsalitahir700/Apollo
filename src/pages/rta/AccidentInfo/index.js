import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { getCircumstances, getInjuryClassification } from "../../../services/Lovs";

function AccidentInfo({ handleAccidentReturn }) {
    const initialState = {
        date: "",
        time: "",
        circumstancesValue: "",
        location: "",
        description: "",
        roadWeatherConditions: "",
        driverpassenger: "",
        passenger: "",
        injuryClassificationValue: "",
        injuryDescription: "",
        lengthOfInjury: "",
        ongoingInjury: "N",
        medicalEvidenceAvaliable: "N",
    };
    const [accidentDetails, setaccidentDetails] = useState(initialState);

    const [injuryClassification, setinjuryClassification] = useState("");
    const [circumstances, setcircumstances] = useState("");

    async function funcgetlovCircumstances() {
        const res = await getCircumstances();
        setinjuryClassification(res.data);
    }
    async function funcgetlovInjuryClaims() {
        const res = await getInjuryClassification();
        setcircumstances(res.data);
    }

    useEffect(() => {
        funcgetlovCircumstances();
        funcgetlovInjuryClaims();
    }, []);

    useEffect(() => {
        handleAccidentReturn(accidentDetails);
    }, [accidentDetails, handleAccidentReturn]);

    return (
        <div>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-4">
                    <label>Date and Time</label>
                    <InputText
                        value={accidentDetails?.date}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, date: e.value });
                        }}
                        placeholder="Date"
                        type="date"
                    />
                    <InputText
                        value={accidentDetails?.time}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, time: e.value });
                        }}
                        placeholder="Time"
                        type="time"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Circumstances</label>
                    <Dropdown
                        options={circumstances}
                        value={accidentDetails?.circumstancesValue}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, circumstancesValue: e.value });
                        }}
                        placeholder="Select"
                        optionLabel="name"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Location</label>
                    <InputText
                        value={accidentDetails?.location}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, location: e.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Description</label>
                    <InputTextarea
                        value={accidentDetails?.description}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, description: e.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Road Weather Conditions</label>
                    <InputTextarea
                        value={accidentDetails?.roadWeatherConditions}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, roadWeatherConditions: e.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <div className="p-field-radiobutton">
                        <RadioButton
                            value="D"
                            onChange={(e) => {
                                setaccidentDetails({ ...accidentDetails, driverpassenger: e.value });
                            }}
                            checked={accidentDetails.driverpassenger === "D"}
                        />
                        <label>Driver</label>
                    </div>
                    <div className="p-field-radiobutton">
                        <RadioButton
                            value="P"
                            onChange={(e) => {
                                setaccidentDetails({ ...accidentDetails, driverpassenger: e.value });
                            }}
                            checked={accidentDetails.driverpassenger === "P"}
                        />
                        <label>Passenger</label>
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Injury Classification</label>
                    <Dropdown
                        options={injuryClassification}
                        value={accidentDetails?.injuryClassificationValue}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, injuryClassificationValue: e.value });
                        }}
                        placeholder="Select"
                        optionLabel="name"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Injury Description</label>
                    <InputTextarea
                        value={accidentDetails?.injuryDescription}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, injuryDescription: e.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Length Of Injury</label>
                    <div className="p-inputgroup">
                        <InputText
                            value={accidentDetails?.lengthOfInjury}
                            onChange={(e) => {
                                setaccidentDetails({ ...accidentDetails, lengthOfInjury: e.value });
                            }}
                            type="number"
                        />
                        <span className="p-inputgroup-addon">Weeks</span>
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <Checkbox
                        value="Y"
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, ongoingInjury: e.checked });
                        }}
                        checked={accidentDetails.ongoingInjury}
                    ></Checkbox>
                    <label>Ongoing Injury</label>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <Checkbox
                        value="Y"
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, medicalEvidanceAvaliable: e.checked });
                        }}
                        checked={accidentDetails.medicalEvidanceAvaliable}
                    ></Checkbox>
                    <label>Medical evidence avaliable</label>
                </div>
            </div>
        </div>
    );
}

export default AccidentInfo;
