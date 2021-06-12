import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { minordetails } from "../../../utilities/constants";
import { minorValidation } from "../../../utilities/validation";

function MinorModal({ show, hide, handleMinorReturn, isEdit, details, minordata, viewmode }) {
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

    const [minorDetails, setMinorDetails] = useState(minordata && Object.keys(minordata).length ? minordata : minordetails);
    const [titleValue, settitleValue] = useState("");
    const [errors, seterrors] = useState({});

    const handleMinor = async () => {
        const isvalid = await minorValidation(minorDetails);
        seterrors(isvalid?.errors);
        if (!Object.keys(isvalid?.errors).length) {
            handleMinorReturn(minorDetails);
            hide(false);
        }
    };

    //Match Keys & Map Edit Values to Minor Details
    const setValues = React.useCallback(() => {
        if (details && Object.keys(details).length) {
            let newObj = {};
            Object.keys(details).forEach((dt) => {
                Object.keys(minordetails).forEach((ins) => {
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

    const footer = (
        <div>
            <Button label={isEdit ? "Update" : "Add"} onClick={handleMinor} icon="pi pi-check" isEdit />
        </div>
    );

    return (
        <Dialog header={isEdit ? "Update Litigation Friend" : "Litigation Friend"} footer={footer} visible={show} onHide={() => hide(false)} breakpoints={breakpoints} style={{ width: "50vw" }}>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-3">
                    <label htmlFor="Status"> Title</label>
                    <Dropdown
                        disabled={viewmode}
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
                        disabled={viewmode}
                        value={minorDetails?.gfirstname}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gfirstname: e.target.value });
                        }}
                        className={errors?.gfirstname && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.gfirstname}</small>
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <label> Middle Name</label>
                    <InputText
                        disabled={viewmode}
                        value={minorDetails?.gmiddleName}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gmiddleName: e.target.value });
                        }}
                        className={errors?.gmiddleName && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.gmiddleName}</small>
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label> Last Name</label>
                    <InputText
                        disabled={viewmode}
                        value={minorDetails?.glastName}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, glastName: e.target.value });
                        }}
                        className={errors?.glastName && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.glastName}</small>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label>Date of Birth</label>
                    <InputText
                        disabled={viewmode}
                        type="date"
                        value={minorDetails?.gdob}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gdob: e.target.value });
                        }}
                        className={errors?.gdob && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.gdob}</small>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label>Address</label>
                    <InputText
                        disabled={viewmode}
                        placeholder="Postal Code"
                        value={minorDetails?.gpostalcode}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gpostalcode: e.target.value });
                        }}
                        className={errors?.gpostalcode && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.gpostalcode}</small>
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <label>Email</label>
                    <InputText
                        disabled={viewmode}
                        placeholder="Email Adress"
                        value={minorDetails?.gemail}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gemail: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <InputText
                        disabled={viewmode}
                        placeholder="Address Line 1"
                        value={minorDetails?.gaddress1}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gaddress1: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <InputText
                        disabled={viewmode}
                        placeholder="Address Line 2"
                        value={minorDetails?.gaddress2}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gaddress2: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <InputText
                        disabled={viewmode}
                        placeholder="Address Line 3"
                        value={minorDetails?.gaddress3}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gaddress3: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <InputText
                        disabled={viewmode}
                        placeholder="City"
                        value={minorDetails?.city}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, city: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <InputText
                        disabled={viewmode}
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
