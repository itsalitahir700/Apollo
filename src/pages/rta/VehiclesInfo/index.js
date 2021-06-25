import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { getMakeModelService } from "../../../services/Rta";

function VehiclesInfo({ handleVehicleInfoReturn, vehicledata, viewmode, errors }) {
    const initialState = {
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
    const [vehiclesDetails, setvehiclesDetails] = useState(vehicledata && Object.keys(vehicledata).length ? vehicledata : initialState);
    const [reportedToPolice, setreportedToPolice] = useState(false);

    const getMakeModel = async () => {
        const res = await getMakeModelService(`https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleData?v=2&api_nullitems=1&auth_apikey=f0eb8944-03b9-4ead-a05b-fcb8d155d04c&user_tag=&key_VRM=${vehiclesDetails?.registerationno}`);
        console.log(res);
        setvehiclesDetails({ ...vehiclesDetails, makemodel: res?.Response?.DataItems?.VehicleRegistration?.MakeModel });
    };

    const getThirdPartyMakeModel = async () => {
        const res = await getMakeModelService(`https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleData?v=2&api_nullitems=1&auth_apikey=f0eb8944-03b9-4ead-a05b-fcb8d155d04c&user_tag=&key_VRM=${vehiclesDetails?.partyregno}`);
        console.log(res);
        setvehiclesDetails({ ...vehiclesDetails, partymakemodel: res?.Response?.DataItems?.VehicleRegistration?.MakeModel });
    };

    useEffect(() => {
        handleVehicleInfoReturn(vehiclesDetails);
    }, [vehiclesDetails, handleVehicleInfoReturn]);

    useEffect(() => {
        setvehiclesDetails(vehicledata);
    }, [vehicledata]);

    return (
        <div>
            <div className="p-fluid p-formgrid p-grid">
                {/* THIRD PARTY */}
                <div className="p-field p-col-12 p-md-4">
                    <label>Clients Registration</label>
                    <div className="p-inputgroup">
                        <InputText
                            disabled={viewmode}
                            value={vehiclesDetails?.registerationno}
                            onChange={(e) => {
                                setvehiclesDetails({ ...vehiclesDetails, registerationno: e.target.value });
                            }}
                            onBlur={(e) => {
                                getMakeModel();
                            }}
                            className={errors?.registerationno && "p-invalid p-d-block"}
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
                    <small className="p-error p-d-block">{errors?.registerationno}</small>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Make & Model</label>
                    <InputText
                        disabled={viewmode}
                        value={vehiclesDetails?.makemodel}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, makemodel: e.target.value });
                        }}
                        className={errors?.makemodel && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.makemodel}</small>
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Clients Insurer Details</label>
                    <InputText
                        disabled={viewmode}
                        value={vehiclesDetails?.insurer}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, insurer: e.target.value });
                        }}
                        placeholder="insurer"
                    />
                    <InputText
                        disabled={viewmode}
                        value={vehiclesDetails?.policyno}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, policyno: e.target.value });
                        }}
                        placeholder="policy number"
                    />
                    <InputText
                        disabled={viewmode}
                        value={vehiclesDetails?.refno}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, refno: e.target.value });
                        }}
                        placeholder="claim reference number"
                    />
                </div>

                <Divider align="center" type="dashed">
                    <b>3rd Party Details</b>
                </Divider>

                <div className="p-field p-col-12 p-md-4">
                    <label>TP Registration</label>
                    <div className="p-inputgroup">
                        <InputText
                            disabled={viewmode}
                            value={vehiclesDetails?.partyregno}
                            onChange={(e) => {
                                setvehiclesDetails({ ...vehiclesDetails, partyregno: e.target.value });
                            }}
                            onBlur={(e) => {
                                getThirdPartyMakeModel();
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
                    <label>Make & Model</label>
                    <InputText
                        disabled={viewmode}
                        value={vehiclesDetails?.partymakemodel}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, partymakemodel: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>TP Insurer Details</label>
                    <InputText
                        disabled={viewmode}
                        value={vehiclesDetails?.partyinsurer}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, partyinsurer: e.target.value });
                        }}
                        placeholder="insurer"
                    />
                    <InputText
                        disabled={viewmode}
                        value={vehiclesDetails?.partypolicyno}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, partypolicyno: e.target.value });
                        }}
                        placeholder="policy number"
                    />
                    <InputText
                        disabled={viewmode}
                        value={vehiclesDetails?.partyrefno}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, partyrefno: e.target.value });
                        }}
                        placeholder="claim reference number"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>Green Card Number</label>
                    <InputText
                        disabled={viewmode}
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
                        disabled={viewmode}
                        value={vehiclesDetails?.partyname}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, partyname: e.target.value });
                        }}
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <label>TP Contact Number</label>
                    <InputText
                        disabled={viewmode}
                        value={vehiclesDetails?.partycontactno}
                        onChange={(e) => {
                            setvehiclesDetails({ ...vehiclesDetails, partycontactno: e.target.value });
                        }}
                        type="number"
                    />
                </div>

                <div className="p-field p-col-12 p-md-4">
                    <Checkbox
                        disabled={viewmode}
                        value="Y"
                        onChange={(e) => {
                            const reportedtopolice = e.checked ? "Y" : "N";
                            setvehiclesDetails({ ...vehiclesDetails, reportedtopolice });
                            setreportedToPolice(e.checked);
                        }}
                        checked={reportedToPolice}
                    ></Checkbox>
                    <label>Reported To Police</label>
                </div>

                {vehiclesDetails?.reportedtopolice === "Y" ? (
                    <div className="p-field p-col-12 p-md-4">
                        <label>Report On</label>
                        <InputText
                            disabled={viewmode}
                            value={vehiclesDetails?.reportedOn}
                            onChange={(e) => {
                                setvehiclesDetails({ ...vehiclesDetails, reportedOn: e.target.value });
                            }}
                            placeholder="Date"
                            type="date"
                        />
                    </div>
                ) : (
                    ""
                )}

                <div className="p-field p-col-12 p-md-4">
                    <label>TP Address</label>
                    <InputText
                        disabled={viewmode}
                        area
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
