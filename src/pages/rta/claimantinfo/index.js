import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

function ClaimantInfo({ showMinorModal, handleClaimantReturn }) {
    const initialState = {
        selectedState: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dateBirth: "",
        niNumber: "",
        strEng: "",
        mobile: "",
        landLine: "",
        email: "",
        postCode: "",
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        city: "",
        region: "",
        checkedScotland: "false",
        displayBasic: "false",
        minor: "",
        showMinorModal: "",
        claimantDetails: "",
        minorDetails: "",
        accidentDetails: "",
        vehiclesDetails: "",
        images: "",
        passengers: "",
    };
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
    const [claimantDetails, setclaimantDetails] = useState(initialState);

    const [checkedScotland, setCheckedScotland] = useState(false);
    const [minor, setMinor] = useState(false);

    const handleAge = (dob) => {
        setclaimantDetails({ ...claimantDetails, setDateBirth: dob });
        if (calculate_age(dob) < 15) {
            setMinor(true);
        } else {
            setMinor(false);
        }
    };
    const calculate_age = (dob1) => {
        var today = new Date();
        var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
        }
        return age_now;
    };
    return (
        <div>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-3">
                    <label htmlFor="Status">Name</label>
                    <Dropdown
                        value={claimantDetails?.selectedState}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, selectedState: e.value });
                        }}
                        options={states}
                        placeholder="Select"
                        optionLabel="name"
                    />
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label>First Name</label>
                    <InputText
                        value={claimantDetails?.firstName}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, firstName: e.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <label>Middle Name</label>
                    <InputText
                        value={claimantDetails?.middleName}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, middleName: e.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label>Last Name</label>
                    <InputText
                        value={claimantDetails?.lastName}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, lastName: e.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4" style={{ marginTop: "25px" }}>
                    <Checkbox onChange={(e) => setCheckedScotland(e.checked)} checked={checkedScotland}></Checkbox>
                    <label style={{ paddingLeft: "1%" }}>Did accident occur in scotlands?</label>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Date of Birth</label>
                    {minor && <Button label="Minor" className="p-button-danger minor" onClick={() => showMinorModal(true)} style={{ float: "right" }}></Button>}
                    <InputText value={claimantDetails.dateBirth} type="date" onChange={(e) => handleAge(e.target.value)} />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Ni Number</label>
                    <div className="p-inputgroup">
                        <InputText
                            value={claimantDetails?.niNumber}
                            onChange={(e) => {
                                setclaimantDetails({ ...claimantDetails, niNumber: e.value });
                            }}
                        />
                        <Dropdown inputId="Status" value={claimantDetails.selectedState} options={states} placeholder="Select" optionLabel="name" />
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Standard of English</label>
                    <div className="p-inputgroup">
                        <InputText
                            value={claimantDetails?.strEng}
                            onChange={(e) => {
                                setclaimantDetails({ ...claimantDetails, strEng: e.value });
                            }}
                        />
                        <Dropdown inputId="Status" value={claimantDetails.selectedState} options={states} placeholder="Select" optionLabel="name" />
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Mobile</label>
                    <InputText
                        value={claimantDetails?.mobile}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, mobile: e.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Landline</label>
                    <InputText
                        value={claimantDetails?.landLine}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, landLine: e.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Email</label>
                    <InputText
                        value={claimantDetails?.email}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, email: e.value });
                        }}
                        type="email"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Address</label>
                    <div className="p-inputgroup">
                        <InputText
                            placeholder="PostCode"
                            value={claimantDetails?.postCode}
                            onChange={(e) => {
                                setclaimantDetails({ ...claimantDetails, postCode: e.value });
                            }}
                        />
                        <Dropdown inputId="Status" value={claimantDetails.selectedState} options={states} placeholder="Select" optionLabel="name" />
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Address line 1</label>
                    <InputText
                        value={claimantDetails?.addressLine1}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, addressLine1: e.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Address line 2</label>
                    <InputText
                        value={claimantDetails?.addressLine2}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, addressLine2: e.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Address line 3</label>
                    <InputText
                        value={claimantDetails?.addressLine3}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, addressLine3: e.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>City</label>
                    <InputText
                        value={claimantDetails?.city}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, city: e.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Region</label>
                    <InputText
                        value={claimantDetails?.region}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, region: e.value });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ClaimantInfo;
