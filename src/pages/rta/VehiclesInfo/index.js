import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";

function VehiclesInfo({ handleVehicleInfoReturn }) {
    const initialState = {
        vehiclecondition: "",
        location: "",
        reportedtopolice: "",
        reportedOn: "",
        referenceNumber: "",
        registerationno: "",
        makemodel: "",
        insurer: "",
        policyno: "",
        refno: "",
        partyregno: "",
        partymakemodel: "",
        partyinsurer: "",
        partypolicyno: "",
        partyrefno: "",
        greencardno: "",
        partyname: "",
        partycontactno: "",
        partyaddress: "",
    };
    const [vehiclesDetails, setvehiclesDetails] = useState(initialState);
    const [urgentRecoveryFlag, seturgentRecoveryFlag] = useState(false);
    const [reportedToPolice, setreportedToPolice] = useState(false);

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
                                setvehiclesDetails({ ...vehiclesDetails, vehiclecondition: e.value }, seturgentRecoveryFlag(false));
                            }}
                            checked={vehiclesDetails.vehiclecondition === "D"}
                        />
                        <label htmlFor="city1"> Driveable</label>
                    </div>
                    <div className="p-field-radiobutton">
                        <RadioButton
                            value="Non-driveable"
                            onChange={(e) => {
                                setvehiclesDetails({ ...vehiclesDetails, vehiclecondition: e.value }, seturgentRecoveryFlag(false));
                            }}
                            checked={vehiclesDetails.vehiclecondition === "Non-driveable"}
                        />
                        <label htmlFor="city2">Non-driveable</label>
                    </div>
                    <div className="p-field-radiobutton">
                        <RadioButton
                            value="Urgent recovery"
                            onChange={(e) => {
                                setvehiclesDetails({ ...vehiclesDetails, vehiclecondition: e.value }, seturgentRecoveryFlag(true));
                            }}
                            checked={vehiclesDetails.vehiclecondition === "Urgent recovery"}
                        />
                        <label htmlFor="city2">Urgent recovery</label>
                    </div>
                </div>
                {urgentRecoveryFlag ? (
                    <div className="p-field p-col-12 p-md-6">
                        <label>Location</label>
                        <div className="p-inputgroup">
                            <InputText
                                value={vehiclesDetails?.location}
                                onChange={(e) => {
                                    setvehiclesDetails({ ...vehiclesDetails, location: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    ""
                )}

                <div className="p-field p-col-12 p-md-6">
                    <Checkbox
                        value="Y"
                        onChange={(e) => {
                            const reportedtopolice = e.checked ? "Y" : "N";
                            setvehiclesDetails({ ...vehiclesDetails, reportedtopolice });
                            setreportedToPolice(e.checked);
                        }}
                        checked={vehiclesDetails.reportedtopolice}
                    ></Checkbox>
                    <label>Reported To Police</label>
                </div>

                {/* THIRD PARTY */}
                <div className="p-field p-col-12 p-md-4">
                    <label>Registration Number</label>
                    <div className="p-inputgroup">
                        <InputText
                            value={vehiclesDetails?.registerationno}
                            onChange={(e) => {
                                setvehiclesDetails({ ...vehiclesDetails, registerationno: e.target.value });
                            }}
                        />
                        <Dropdown
                            options={[{ name: "Will provide to solicitor" }]}
                            onChange={(e) => {
                                setvehiclesDetails({ ...vehiclesDetails, registerationno: e.value.name });
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Make Model</label>
                    <InputText
                        value={vehiclesDetails?.makemodel}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, makemodel: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Insurer</label>
                    <InputText
                        value={vehiclesDetails?.insurer}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, insurer: e.target.value });
                        }}
                        placeholder="insurer"
                    />
                    <InputText
                        value={vehiclesDetails?.policyno}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, policyno: e.target.value });
                        }}
                        placeholder="policy number"
                    />
                    <InputText
                        value={vehiclesDetails?.refno}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, refno: e.target.value });
                        }}
                        placeholder="claim reference number"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Registration Number</label>
                    <div className="p-inputgroup">
                        <InputText
                            value={vehiclesDetails?.partyregno}
                            onChange={(e) => {
                                setvehiclesDetails({ ...vehiclesDetails, partyregno: e.target.value });
                            }}
                        />
                        <Dropdown
                            options={[{ name: "No TP Reg" }]}
                            onChange={(e) => {
                                setvehiclesDetails({ ...vehiclesDetails, partyregno: e.value.name });
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Make Model</label>
                    <InputText
                        value={vehiclesDetails?.partymakemodel}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, partymakemodel: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Insurer</label>
                    <InputText
                        value={vehiclesDetails?.partyinsurer}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, partyinsurer: e.target.value });
                        }}
                        placeholder="insurer"
                    />
                    <InputText
                        value={vehiclesDetails?.partypolicyno}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, partypolicyno: e.target.value });
                        }}
                        placeholder="policy number"
                    />
                    <InputText
                        value={vehiclesDetails?.partyrefno}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, partyrefno: e.target.value });
                        }}
                        placeholder="claim reference number"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Green Number</label>
                    <InputText
                        value={vehiclesDetails?.greencardno}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, greencardno: e.target.value });
                        }}
                        placeholder="Green card if TP vehicle is foreign"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Third Party Name</label>
                    <InputText
                        value={vehiclesDetails?.partyname}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, partyname: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Contact Number</label>
                    <InputText
                        value={vehiclesDetails?.partycontactno}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, partycontactno: e.target.value });
                        }}
                        type="number"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Address</label>
                    <InputTextarea
                        value={vehiclesDetails?.partyaddress}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, partyaddress: e.target.value });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default VehiclesInfo;
