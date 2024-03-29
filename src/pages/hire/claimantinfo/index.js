import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { claimantdetails } from "../../../utilities/constants";
import { getAddress, getAddressValues, getFurtherAddressService } from "../../../services/Rta";

function ClaimantInfo({ showMinorModal, handleClaimantReturn, claimantdata, viewmode, errors }) {
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
    const [claimantDetails, setclaimantDetails] = useState(claimantdata && Object.keys(claimantdata).length ? claimantdata : claimantdetails);
    const [scotland, setscotland] = useState("");
    const [minor, setMinor] = useState(false);

    const [addressItems, setaddressItems] = useState("");
    const [addressItemsValue, setaddressItemsValue] = useState("");
    const [addressFurtherItems, setaddressFurtherItems] = useState("");
    const [addressFurtherItemsValue, setaddressFurtherItemsValue] = useState("");
    const [showFurtherAddress, setshowFurtherAddress] = useState(false);
    const [currentAge, setcurrentAge] = useState("");

    const handleAge = (dob) => {
        let age_limit = 18;
        if (claimantDetails?.scotland === "Y") {
            age_limit = 16;
        }
        setclaimantDetails({ ...claimantDetails, dob: dob, ninumber: calculate_age(dob) < age_limit ? "Minor" : "" });
        if (calculate_age(dob) < age_limit) {
            setMinor(true);
        } else {
            setMinor(false);
        }
    };
    useEffect(() => {
        if (claimantDetails?.dob !== "" && claimantDetails?.dob !== null && claimantDetails?.dob !== undefined) {
            let age_limit = 18;
            if (claimantDetails?.scotland === "Y") {
                age_limit = 16;
            }
            if (calculate_age(claimantDetails.dob) < age_limit) {
                setMinor(true);
            } else {
                setMinor(false);
            }
        }
    }, [claimantDetails?.dob, viewmode, claimantDetails?.scotland]);

    const calculate_age = (dob1) => {
        var today = new Date();
        var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
        }
        setcurrentAge(age_now);
        return age_now;
    };

    const handleAdress = async () => {
        setclaimantDetails({ ...claimantDetails, address1: "", address2: "", address3: "", city: "", region: "" });
        const postcode = claimantDetails?.postalcode;
        const res = await getAddress("https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.10/json3.ws", postcode);
        setaddressItems(res.Items);
    };

    const hanleAddressValue = async (e) => {
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
            setclaimantDetails({ ...claimantDetails, address1: res?.Items[0]?.Line1, address2: res?.Items[0]?.Line2, address3: res?.Items[0]?.Line3, city: res?.Items[0]?.City, region: res?.Items[0]?.Province });
        }
    };

    const hanleAddressFurtherValue = async (e) => {
        setaddressFurtherItemsValue(e.target.value);
        const res = await getAddressValues("https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json3.ws", e.target.value.Id);
        setclaimantDetails({ ...claimantDetails, address1: res?.Items[0]?.Line1, address2: res?.Items[0]?.Line2, address3: res?.Items[0]?.Line3, city: res?.Items[0]?.City, region: res?.Items[0]?.Province });
    };

    const getFurtherAddress = async (data) => {
        setshowFurtherAddress(true);
        const res = await getFurtherAddressService("https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.10/json3.ws", data);
        setaddressFurtherItems(res.Items);
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
                    <label htmlFor="Status">Title</label>
                    <Dropdown
                        value={{ code: claimantDetails?.title, name: claimantDetails?.title, type: null }}
                        disabled={viewmode}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, title: e.value.name });
                        }}
                        options={states}
                        placeholder="Select"
                        optionLabel="name"
                    />
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <label>First Name *</label>
                    <InputText
                        value={claimantDetails?.firstname || ""}
                        disabled={viewmode}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, firstname: e.target.value.capitalizeEveryWord() });
                        }}
                        className={errors?.firstname && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.firstname}</small>
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <label>Middle Name</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.middlename || ""}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, middlename: e.target.value.capitalizeEveryWord() });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <label>Surname *</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.lastname || ""}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, lastname: e.target.value.capitalizeEveryWord() });
                        }}
                        className={errors?.lastname && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.lastname}</small>
                </div>
                <div className="p-field p-col-12 p-md-4 p-d-flex" style={{ marginTop: "25px" }}>
                    <Checkbox
                        disabled={viewmode}
                        onChange={(e) => {
                            const scotlandvalue = e.checked ? "Y" : "N";
                            setclaimantDetails({ ...claimantDetails, scotland: scotlandvalue });
                            setscotland(e.checked);
                        }}
                        checked={scotland}
                    ></Checkbox>
                    <label style={{ paddingLeft: "1%" }}>Did the Accident occur in Scotland?</label>
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label>Date of Birth *</label>
                    {minor && <Button label="Minor" className="p-bPassworutton-danger minor" onClick={() => showMinorModal(true)} style={{ float: "right" }}></Button>}
                    {currentAge !== "" && (
                        <span style={{ paddingLeft: "20%" }}>
                            <Button label={currentAge + "Year(s)"} className="p-bPassworutton-danger minor" disabled></Button>
                        </span>
                    )}
                    <InputText
                        onBlur={() => {
                            minor && showMinorModal(true);
                        }}
                        disabled={viewmode}
                        value={claimantDetails?.dob}
                        type="date"
                        onChange={(e) => handleAge(e.target.value)}
                        className={errors?.dob && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.dob}</small>
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label>Password</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.password || ""}
                        type="text"
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, password: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label>Ni Number *</label>
                    <div className="p-inputgroup">
                        <InputText
                            disabled={viewmode}
                            value={claimantDetails?.ninumber}
                            onChange={(e) => {
                                setclaimantDetails({ ...claimantDetails, ninumber: e.target.value.toUpperCase() });
                            }}
                            className={errors?.ninumber && "p-invalid p-d-block"}
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
                    <small className="p-error p-d-block">{errors?.ninumber}</small>
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <label>Standard of English *</label>
                    <div className="p-inputgroup">
                        <InputText
                            disabled={viewmode}
                            value={claimantDetails?.englishlevel || ""}
                            onChange={(e) => {
                                setclaimantDetails({ ...claimantDetails, englishlevel: e.target.value });
                            }}
                            className={errors?.englishlevel && "p-invalid p-d-block"}
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
                    <small className="p-error p-d-block">{errors?.englishlevel}</small>
                </div>
                {claimantDetails?.englishlevel === "Poor" ? (
                    <div className="p-field p-col-12 p-md-3">
                        <label>Translator Details</label>
                        <InputText
                            disabled={viewmode}
                            value={claimantDetails?.translatordetail || ""}
                            onChange={(e) => {
                                setclaimantDetails({ ...claimantDetails, translatordetail: e.target.value });
                            }}
                            className={errors?.mobile && "p-invalid p-d-block"}
                        />
                    </div>
                ) : (
                    ""
                )}

                <div className="p-field p-col-12 p-md-4">
                    <label>Mobile *</label>
                    <InputText
                        type="number"
                        disabled={viewmode}
                        value={claimantDetails?.mobile || ""}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, mobile: e.target.value });
                        }}
                        className={errors?.mobile && "p-invalid p-d-block"}
                    />
                    <small className="p-error p-d-block">{errors?.mobile}</small>
                </div>

                <div className="p-field p-col-12 p-md-2">
                    <label>Landline</label>
                    <InputText
                        type="number"
                        disabled={viewmode}
                        value={claimantDetails?.landLine || ""}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, landLine: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <label>Alternative Number *</label>
                    <InputText
                        type="number"
                        disabled={viewmode}
                        value={claimantDetails?.alternativenumber || ""}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, alternativenumber: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <label>Email Address</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.email || ""}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, email: e.target.value });
                        }}
                        type="email"
                    />
                </div>
                <div className="p-field p-col-12 p-md-8">
                    <label>Address *</label>
                    <div className="p-inputgroup">
                        <InputText
                            disabled={viewmode}
                            placeholder="postalcode"
                            value={claimantDetails?.postalcode || ""}
                            onChange={(e) => {
                                setclaimantDetails({ ...claimantDetails, postalcode: e.target.value });
                            }}
                            className={errors?.postalcode && "p-invalid p-d-block"}
                        />
                        <Button
                            disabled={viewmode}
                            label="lookup"
                            onClick={() => {
                                handleAdress();
                            }}
                        ></Button>
                        <Dropdown
                            onChange={(e) => {
                                hanleAddressValue(e);
                            }}
                            value={addressItemsValue || ""}
                            options={addressItems}
                            placeholder="Select"
                            optionLabel="Description"
                        />
                        {showFurtherAddress === true ? (
                            <Dropdown
                                onChange={(e) => {
                                    hanleAddressFurtherValue(e);
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
                    <small className="p-error p-d-block">{errors?.postalcode}</small>
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label>Address line 1</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.address1 || ""}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, address1: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label>Address line 2</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.address2 || ""}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, address2: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label>Address line 3</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.address3 || ""}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, address3: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label>City</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.city || ""}
                        onChange={(e) => {
                            setclaimantDetails({ ...claimantDetails, city: e.target.value });
                        }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label>Region</label>
                    <InputText
                        disabled={viewmode}
                        value={claimantDetails?.region || ""}
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
