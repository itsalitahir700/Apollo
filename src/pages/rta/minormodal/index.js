import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { minordetails } from "../../../utilities/constants";
import { minorValidation } from "../../../utilities/validation";
import { getAddress, getAddressValues, getFurtherAddressService } from "../../../services/Rta";
import "../rta.css";
import { isArray } from "lodash";

function MinorModal({ show, hide, handleMinorReturn, isEdit, details, minorData, viewmode, claimantAddress, completeData }) {
    const breakpoints = { "960px": "75vw", "640px": "100vw" };
    let states = [
        {
            code: "Mr",
            name: "Mr",
            type: null,
        },
        {
            code: "Mrs",
            name: "Mrs",
            type: null,
        },
        {
            code: "Miss",
            name: "Miss",
            type: null,
        },
        {
            code: "Ms",
            name: "Ms",
            type: null,
        },
        {
            code: "Mstr",
            name: "Mstr",
            type: null,
        },
        {
            code: "Dr",
            name: "Dr",
            type: null,
        },
        {
            code: "Prof",
            name: "Prof",
            type: null,
        },
        {
            code: "Rev",
            name: "Rev",
            type: null,
        },
    ];

    const [minorDetails, setMinorDetails] = useState(minorData && Object.keys(minorData).length ? minorData : minordetails);
    const [titleValue, settitleValue] = useState("");
    const [adult, setAdult] = useState("");
    const [errors, seterrors] = useState({});

    useEffect(() => {
        setMinorDetails(minorData && Object.keys(minorData).length ? minorData : minordetails);
    }, [minorData]);

    const [addressItems, setaddressItems] = useState("");
    const [addressItemsValue, setaddressItemsValue] = useState("");
    const [addressFurtherItems, setaddressFurtherItems] = useState("");
    const [addressFurtherItemsValue, setaddressFurtherItemsValue] = useState("");
    const [showFurtherAddress, setshowFurtherAddress] = useState(false);
    const [adults, setAdults] = useState([]);

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

    const handleMinor = async () => {
        const isvalid = await minorValidation(minorDetails);
        seterrors(isvalid?.errors);
        if (!Object.keys(isvalid?.errors).length) {
            handleMinorReturn(minorDetails);
            hide(false);
        }
    };

    const handleAddress = async () => {
        setMinorDetails({ ...minorDetails, gaddress1: "", gaddress2: "", gaddress3: "", gcity: "", gregion: "" });
        const postcode = minorDetails?.gpostalcode;
        const res = await getAddress("https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.10/json3.ws", postcode);
        setaddressItems(res.Items);
    };

    const handleAddressValue = async (e) => {
        setaddressFurtherItemsValue("");
        setaddressItemsValue(e.target.value);
        if (
            e.target.value.Highlight === "0-1" ||
            e.target.value.Highlight === "0-2" ||
            e.target.value.Highlight === "0-3" ||
            e.target.value.Highlight === "0-4" ||
            e.target.value.Highlight === "0-5" ||
            e.target.value.Highlight === "0-6" ||
            e.target.value.Highlight === "0-7" ||
            e.target.value.Highlight === "0-8" ||
            e.target.value.Highlight === "0-9"
        ) {
            getFurtherAddress(e.target.value);
        } else {
            setshowFurtherAddress(false);
            const res = await getAddressValues("https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json3.ws", e.target.value.Id);
            setMinorDetails({ ...minorDetails, gaddress1: res?.Items[0]?.Line1, gaddress2: res?.Items[0]?.Line2, gaddress3: res?.Items[0]?.Line3, gcity: res?.Items[0]?.City, gregion: res?.Items[0]?.Province });
        }
    };

    const handleAddressFurtherValue = async (e) => {
        setaddressFurtherItemsValue(e.target.value);
        const res = await getAddressValues("https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json3.ws", e.target.value.Id);
        setMinorDetails({ ...minorDetails, gaddress1: res?.Items[0]?.Line1, gaddress2: res?.Items[0]?.Line2, gaddress3: res?.Items[0]?.Line3, gcity: res?.Items[0]?.City, gregion: res?.Items[0]?.Province });
    };

    const getFurtherAddress = async (data) => {
        setshowFurtherAddress(true);
        const res = await getFurtherAddressService("https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.10/json3.ws", data);
        setaddressFurtherItems(res.Items);
    };

    const useClaimantAddress = () => {
        setMinorDetails({ ...minorDetails, ...claimantAddress });
    };

    const handleAdultsDropdown = (data, adultsArr = []) => {
        Object.keys(data).forEach((key) => {
            if (isArray(data[key])) {
                data[key].forEach((obj, ind) => {
                    handleAdultsDropdown({ [ind]: obj }, adultsArr);
                });
            } else if (typeof data[key] === "object" && "dob" in data[key] && calculate_age(data[key].dob) > 17) adultsArr.push(data[key]);
        });
        setAdults(adultsArr);
    };

    const handleAdultSelection = (obj) => {
        // rename each key and start with g
        const newObj = {};
        Object.keys(obj).forEach((key) => {
            newObj[`g${key}`] = obj[key];
        });
        setMinorDetails({ ...minorDetails, ...newObj });
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

    useEffect(() => {
        if (completeData && Object.keys(completeData).length) handleAdultsDropdown(completeData);
    }, [completeData]);

    const footer = (
        <div>
            <Button label={isEdit ? "Update" : "Add"} onClick={handleMinor} icon="pi pi-check" isEdit />
        </div>
    );

    return (
        <Dialog header={isEdit ? "Update Litigation Friend" : "Litigation Friend"} footer={footer} visible={show} onHide={() => hide(false)} breakpoints={breakpoints} style={{ width: "50vw" }}>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-3">
                    <label htmlFor="Status"> Available Adults</label>
                    <Dropdown
                        disabled={viewmode}
                        inputId="adults"
                        value={adult}
                        onChange={(e) => {
                            setAdult(e.value);
                            handleAdultSelection(e.target.value);
                        }}
                        options={adults}
                        placeholder="Select"
                        optionLabel="firstname"
                    />
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label htmlFor="Status"> Title</label>
                    <Dropdown
                        disabled={viewmode}
                        inputId="Status"
                        value={titleValue || ""}
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
                        value={minorDetails?.gfirstname || ""}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gfirstname: e.target.value.capitalizeEveryWord() });
                        }}
                        className={errors?.gfirstname && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.gfirstname}</small>
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <label> Middle Name</label>
                    <InputText
                        disabled={viewmode}
                        value={minorDetails?.gmiddlename || ""}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gmiddlename: e.target.value.capitalizeEveryWord() });
                        }}
                        className={errors?.gmiddlename && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.gmiddlename}</small>
                </div>

                <div className="p-field p-col-12 p-md-3">
                    <label> Last Name</label>
                    <InputText
                        disabled={viewmode}
                        value={minorDetails?.glastname || ""}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, glastname: e.target.value.capitalizeEveryWord() });
                        }}
                        className={errors?.glastname && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.glastname}</small>
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label>Date of Birth</label>
                    <InputText
                        disabled={viewmode}
                        type="date"
                        value={minorDetails?.gdob || ""}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gdob: e.target.value });
                        }}
                        className={errors?.gdob && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.gdob}</small>
                </div>
                <div className="p-field p-col-12 p-md-8">
                    <label>Address *</label>
                    <Button disabled={viewmode} label="Use claimant address" onClick={useClaimantAddress} style={{ float: "right" }} className="use-claimant"></Button>
                    <div className="p-inputgroup">
                        <InputText
                            disabled={viewmode}
                            placeholder="post code"
                            value={minorDetails?.gpostalcode || ""}
                            onChange={(e) => {
                                setMinorDetails({ ...minorDetails, gpostalcode: e.target.value });
                            }}
                            className={errors?.gpostalcode && "p-invalid p-d-block"}
                        />
                        <Button
                            label="lookup"
                            onClick={() => {
                                handleAddress();
                            }}
                        ></Button>
                        <Dropdown
                            onChange={(e) => {
                                handleAddressValue(e);
                            }}
                            value={addressItemsValue || ""}
                            options={addressItems}
                            placeholder="Select"
                            optionLabel="Description"
                        />
                        {showFurtherAddress === true ? (
                            <Dropdown
                                onChange={(e) => {
                                    handleAddressFurtherValue(e);
                                }}
                                value={addressFurtherItemsValue}
                                options={addressFurtherItems}
                                placeholder="Select"
                                optionLabel="Description"
                            />
                        ) : (
                            ""
                        )}
                    </div>

                    <small className="p-error p-d-block">{errors?.gpostalcode}</small>
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <label>Address line 1</label>
                    <InputText
                        disabled={viewmode}
                        value={minorDetails?.gaddress1 || ""}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gaddress1: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <label>Address line 2</label>
                    <InputText
                        disabled={viewmode}
                        value={minorDetails?.gaddress2 || ""}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gaddress2: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <label>Address line 3</label>
                    <InputText
                        disabled={viewmode}
                        value={minorDetails?.gaddress3 || ""}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gaddress3: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label>City</label>
                    <InputText
                        disabled={viewmode}
                        value={minorDetails?.gcity || ""}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gcity: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label>Region</label>
                    <InputText
                        disabled={viewmode}
                        value={minorDetails?.gregion || ""}
                        onChange={(e) => {
                            setMinorDetails({ ...minorDetails, gregion: e.target.value });
                        }}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default MinorModal;
