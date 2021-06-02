import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { getCircumstances, getInjuryClassification } from "../../../services/Lovs";
import { accidentdetails } from "../../../utilities/constants";

function AccidentInfo({ handleAccidentReturn, accidentdata, viewmode }) {
    const [accidentDetails, setaccidentDetails] = useState(accidentdata && Object.keys(accidentdata).length ? accidentdata : accidentdetails);
    const [circumstancesValue, setcircumstancesValue] = useState("");
    const [injuryClassification, setinjuryClassification] = useState("");
    const [injuryClassificationValue, setinjuryClassificationValue] = useState("");
    const [circumstances, setcircumstances] = useState("");
    const [ongoingInjury, setongoingInjury] = useState("");
    const [medicalEvidenceAvaliable, setmedicalEvidenceAvaliable] = useState("");

    async function funcgetlovCircumstances() {
        const res = await getCircumstances();
        setcircumstances(res.data);
    }
    async function funcgetlovInjuryClaims() {
        const res = await getInjuryClassification();
        setinjuryClassification(res.data);
    }

    useEffect(() => {
        funcgetlovCircumstances();
        funcgetlovInjuryClaims();
    }, []);

    useEffect(() => {
        handleAccidentReturn(accidentDetails);
    }, [accidentDetails, handleAccidentReturn]);

    useEffect(() => {
        setaccidentDetails(accidentdata);
    }, [accidentdata]);
    return (
        <div>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-4">
                    <label>Date and Time</label>
                    <InputText
                        disabled={viewmode}
                        value={accidentDetails?.accdate}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, accdate: e.target.value });
                        }}
                        placeholder="Date"
                        type="date"
                    />
                    <InputText
                        disabled={viewmode}
                        value={accidentDetails?.acctime}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, acctime: e.target.value });
                        }}
                        placeholder="Time"
                        type="time"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Circumstances</label>
                    <Dropdown
                        disabled={viewmode}
                        options={circumstances}
                        value={circumstancesValue}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, circumcode: e.value.code });
                            setcircumstancesValue(e.value);
                        }}
                        placeholder="Select"
                        optionLabel="name"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Location</label>
                    <InputText
                        disabled={viewmode}
                        value={accidentDetails?.location}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, location: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Description</label>
                    <InputText
                        disabled={viewmode}
                        area
                        value={accidentDetails?.description}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, description: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Road Weather Conditions</label>
                    <InputText
                        disabled={viewmode}
                        area
                        value={accidentDetails?.rdweathercond}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, rdweathercond: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <div className="p-field-radiobutton">
                        <RadioButton
                            disabled={viewmode}
                            value="D"
                            onChange={(e) => {
                                setaccidentDetails({ ...accidentDetails, driverpassenger: e.value });
                            }}
                            checked={accidentDetails?.driverpassenger === "D"}
                        />
                        <label>Driver</label>
                    </div>
                    <div className="p-field-radiobutton">
                        <RadioButton
                            disabled={viewmode}
                            value="P"
                            onChange={(e) => {
                                setaccidentDetails({ ...accidentDetails, driverpassenger: e.value });
                            }}
                            checked={accidentDetails?.driverpassenger === "P"}
                        />
                        <label>Passenger</label>
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Injury Classification</label>
                    <Dropdown
                        disabled={viewmode}
                        options={injuryClassification}
                        value={injuryClassificationValue}
                        onChange={(e) => {
                            setinjuryClassificationValue(e.value);
                            setaccidentDetails({ ...accidentDetails, injclasscode: e.value.code });
                        }}
                        placeholder="Select"
                        optionLabel="name"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Injury Description</label>
                    <InputText
                        disabled={viewmode}
                        area
                        value={accidentDetails?.injdescription}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, injdescription: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Length Of Injury</label>
                    <div className="p-inputgroup">
                        <InputText
                            disabled={viewmode}
                            value={accidentDetails?.injlength}
                            onChange={(e) => {
                                setaccidentDetails({ ...accidentDetails, injlength: e.target.value });
                            }}
                            type="number"
                        />
                        <span className="p-inputgroup-addon">Weeks</span>
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <Checkbox
                        disabled={viewmode}
                        onChange={(e) => {
                            const ongoing = e.checked ? "Y" : "N";
                            setaccidentDetails({ ...accidentDetails, ongoing });
                            setongoingInjury(e.checked);
                        }}
                        checked={ongoingInjury}
                    ></Checkbox>
                    <label>Ongoing Injury</label>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <Checkbox
                        disabled={viewmode}
                        value="Y"
                        onChange={(e) => {
                            const medicalinfo = e.checked ? "Y" : "N";
                            setaccidentDetails({ ...accidentDetails, medicalinfo });
                            setmedicalEvidenceAvaliable(e.checked);
                        }}
                        checked={medicalEvidenceAvaliable}
                    ></Checkbox>
                    <label>Medical evidence avaliable</label>
                </div>
            </div>
        </div>
    );
}

export default AccidentInfo;
