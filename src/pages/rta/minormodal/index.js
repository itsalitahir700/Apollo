import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

function MinorModal({ show, hide, handleMinorReturn }) {
    const footer = (
        <div>
            <Button
                label="Add"
                onClick={() => {
                    handleMinorReturn(minorDetails);
                    hide(false);
                }}
                icon="pi pi-check"
            />
            <Button label="Clear" onClick={() => handleClear()} icon="pi pi-times" />
        </div>
    );
    const breakpoints = { "960px": "75vw", "640px": "100vw" };
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
    const initialState = {
        name: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        pCode: "",
        address1: "",
        address2: "",
        address3: "",
        city: "",
        region: "",
    };

    const [minorDetails, setMinorDetails] = useState(initialState);

    const handleClear = () => {
        setMinorDetails(initialState);
    };

    return (
        <Dialog header="Minor Details" footer={footer} visible={show} onHide={() => hide(false)} breakpoints={breakpoints} style={{ width: "50vw" }}>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-3">
                    <label htmlFor="Status">G. Name</label>
                    <Dropdown
                        inputId="Status"
                        value={minorDetails?.name}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, name: e.value });
                        }}
                        options={states}
                        placeholder="Select"
                        optionLabel="name"
                    />
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <label>G. First Name</label>
                    <InputText
                        value={minorDetails?.firstName}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, firstName: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <label>G. Middle Name</label>
                    <InputText
                        value={minorDetails?.middleName}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, middleName: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label>G. Last Name</label>
                    <InputText
                        value={minorDetails?.lastName}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, lastName: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label>Date of Birth</label>
                    <InputText
                        type="date"
                        value={minorDetails?.dob}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, dob: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label>Address</label>
                    <InputText
                        placeholder="Postal Code"
                        value={minorDetails?.pCode}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, pCode: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <InputText
                        placeholder="Address Line 1"
                        value={minorDetails?.address1}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, address1: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <InputText
                        placeholder="Address Line 2"
                        value={minorDetails?.address2}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, address2: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <InputText
                        placeholder="Address Line 3"
                        value={minorDetails?.address3}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, address3: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <InputText
                        placeholder="City"
                        value={minorDetails?.city}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, city: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <InputText
                        placeholder="Region"
                        value={minorDetails?.region}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, region: e.target.value });
                        }}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default MinorModal;
