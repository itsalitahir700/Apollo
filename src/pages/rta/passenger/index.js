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
import { getInjuryClassification } from "../../../services/Lovs";
import { vehicledetails } from "../../../utilities/constants";
import { passengerValidation } from "../../../utilities/validation";
import { getAddress, getAddressValues, getFurtherAddressService } from "../../../services/Rta";

function PassengerModel({ driverOrPassenger, status, show, hide, handlePassengerReturn, passenger, isEdit, viewmode, claimantAddress }) {
    if (viewmode) {
        isEdit = "View";
    }
    const footer = (
        <div>
            {!viewmode ? (
                <>
                    <Button label={!isEdit ? "Add" : "Update"} onClick={() => handlePassenger()} icon="pi pi-check" />
                    {!isEdit && <Button className="p-button-secondary" label={"Reset"} onClick={() => setPassengerDetails(vehicledetails)} icon="pi pi-refresh" />}
                </>
            ) : (
                ""
            )}
        </div>
    );

    const [passengerDetails, setPassengerDetails] = useState(vehicledetails);
    const [showMinorModal, setShowMinorModal] = useState(false);
    const [minorDetails, setMinorDetails] = useState();
    const [injuryClassification, setinjuryClassification] = useState("");
    const [injuryClassificationValue, setinjuryClassificationValue] = useState("");
    const [titleValue, settitleValue] = useState("");
    const [errors, seterrors] = useState({});
    const [addressItems, setaddressItems] = useState("");
    const [addressItemsValue, setaddressItemsValue] = useState("");
    const [addressFurtherItems, setaddressFurtherItems] = useState("");
    const [addressFurtherItemsValue, setaddressFurtherItemsValue] = useState("");
    const [showFurtherAddress, setshowFurtherAddress] = useState(false);

    const handlePassenger = async () => {
        const isvalid = await passengerValidation(passengerDetails);
        seterrors(isvalid?.errors);
        if (!Object.keys(isvalid?.errors).length) {
            handlePassengerReturn(passengerDetails);
            hide(false);
            !isEdit && handleClear();
        }
    };

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
        setPassengerDetails(vehicledetails);
        seterrors({});
    };

    const updatePassengerDetails = React.useCallback(() => {
        setPassengerDetails((passengerDetails) => ({ ...passengerDetails, ...minorDetails }));
    }, [minorDetails]);

    async function funcgetlovInjuryClaims() {
        const res = await getInjuryClassification();
        setinjuryClassification(res.data);
    }

    const getFurtherAddress = async (data) => {
        setshowFurtherAddress(true);
        const res = await getFurtherAddressService("https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.10/json3.ws", data);
        setaddressFurtherItems(res.Items);
    };

    const handleAddressFurtherValue = async (e) => {
        setaddressFurtherItemsValue(e.target.value);
        const res = await getAddressValues("https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json3.ws", e.target.value.Id);
        setPassengerDetails({ ...passengerDetails, address1: res?.Items[0]?.Line1 });
        setPassengerDetails({ ...passengerDetails, address2: res?.Items[0]?.Line2 });
        setPassengerDetails({ ...passengerDetails, address3: res?.Items[0]?.Line3 });
        setPassengerDetails({ ...passengerDetails, city: res?.Items[0]?.City });
        setPassengerDetails({ ...passengerDetails, region: res?.Items[0]?.Province });
    };

    const handleAdress = async () => {
        setPassengerDetails({ ...passengerDetails, address1: "", address2: "", address3: "", city: "", region: "" });
        const postcode = passengerDetails?.postalcode;
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
            setPassengerDetails({ ...passengerDetails, address1: res?.Items[0]?.Line1, address2: res?.Items[0]?.Line2, address3: res?.Items[0]?.Line3, city: res?.Items[0]?.City, region: res?.Items[0]?.Province });
        }
    };

    useEffect(() => {
        funcgetlovInjuryClaims();
    }, []);

    useEffect(() => {
        updatePassengerDetails();
    }, [updatePassengerDetails]);

    useEffect(() => {
        if (passenger && Object.keys(passenger).length !== 0) setPassengerDetails(passenger);
    }, [passenger, show]);

    return (
        <Dialog header={isEdit && isEdit !== "View" ? "Edit Passenger" : isEdit === "View" ? isEdit + " Passenger Details" : "Add Passenger"} footer={footer} visible={show} style={{ width: "80%" }} onHide={() => hide(false)}>
            <TabView>
                <TabPanel header="Personal Info">
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-4">
                            <label htmlFor="Status">Title</label>
                            <Dropdown
                                disabled={viewmode}
                                value={titleValue || ""}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, title: e.value.code });
                                    settitleValue(e.value);
                                }}
                                options={status}
                                placeholder="Select"
                                optionLabel="name"
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label>First Name * </label>
                            <InputText
                                disabled={viewmode}
                                value={passengerDetails?.firstname || ""}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, firstname: e.target.value });
                                }}
                                className={errors?.firstname && "p-invalid p-d-block"}
                            />
                            <small className="p-error p-d-block">{errors?.firstname}</small>
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label>Middle Name</label>
                            <InputText
                                disabled={viewmode}
                                value={passengerDetails?.middlename || ""}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, middlename: e.target.value });
                                }}
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>Last Name * </label>
                            <InputText
                                disabled={viewmode}
                                value={passengerDetails?.lastname || ""}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, lastname: e.target.value });
                                }}
                                className={errors?.lastname && "p-invalid p-d-block"}
                            />
                            <small className="p-error p-d-block">{errors?.lastname}</small>
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>Date of Birth *</label> {passengerDetails?.minor && <Button label="Minor" onClick={() => setShowMinorModal(true)} className="minor" style={{ float: "right" }}></Button>}
                            <InputText
                                disabled={viewmode}
                                onBlur={() => passengerDetails.minor && setShowMinorModal(true)}
                                type="date"
                                value={passengerDetails?.dob || ""}
                                onChange={(e) => {
                                    handleAge(e.target.value);
                                }}
                                className={errors?.dob && "p-invalid p-d-block"}
                            />
                            <small className="p-error p-d-block">{errors?.dob}</small>
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>Ni Number *</label>
                            <div className="p-inputgroup">
                                <InputText
                                    disabled={viewmode}
                                    value={passengerDetails?.ninumber || ""}
                                    onChange={(e) => {
                                        setPassengerDetails({ ...passengerDetails, ninumber: e.target.value });
                                    }}
                                    className={errors?.ninumber && "p-invalid p-d-block"}
                                />
                                <Dropdown
                                    disabled={viewmode}
                                    inputId="Status"
                                    value={passengerDetails?.options || ""}
                                    onChange={(e) => {
                                        setPassengerDetails({ ...passengerDetails, options: e.value });
                                        setPassengerDetails({ ...passengerDetails, ninumber: e.value.code });
                                    }}
                                    options={[
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
                            <small className="p-error p-d-block">{errors?.ninumber || ""}</small>
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label>Mobile *</label>
                            <InputText
                                disabled={viewmode}
                                type="number"
                                value={passengerDetails?.mobile || ""}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, mobile: e.target.value });
                                }}
                                className={errors?.mobile && "p-invalid p-d-block"}
                            />
                            <small className="p-error p-d-block">{errors?.mobile}</small>
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label>Landline</label>
                            <InputText
                                disabled={viewmode}
                                type="number"
                                value={passengerDetails?.landline || ""}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, landline: e.target.value });
                                }}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label>Alternative Number</label>
                            <InputText
                                disabled={viewmode}
                                value={passengerDetails?.alternativenumber || ""}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, alternativenumber: e.target.value });
                                }}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label>Email</label>
                            <InputText
                                disabled={viewmode}
                                value={passengerDetails?.email || ""}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, email: e.target.value });
                                }}
                                type="email"
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-8">
                            <label>Address *</label>
                            <div className="p-inputgroup">
                                <InputText
                                    disabled={viewmode}
                                    placeholder="post code"
                                    value={passengerDetails?.postalcode || ""}
                                    onChange={(e) => {
                                        setPassengerDetails({ ...passengerDetails, postalcode: e.target.value });
                                    }}
                                    className={errors?.postalcode && "p-invalid p-d-block"}
                                />
                                <Button
                                    label="lookup"
                                    onClick={() => {
                                        handleAdress();
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
                                        value={addressFurtherItemsValue || ""}
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
                                value={passengerDetails?.address1 || ""}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, address1: e.target.value });
                                }}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label>Address line 2</label>
                            <InputText
                                disabled={viewmode}
                                value={passengerDetails?.address2 || ""}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, address2: e.target.value });
                                }}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label>Address line 3</label>
                            <InputText
                                disabled={viewmode}
                                value={passengerDetails?.address3 || ""}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, address3: e.target.value });
                                }}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label>City</label>
                            <InputText
                                disabled={viewmode}
                                value={passengerDetails?.city || ""}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, city: e.target.value });
                                }}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label>Region</label>
                            <InputText
                                disabled={viewmode}
                                value={passengerDetails?.region || ""}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, region: e.target.value });
                                }}
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>Contact </label>
                            <InputText
                                disabled={viewmode}
                                type="email"
                                value={passengerDetails?.contact || ""}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, contact: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Injury Info">
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-2 p-d-flex p-justify-between">
                            {driverOrPassenger === "P" || driverOrPassenger === undefined ? (
                                <div className="p-field-radiobutton">
                                    <RadioButton
                                        disabled={viewmode}
                                        inputId="city1"
                                        onChange={(e) => {
                                            setPassengerDetails({ ...passengerDetails, driverpassen: e.value });
                                        }}
                                        name="city"
                                        value="driver"
                                        checked={"driver" === passengerDetails?.driverpassen}
                                    />
                                    <label htmlFor="city1">Driver</label>
                                </div>
                            ) : (
                                ""
                            )}
                            <div className="p-field-radiobutton">
                                <RadioButton
                                    disabled={viewmode}
                                    onChange={(e) => {
                                        setPassengerDetails({ ...passengerDetails, driverpassen: e.value });
                                    }}
                                    inputId="city2"
                                    name="city"
                                    value="passenger"
                                    checked={"passenger" === passengerDetails?.driverpassen}
                                />
                                <label htmlFor="city2">Passenger</label>
                            </div>
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label> Injury Classification</label>
                            <Dropdown
                                disabled={viewmode}
                                options={injuryClassification}
                                value={injuryClassificationValue || ""}
                                onChange={(e) => {
                                    setinjuryClassificationValue(e.value);
                                    setPassengerDetails({ ...passengerDetails, injclasscode: e.value.code });
                                }}
                                placeholder="Select"
                                optionLabel="name"
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-3 p-f-center">
                            <Checkbox
                                disabled={viewmode}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, ongoinginjury: e.checked ? "Y" : "N", injlength: e.checked ? e.target.value : passengerDetails.injlength });
                                }}
                                p
                                checked={"Y" === passengerDetails?.ongoinginjury}
                            ></Checkbox>
                            <label>&nbsp;Ongoing Injury</label>
                        </div>

                        <div className="p-field p-col-12 p-md-3 p-f-center">
                            <Checkbox
                                disabled={viewmode}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, medicalinfo: e.checked ? "Y" : "N" });
                                }}
                                checked={"Y" === passengerDetails?.medicalinfo}
                            ></Checkbox>
                            <label>&nbsp;Medical evidence avaliable</label>
                        </div>

                        <div className="p-field p-col-12 p-md-8">
                            <label>Injury Description</label>
                            <InputTextarea
                                disabled={viewmode}
                                value={passengerDetails?.injdescr || ""}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, injdescr: e.target.value });
                                }}
                            />
                        </div>

                        <div className="p-field p-col-12 p-md-4">
                            <label>Length Of Injury</label>
                            <div className="p-inputgroup">
                                <InputText
                                    disabled={viewmode || passengerDetails.ongoinginjury === "Y"}
                                    type="number"
                                    value={passengerDetails?.injlength || ""}
                                    onChange={(e) => {
                                        setPassengerDetails({ ...passengerDetails, injlength: e.target.value });
                                    }}
                                />
                                <span className="p-inputgroup-addon">Weeks</span>
                            </div>
                        </div>

                        {passengerDetails?.medicalinfo === "Y" ? (
                            <div className="p-field p-col-12 p-md-3">
                                <label>Medical Evidence Details</label>
                                <InputTextarea
                                    disabled={viewmode}
                                    value={passengerDetails?.evidencedatails || ""}
                                    onChange={(e) => {
                                        setPassengerDetails({ ...passengerDetails, evidencedatails: e.target.value });
                                    }}
                                    className={errors?.mobile && "p-invalid p-d-block"}
                                />
                            </div>
                        ) : (
                            ""
                        )}

                        <div className="p-field p-col-12 p-md-12">
                            <label>Details</label>
                            <InputTextarea
                                disabled={viewmode}
                                value={passengerDetails?.detail || ""}
                                onChange={(e) => {
                                    setPassengerDetails({ ...passengerDetails, detail: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                </TabPanel>
            </TabView>
            <MinorModal claimantAddress={claimantAddress} disabled={viewmode} handleMinorReturn={setMinorDetails} details={passengerDetails} show={showMinorModal} hide={setShowMinorModal} isEdit={isEdit} />
        </Dialog>
    );
}

export default PassengerModel;
