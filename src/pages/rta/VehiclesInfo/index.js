import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";

function VehiclesInfo({ handleVehicleInfoReturn }) {
    const initialState = {
        conditionOfVehicle: "",
        location: "",
        reportedToPolice: "",
        reportedOn: "",
        referenceNumber: "",
        registrationNumberClaimant: "",
        makeModelClaimant: "",
        insurerClaimant: "",
        policyNumberClaimant: "",
        claimReferenceNumberClaimant: "",
        registrationNumberThirdParty: "",
        makeModelThirdParty: "",
        insurerThirdParty: "",
        policyNumberThirdParty: "",
        claimReferenceNumberThirdParty: "",
        greenNumber: "",
        thirdPartyName: "",
        contactNumber: "",
        address: "",
    };
    const [vehiclesDetails, setvehiclesDetails] = useState(initialState);
    const [urgentRecoveryFlag, seturgentRecoveryFlag] = useState(false);
    const [reportedToPoliceFlag, setreportedToPoliceFlag] = useState(true);
    const handleReportedToPolice = async (e) => {
        setvehiclesDetails({ ...vehiclesDetails, reportedToPolice: e.checked });
        vehiclesDetails.reportedToPolice ? setreportedToPoliceFlag(true) : setreportedToPoliceFlag(false);
    };

    useEffect(() => {
        handleVehicleInfoReturn(vehiclesDetails);
    }, [vehiclesDetails, handleVehicleInfoReturn]);
    return (
        <div>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-3">
                    <div className="p-field-radiobutton">
                        <RadioButton
                            value="D"
                            onChange={(e) => {
                                setvehiclesDetails({ ...vehiclesDetails, conditionOfVehicle: e.value }, seturgentRecoveryFlag(false));
                            }}
                            checked={vehiclesDetails.conditionOfVehicle === "D"}
                        />
                        <label htmlFor="city1"> Driveable</label>
                    </div>
                    <div className="p-field-radiobutton">
                        <RadioButton
                            value="Non-driveable"
                            onChange={(e) => {
                                setvehiclesDetails({ ...vehiclesDetails, conditionOfVehicle: e.value }, seturgentRecoveryFlag(false));
                            }}
                            checked={vehiclesDetails.conditionOfVehicle === "Non-driveable"}
                        />
                        <label htmlFor="city2">Non-driveable</label>
                    </div>
                    <div className="p-field-radiobutton">
                        <RadioButton
                            value="Urgent recovery"
                            onChange={(e) => {
                                setvehiclesDetails({ ...vehiclesDetails, conditionOfVehicle: e.value }, seturgentRecoveryFlag(true));
                            }}
                            checked={vehiclesDetails.conditionOfVehicle === "Urgent recovery"}
                        />
                        <label htmlFor="city2">Urgent recovery</label>
                    </div>
                </div>
                {urgentRecoveryFlag ? (
                    <div className="p-field p-col-12 p-md-2">
                        <label>Location</label>
                        <div className="p-inputgroup">
                            <InputText
                                value={vehiclesDetails?.location}
                                onChange={(e) => {
                                    setvehiclesDetails({ ...vehiclesDetails, location: e.value });
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    ""
                )}

                <div className="p-field p-col-12 p-md-2">
                    <Checkbox
                        value="Y"
                        onChange={(e) => {
                            handleReportedToPolice(e);
                        }}
                        checked={vehiclesDetails.reportedToPolice}
                    ></Checkbox>
                    <label>Reported To Police</label>
                </div>

                <div className="p-field p-col-12 p-md-2">
                    <InputText
                        disabled={reportedToPoliceFlag}
                        value={vehiclesDetails?.reportedOn}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, reportedOn: e.value });
                        }}
                        placeholder="reported on"
                    />
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <InputText
                        disabled={reportedToPoliceFlag}
                        value={vehiclesDetails?.referenceNumber}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, referenceNumber: e.value });
                        }}
                        placeholder="reference number"
                    />
                </div>

                {/* THIRD PARTY */}
                <div className="p-field p-col-12 p-md-4">
                    <label>Registration Number</label>
                    <div className="p-inputgroup">
                        <InputText
                            value={vehiclesDetails?.registrationNumberClaimant}
                            onChange={(e) => {
                                setvehiclesDetails({ ...vehiclesDetails, registrationNumberClaimant: e.value });
                            }}
                        />
                        <Dropdown
                            options={[{ name: "Will provide to solicitor" }]}
                            onChange={(e) => {
                                setvehiclesDetails({ ...vehiclesDetails, registrationNumberClaimant: e.value.name });
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Make Model</label>
                    <InputText
                        value={vehiclesDetails?.makeModelClaimant}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, makeModelClaimant: e.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Insurer</label>
                    <InputText
                        value={vehiclesDetails?.insurerClaimant}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, insurerClaimant: e.value });
                        }}
                        placeholder="insurer"
                    />
                    <InputText
                        value={vehiclesDetails?.policyNumberClaimant}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, policyNumberClaimant: e.value });
                        }}
                        placeholder="policy number"
                    />
                    <InputText
                        value={vehiclesDetails?.claimReferenceNumberClaimant}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, claimReferenceNumberClaimant: e.value });
                        }}
                        placeholder="claim reference number"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Registration Number</label>
                    <div className="p-inputgroup">
                        <InputText
                            value={vehiclesDetails?.registrationNumberThirdParty}
                            onChange={(e) => {
                                setvehiclesDetails({ ...vehiclesDetails, registrationNumberThirdParty: e.value });
                            }}
                        />
                        <Dropdown
                            options={[{ name: "No TP Reg" }]}
                            onChange={(e) => {
                                setvehiclesDetails({ ...vehiclesDetails, registrationNumberThirdParty: e.value.name });
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Make Model</label>
                    <InputText
                        value={vehiclesDetails?.makeModelThirdParty}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, makeModelThirdParty: e.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Insurer</label>
                    <InputText
                        value={vehiclesDetails?.insurerThirdParty}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, insurerThirdParty: e.value });
                        }}
                        placeholder="insurer"
                    />
                    <InputText
                        value={vehiclesDetails?.policyNumberThirdParty}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, policyNumberThirdParty: e.value });
                        }}
                        placeholder="policy number"
                    />
                    <InputText
                        value={vehiclesDetails?.claimReferenceNumberThirdParty}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, claimReferenceNumberThirdParty: e.value });
                        }}
                        placeholder="claim reference number"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Green Number</label>
                    <InputText
                        value={vehiclesDetails?.greenNumber}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, greenNumber: e.value });
                        }}
                        placeholder="Green card if TP vehicle is foreign"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Third Party Name</label>
                    <InputText
                        value={vehiclesDetails?.thirdPartyName}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, thirdPartyName: e.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Contact Number</label>
                    <InputText
                        value={vehiclesDetails?.contactNumber}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, contactNumber: e.value });
                        }}
                        type="number"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Address</label>
                    <InputTextarea
                        value={vehiclesDetails?.address}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, address: e.value });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default VehiclesInfo;
