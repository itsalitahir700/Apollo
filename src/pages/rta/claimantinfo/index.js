import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

function ClaimantInfo({ showMinorModal, handleClaimantReturn, claimantdata, viewmode }) {
    const initialState = {
        title: "",
        firstname: "",
        middlename: "",
        lastname: "",
        dob: "",
        ninumber: "",
        englishlevel: "",
        mobile: "",
        landLine: "",
        email: "",
        postalcode: "",
        address1: "",
        address2: "",
        address3: "",
        city: "",
        region: "",
        scotland: "N",
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
    const [claimantDetails, setclaimantDetails] = useState(claimantdata && Object.keys(claimantdata).length ? claimantdata : initialState);
    const [scotland, setscotland] = useState("");
    const [minor, setMinor] = useState(false);
    const [titleValue, settitleValue] = useState("");

    const handleAge = (dob) => {
        setclaimantDetails({ ...claimantDetails, dob: dob });
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

    useEffect(() => {
        handleClaimantReturn(claimantDetails);
    }, [claimantDetails, handleClaimantReturn]);

    useEffect(() => {
        setclaimantDetails(claimantdata);
    }, [claimantdata]);

    return (
        <div>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-3">
                    <label htmlFor="Status">Name</label>
                    <Dropdown
                        value={titleValue}
                        disabled={viewmode}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, title: e.value.code });
                            settitleValue(e.value);
                        }}
                        options={states}
                        placeholder="Select"
                        optionLabel="name"
                    />
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label>First Name</label>
                    <InputText
                        value={claimantDetails?.firstname}
                        disabled={viewmode}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, firstname: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <label>Middle Name</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.middlename}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, middlename: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label>Last Name</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.lastname}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, lastname: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4" style={{ marginTop: "25px" }}>
                    <Checkbox
                        disabled={viewmode}
                        onChange={(e) => {
                            const scotlandvalue = e.checked ? "Y" : "N";
                            setclaimantDetails({ ...claimantDetails, scotland: scotlandvalue });
                            setscotland(e.checked);
                        }}
                        checked={scotland}
                    ></Checkbox>
                    <label style={{ paddingLeft: "1%" }}>Did accident occur in scotlands?</label>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Date of Birth</label>
                    {minor && <Button disabled={viewmode} label="Minor" className="p-button-danger minor" onClick={() => showMinorModal(true)} style={{ float: "right" }}></Button>}
                    <InputText disabled={viewmode} value={claimantDetails?.dob} type="date" onChange={(e) => handleAge(e.target.value)} />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Ni Number</label>
                    <div className="p-inputgroup">
                        <InputText
                            disabled={viewmode}
                            value={claimantDetails?.ninumber}
                            onChange={(e) => {
                                setclaimantDetails({ ...claimantDetails, ninumber: e.target.value });
                            }}
                        />
                        <Dropdown
                            disabled={viewmode}
                            options={[{ name: "WILL BE PROVIDED TO SOLICITOR" }]}
                            onChange={(e) => {
                                setclaimantDetails({ ...claimantDetails, ninumber: e.value.name });
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Standard of English</label>
                    <div className="p-inputgroup">
                        <InputText
                            disabled={viewmode}
                            value={claimantDetails?.englishlevel}
                            onChange={(e) => {
                                setclaimantDetails({ ...claimantDetails, englishlevel: e.target.value });
                            }}
                        />
                        <Dropdown
                            disabled={viewmode}
                            options={[{ name: "Fluent" }, { name: "Good" }, { name: "Average" }, { name: "Poor" }]}
                            onChange={(e) => {
                                setclaimantDetails({ ...claimantDetails, englishlevel: e.value.name });
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Mobile</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.mobile}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, mobile: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Landline</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.landLine}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, landLine: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Email</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.email}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, email: e.target.value });
                        }}
                        type="email"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Address</label>
                    <div className="p-inputgroup">
                        <InputText
                            disabled={viewmode}
                            placeholder="postalcode"
                            value={claimantDetails?.postalcode}
                            onChange={(e) => {
                                setclaimantDetails({ ...claimantDetails, postalcode: e.target.value });
                            }}
                        />
                        <Dropdown inputId="Status" value={claimantDetails?.title} options={states} placeholder="Select" optionLabel="name" />
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Address line 1</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.address1}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, address1: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Address line 2</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.address2}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, address2: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Address line 3</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.address3}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, address3: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>City</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.city}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, city: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Region</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.region}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, region: e.target.value });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ClaimantInfo;
