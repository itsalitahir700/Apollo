import React from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

function ClaimantInfo({
    selectedState,
    setSelectedState,
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    dateBirth,
    setDateBirth,
    niNumber,
    setNiNumber,
    strEng,
    setStrEng,
    mobile,
    setMobile,
    checkedScotland,
    setCheckedScotland,
    landLine,
    setlandLine,
    email,
    setemail,
    postCode,
    setpostCode,
    addressLine1,
    setaddressLine1,
    addressLine2,
    setaddressLine2,
    addressLine3,
    setaddressLine3,
    city,
    setcity,
    region,
    setregion,
    setMinor,
    minor,
    showMinorModal,
}) {
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
    const handleAge = (dob) => {
        setDateBirth(dob);
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
                        inputId="Status"
                        value={selectedState}
                        onChange={(e) => {
                            setSelectedState(e.value);
                        }}
                        options={states}
                        placeholder="Select"
                        optionLabel="name"
                    />
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label>First Name</label>
                    <InputText value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <label>Middle Name</label>
                    <InputText value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label>Last Name</label>
                    <InputText value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className="p-field p-col-12 p-md-4" style={{ marginTop: "25px" }}>
                    <Checkbox onChange={(e) => setCheckedScotland(e.checked)} checked={checkedScotland}></Checkbox>
                    <label style={{ paddingLeft: "1%" }}>Did accident occur in scotlands?</label>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Date of Birth</label>
                    {minor && <Button label="Minor" className="p-button-danger minor" onClick={() => showMinorModal(true)} style={{ float: "right" }}></Button>}
                    <InputText value={dateBirth} type="date" onChange={(e) => handleAge(e.target.value)} />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Ni Number</label>
                    <div className="p-inputgroup">
                        <InputText value={niNumber} onChange={(e) => setNiNumber(e.target.value)} />
                        <Dropdown inputId="Status" value={selectedState} options={states} placeholder="Select" optionLabel="name" />
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Standard of English</label>
                    <div className="p-inputgroup">
                        <InputText value={strEng} onChange={(e) => setStrEng(e.target.value)} />
                        <Dropdown inputId="Status" value={selectedState} options={states} placeholder="Select" optionLabel="name" />
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Mobile</label>
                    <InputText value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Landline</label>
                    <InputText value={landLine} onChange={(e) => setlandLine(e.target.value)} />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Email</label>
                    <InputText value={email} onChange={(e) => setemail(e.target.value)} type="email" />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Address</label>
                    <div className="p-inputgroup">
                        <InputText placeholder="PostCode" value={postCode} onChange={(e) => setpostCode(e.target.value)} />
                        <Dropdown inputId="Status" value={selectedState} options={states} placeholder="Select" optionLabel="name" />
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Address line 1</label>
                    <InputText value={addressLine1} onChange={(e) => setaddressLine1(e.target.value)} />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Address line 2</label>
                    <InputText value={addressLine2} onChange={(e) => setaddressLine2(e.target.value)} />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Address line 3</label>
                    <InputText value={addressLine3} onChange={(e) => setaddressLine3(e.target.value)} />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>City</label>
                    <InputText value={city} onChange={(e) => setcity(e.target.value)} />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Region</label>
                    <InputText value={region} onChange={(e) => setregion(e.target.value)} />
                </div>
            </div>
        </div>
    );
}

export default ClaimantInfo;
