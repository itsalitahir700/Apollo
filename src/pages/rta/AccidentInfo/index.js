import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { getCircumstances, getInjuryClassification } from "../../../services/Lovs";
import { accidentdetails } from "../../../utilities/constants";
import { InputTextarea } from "primereact/inputtextarea";

function AccidentInfo({ handleAccidentReturn, accidentdata, viewmode, errors }) {
    const [accidentDetails, setaccidentDetails] = useState(accidentdata && Object.keys(accidentdata).length ? accidentdata : accidentdetails);
    const [injuryClassification, setinjuryClassification] = useState("");
    const [airBagsValue, setairBagsValue] = useState("");
    const [circumstances, setcircumstances] = useState("");
    const [ongoingInjury, setongoingInjury] = useState("");
    const [medicalEvidenceAvaliable, setmedicalEvidenceAvaliable] = useState("");

    const airBags = [
        { name: "Yes", code: "y" },
        { name: "No", code: "n" },
    ];

    async function funcgetlovCircumstances() {
        const res = await getCircumstances();
        setcircumstances(res.data);
    }

    const handleAirBags = (value) => {
        setairBagsValue(value);
        funcgetlovInjuryClaims(value.code);
    };

    async function funcgetlovInjuryClaims(airBagValue) {
        const res = await getInjuryClassification(airBagValue);
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
                        className={errors?.accdate && "p-invalid p-d-block"}
                    />
                    <InputText
                        disabled={viewmode}
                        value={accidentDetails?.acctime}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, acctime: e.target.value });
                        }}
                        placeholder="Time"
                        type="time"
                        className={errors?.acctime && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.accdate || errors?.acctime}</small>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Circumstances</label>
                    <Dropdown
                        disabled={viewmode}
                        options={circumstances}
                        value={{ code: accidentDetails?.circumcode?.toString(), name: accidentDetails?.circumdescr, type: null }}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, circumcode: e.value.code, circumdescr: e.value.name });
                        }}
                        placeholder="Select"
                        optionLabel="name"
                        className={errors?.circumcode && "p-invalid"}
                    />
                    <small className="p-error p-d-block">{errors?.circumcode}</small>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Location</label>
                    <InputText
                        disabled={viewmode}
                        value={accidentDetails?.location}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, location: e.target.value });
                        }}
                        className={errors?.location && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.location}</small>
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
                        required
                        className={errors?.description && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.description}</small>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Road & Weather Conditions</label>
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
                    <label>Claimant</label>
                    <div className="p-field-radiobutton p-d-flex">
                        <RadioButton
                            disabled={viewmode}
                            value="D"
                            onChange={(e) => {
                                setaccidentDetails({ ...accidentDetails, driverpassenger: e.value });
                            }}
                            checked={accidentDetails?.driverpassenger === "D"}
                        />
                        <label>Driver</label>
                        &nbsp;
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
                    <small className="p-error p-d-block">{errors?.driverpassenger}</small>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Were the airbags deployed</label>
                    <Dropdown
                        disabled={viewmode}
                        options={airBags}
                        value={airBagsValue}
                        onChange={(e) => {
                            handleAirBags(e.value);
                        }}
                        placeholder="Select"
                        optionLabel="name"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Injury Classification</label>
                    <Dropdown
                        disabled={viewmode}
                        options={injuryClassification}
                        value={{ code: accidentDetails?.injclasscode?.toString(), name: accidentDetails?.injdescr, type: accidentDetails?.injlevel }}
                        onChange={(e) => {
                            setaccidentDetails({ ...accidentDetails, injclasscode: e.value.code, injdescr: e.value.name, injlevel: e.value.type });
                        }}
                        placeholder="Select"
                        optionLabel="name"
                        className={errors?.injclasscode && "p-invalid "}
                    />
                    <small className="p-error p-d-block">{errors?.injclasscode}</small>
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
                        className={errors?.injdescription && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.injdescription}</small>
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
                            className={errors?.firstname && "p-invalid p-d-block"}
                        />
                        <span className="p-inputgroup-addon">Weeks</span>
                    </div>
                    <small className="p-error p-d-block">{errors?.injlength}</small>
                </div>

                <div className="p-field p-col-12 p-md-4 p-d-flex">
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

                <div className="p-field p-col-12 p-md-4 p-d-flex">
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

                {accidentDetails?.medicalinfo === "Y" ? (
                    <div className="p-field p-col-12 p-md-8">
                        <label>Medical Evidence Details</label>
                        <InputTextarea
                            disabled={viewmode}
                            rows={5}
                            value={accidentDetails?.evidenceDetails}
                            onChange={(e) => {
                                setaccidentDetails({ ...accidentDetails, evidenceDetails: e.target.value });
                            }}
                            className={errors?.mobile && "p-invalid p-d-block"}
                        />
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default AccidentInfo;
