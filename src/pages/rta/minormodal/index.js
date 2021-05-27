import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

function MinorModal({ show, hide, handleMinorReturn, isEdit, details }) {
    const footer = (
        <div>
            <Button
                label={isEdit ? "Update" : "Add"}
                onClick={() => {
                    handleMinorReturn(minorDetails);
                    hide(false);
                }}
                icon="pi pi-check"
                isEdit
            />
            <Button label="Clear" onClick={() => handleClear()} icon="pi pi-times" />
        </div>
    );
    const breakpoints = { "960px": "75vw", "640px": "100vw" };
    let states = [
        {
            code: "Mr",
            name: "Mr",
            type: null,
        },
        {
            code: "Ms",
            name: "Ms",
            type: null,
        },
    ];
    const initialState = {
        gtitle: "",
        gfirstname: "",
        gmiddleName: "",
        glastName: "",
        gdob: "",
        gpostalcode: "",
        gemail: "",
        gaddress1: "",
        gaddress2: "",
        gaddress3: "",
        gcity: "",
        gregion: "",
    };

    const [minorDetails, setMinorDetails] = useState(initialState);
    const [titleValue, settitleValue] = useState("");

    const handleClear = () => {
        setMinorDetails(initialState);
    };

    //Match Keys & Map Edit Values to Minor Details
    const setValues = React.useCallback(() => {
        if (details && Object.keys(details).length) {
            let newObj = {};
            Object.keys(details).forEach((dt) => {
                Object.keys(initialState).forEach((ins) => {
                    if (ins === dt) newObj[ins] = details[ins];
                });
            });
            setMinorDetails(newObj);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [details]);

    useEffect(() => {
        setValues();
    }, [setValues]);

    return (
        <Dialog header={isEdit ? "Update Litigation Friend" : "Litigation Friend"} footer={footer} visible={show} onHide={() => hide(false)} breakpoints={breakpoints} style={{ width: "50vw" }}>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-3">
                    <label htmlFor="Status"> Name</label>
                    <Dropdown
                        inputId="Status"
                        value={titleValue}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gtitle: e.value.code });
                            settitleValue(e.value);
                        }}
                        options={states}
                        placeholder="Select"
                        optionLabel="name"
                    />
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <label> First Name</label>
                    <InputText
                        value={minorDetails?.gfirstname}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gfirstname: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <label> Middle Name</label>
                    <InputText
                        value={minorDetails?.gmiddleName}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gmiddleName: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label> Last Name</label>
                    <InputText
                        value={minorDetails?.glastName}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, glastName: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label>Date of Birth</label>
                    <InputText
                        type="date"
                        value={minorDetails?.gdob}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gdob: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label>Address</label>
                    <InputText
                        placeholder="Postal Code"
                        value={minorDetails?.gpostalcode}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gpostalcode: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <label>Email</label>
                    <InputText
                        placeholder="Email Adress"
                        value={minorDetails?.gemail}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gemail: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <InputText
                        placeholder="Address Line 1"
                        value={minorDetails?.gaddress1}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gaddress1: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <InputText
                        placeholder="Address Line 2"
                        value={minorDetails?.gaddress2}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gaddress2: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <InputText
                        placeholder="Address Line 3"
                        value={minorDetails?.gaddress3}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gaddress3: e.target.value });
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
