import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import MinorModal from "../minormodal";

function PassengerModel({ status, show, hide, handlePassengerReturn, passenger, isEdit }) {
    const footer = (
        <div>
            <Button
                label={!isEdit ? "Add" : "Update"}
                onClick={() => {
                    handlePassengerReturn(passengerDetails);
                    hide(false);
                    handleClear();
                }}
                icon="pi pi-check"
            />

            <Button label="Clear" onClick={() => handleClear()} icon="pi pi-times" />
        </div>
    );
    const initialState = {
        title: "",
        firstname: "",
        middlename: "",
        lastname: "",
        dob: "",
        ninumber: "",
        options: "",
        mobile: "",
        landline: "",
        address: "",
        pCode: "",
        address1: "",
        address2: "",
        address3: "",
        city: "",
        region: "",
        contact: "",
        injured: "",
        classification: "",
        description: "",
        length: "",
        ongoinginjury: "",
        evidence: "",
        details: "",
        minor: false,
    };

    const [passengerDetails, setPassengerDetails] = useState(initialState);
    const [showMinorModal, setShowMinorModal] = useState(false);
    const [minorDetails, setMinorDetails] = useState();

    const handleAge = (dob) => {
        if (calculate_age(dob) < 15) {
            setPassengerDetails({ ...passengerDetails, minor: true, dob: dob });
        } else {
            setPassengerDetails({ ...passengerDetails, minor: false, dob: dob });
        }
    };

    const calculate_age = (dob) => {
        var today = new Date();
        var birthDate = new Date(dob); // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
        }
        return age_now;
    };

    const handleClear = () => {
        setPassengerDetails(initialState);
    };

    const updatePassengerDetails = React.useCallback(() => {
        setPassengerDetails((passengerDetails) => ({ ...passengerDetails, ...minorDetails }));
    }, [minorDetails]);

    useEffect(() => {
        updatePassengerDetails();
    }, [updatePassengerDetails]);

    useEffect(() => {
        if (passenger && Object.keys(passenger).length !== 0) setPassengerDetails(passenger);
    }, [passenger]);
    return (
        <Dialog header={isEdit ? "Edit Passenger" : "Add Passenger"} footer={footer} visible={show} style={{ width: "80%" }} onHide={() => hide(false)}>
            <TabView>
                <TabPanel header="Personal Info">
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-4">
                            <label htmlFor="Status">Status</label>
                            <Dropdown
                                inputId="Status"
                                value={passengerDetails?.title}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, title: e.value });
                                }}
                                options={status}
                                placeholder="Select"
                                optionLabel="name"
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>First Name</label>
                            <InputText
                                value={passengerDetails?.firstname}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, firstname: e.target.value });
                                }}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label>Middle Name</label>
                            <InputText
                                value={passengerDetails?.middlename}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, middlename: e.target.value });
                                }}
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>Last Name</label>
                            <InputText
                                value={passengerDetails?.lastname}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, lastname: e.target.value });
                                }}
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>Date of Birth</label> {passengerDetails?.minor && <Button label="Minor" onClick={() => setShowMinorModal(true)} className="p-button-danger minor" style={{ float: "right" }}></Button>}
                            <InputText
                                type="date"
                                value={passengerDetails?.dob}
                                onChange={(e) => {
                                    handleAge(e.target.value);
                                }}
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>Ni Number</label>
                            <div className="p-inputgroup">
                                <InputText
                                    type="number"
                                    value={passengerDetails?.niNumber}
                                    onChange={(e) => {
                                        setPassengerDetails({ ...passengerDetails, niNumber: e.target.value });
                                    }}
                                />
                                <Dropdown
                                    inputId="Status"
                                    value={passengerDetails?.options}
                                    onChange={(e) => {
                                        setPassengerDetails({ ...passengerDetails, options: e.value });
                                    }}
                                    options={[
                                        {
                                            code: "Will be provided to solicitor",
                                            name: "Will be provided to solicitor",
                                            type: null,
                                        },
                                        {
                                            code: "Will be provided to solicitor",
                                            name: "Will be provided to solicitor",
                                            type: null,
                                        },
                                    ]}
                                    placeholder="Select"
                                    optionLabel="name"
                                />
                            </div>
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>Mobile</label>
                            <InputText
                                type="number"
                                value={passengerDetails?.mobile}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, mobile: e.target.value });
                                }}
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>Landline</label>
                            <InputText
                                type="number"
                                value={passengerDetails?.landline}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, landline: e.target.value });
                                }}
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>Email</label>
                            <InputText
                                value={passengerDetails?.email}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, email: e.target.value });
                                }}
                                type="email"
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>Address</label>
                            <div className="p-inputgroup">
                                <InputText
                                    placeholder="POSTCODE"
                                    value={passengerDetails?.address}
                                    onChange={(e) => {
                                        setPassengerDetails({ ...passengerDetails, address: e.target.value });
                                    }}
                                />
                            </div>
                        </div>

                        <div className="p-field p-col-12 p-md-12">
                            <InputText
                                placeholder="Address Line 1"
                                value={passengerDetails?.address1}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, address1: e.target.value });
                                }}
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-12">
                            <InputText
                                placeholder="Address Line 2"
                                value={passengerDetails?.address2}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, address2: e.target.value });
                                }}
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-12">
                            <InputText
                                placeholder="Address Line 3"
                                value={passengerDetails?.address3}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, address3: e.target.value });
                                }}
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>City</label>
                            <InputText
                                value={passengerDetails?.city}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, city: e.target.value });
                                }}
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>Contact </label>
                            <InputText
                                type="email"
                                value={passengerDetails?.contact}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, contact: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Injury Info">
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-4">
                            <div className="p-field-radiobutton">
                                <RadioButton
                                    inputId="city1"
                                    onChange={(e) => {
                                        setPassengerDetails({ ...passengerDetails, injured: e.value });
                                    }}
                                    name="city"
                                    value="driver"
                                    checked={"driver" === passengerDetails?.injured}
                                />
                                <label htmlFor="city1">Driver</label>
                            </div>
                            <div className="p-field-radiobutton">
                                <RadioButton
                                    onChange={(e) => {
                                        setPassengerDetails({ ...passengerDetails, injured: e.value });
                                    }}
                                    inputId="city2"
                                    name="city"
                                    value="passenger"
                                    checked={"passenger" === passengerDetails?.injured}
                                />
                                <label htmlFor="city2">Passenger</label>
                            </div>
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label> Injury Classification</label>
                            <Dropdown
                                inputId="Status"
                                value={passengerDetails?.classification}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, classification: e.value });
                                }}
                                options={status}
                                placeholder="Select"
                                optionLabel="name"
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>Injury Description</label>
                            <InputTextarea
                                value={passengerDetails?.description}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, description: e.value });
                                }}
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>Length Of Injury</label>
                            <div className="p-inputgroup">
                                <InputText
                                    type="number"
                                    value={passengerDetails?.length}
                                    onChange={(e) => {
                                        setPassengerDetails({ ...passengerDetails, length: e.value });
                                    }}
                                />
                                <span className="p-inputgroup-addon">Weeks</span>
                            </div>
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <Checkbox
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, ongoinginjury: e.checked ? "Y" : "N" });
                                }}
                                checked={"Y" === passengerDetails?.ongoinginjury}
                            ></Checkbox>
                            <label>Ongoing Injury</label>
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <Checkbox
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, evidence: e.checked ? "Y" : "N" });
                                }}
                                checked={"Y" === passengerDetails?.evidence}
                            ></Checkbox>
                            <label>Medical evidence avaliable</label>
                        </div>

                        <div className="p-field p-col-12 p-md-12">
                            <label>Details</label>
                            <InputTextarea
                                value={passengerDetails?.details}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, details: e.value });
                                }}
                            />
                        </div>
                    </div>
                </TabPanel>
            </TabView>
            <MinorModal handleMinorReturn={setMinorDetails} details={passengerDetails} show={showMinorModal} hide={setShowMinorModal} isEdit={isEdit} />
        </Dialog>
    );
}

export default PassengerModel;
