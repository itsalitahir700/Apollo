import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Fieldset } from "primereact/fieldset";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import ClaimantInfo from "./claimantinfo";
import "./rta.css";

function RTA() {
    let states = [
        {
            code: "Y",
            name: "Mr",
            type: null,
        },
        {
            code: "N",
            name: "Ms",
            type: null,
        },
    ];
    const [selectedState, setSelectedState] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateBirth, setDateBirth] = useState("");
    const [niNumber, setNiNumber] = useState("");
    const [strEng, setStrEng] = useState("");
    const [mobile, setMobile] = useState("");
    const [landLine, setlandLine] = useState("");
    const [email, setemail] = useState("");
    const [postCode, setpostCode] = useState("");
    const [addressLine1, setaddressLine1] = useState("");
    const [addressLine2, setaddressLine2] = useState("");
    const [addressLine3, setaddressLine3] = useState("");
    const [city, setcity] = useState("");
    const [region, setregion] = useState("");
    const [checkedScotland, setCheckedScotland] = useState(false);
    const [checked, setChecked] = useState(false);
    const [displayBasic, setDisplayBasic] = useState(false);
    return (
        <>
            <Fieldset legend="Claimant Info" toggleable>
                <ClaimantInfo
                    selectedState={selectedState}
                    setSelectedState={setSelectedState}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    middleName={middleName}
                    setMiddleName={setMiddleName}
                    lastName={lastName}
                    setLastName={setLastName}
                    dateBirth={dateBirth}
                    setDateBirth={setDateBirth}
                    niNumber={niNumber}
                    setNiNumber={setNiNumber}
                    strEng={strEng}
                    setStrEng={setStrEng}
                    mobile={mobile}
                    setMobile={setMobile}
                    checkedScotland={checkedScotland}
                    setCheckedScotland={setCheckedScotland}
                    landLine={landLine}
                    email={email}
                    setemail={setemail}
                    setlandLine={setlandLine}
                    postCode={postCode}
                    setpostCode={setpostCode}
                    addressLine1={addressLine1}
                    setaddressLine1={setaddressLine1}
                    addressLine2={addressLine2}
                    setaddressLine2={setaddressLine2}
                    addressLine3={addressLine3}
                    setaddressLine3={setaddressLine3}
                    city={city}
                    setcity={setcity}
                    region={region}
                    setregion={setregion}
                />
            </Fieldset>

            <Fieldset legend="Accident Info" toggleable>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-4">
                        <label>Address</label>
                        <InputText placeholder="Date" type="date" />
                        <InputText placeholder="Time" type="time" />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Circumstances</label>
                        <Dropdown inputId="Status" value={selectedState} options={states} placeholder="Select" optionLabel="name" />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Location</label>
                        <InputText />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Description</label>
                        <InputTextarea />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Road Weather Conditions</label>
                        <InputTextarea />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="city1" name="city" value="Chicago" />
                            <label htmlFor="city1">Chicago</label>
                        </div>
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="city2" name="city" value="Los Angeles" />
                            <label htmlFor="city2">Los Angeles</label>
                        </div>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Injury Classification</label>
                        <InputText />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Injury Description</label>
                        <InputTextarea />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Length Of Injury</label>
                        <div className="p-inputgroup">
                            <InputText type="number" />
                            <span className="p-inputgroup-addon">Weeks</span>
                        </div>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <Checkbox></Checkbox>
                        <label>Ongoing Injury</label>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <Checkbox></Checkbox>
                        <label>Medical evidence avaliable</label>
                    </div>
                </div>
            </Fieldset>

            <Fieldset legend="Vehicles & Passenger Info" toggleable>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-4">
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="city1" name="city" value="Chicago" />
                            <label htmlFor="city1">Chicago</label>
                        </div>
                        <div className="p-field-radiobutton">
                            <RadioButton inputId="city2" name="city" value="Los Angeles" />
                            <label htmlFor="city2">Los Angeles</label>
                        </div>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <Checkbox></Checkbox>
                        <label>Reported To Police</label>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <InputText placeholder="reported on" />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <InputText placeholder="reference number" />
                    </div>

                    {/* THIRD PARTY */}
                    <div className="p-field p-col-12 p-md-4">
                        <label>Registeration Number</label>
                        <div className="p-inputgroup">
                            <InputText />
                            <Dropdown inputId="Status" value={selectedState} options={states} placeholder="Select" optionLabel="name" />
                        </div>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Make Model</label>
                        <InputText />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Insurer</label>
                        <InputText placeholder="insurer" />
                        <InputText placeholder="policy number" />
                        <InputText placeholder="claim number" />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Registeration Number</label>
                        <div className="p-inputgroup">
                            <InputText />
                            <Dropdown inputId="Status" value={selectedState} options={states} placeholder="Select" optionLabel="name" />
                        </div>
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Make Model</label>
                        <InputText />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Insurer</label>
                        <InputText placeholder="insurer" />
                        <InputText placeholder="policy number" />
                        <InputText placeholder="claim number" />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Green Number</label>
                        <InputText />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Third Party</label>
                        <InputText />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Contact Number</label>
                        <InputText type="number" />
                    </div>

                    <div className="p-field p-col-12 p-md-4">
                        <label>Address</label>
                        <InputTextarea />
                    </div>

                    {/* PASSENGER */}
                    <Button label="Add" icon="pi pi-external-link" onClick={() => setDisplayBasic(!displayBasic)} />
                    <Dialog header="Add User" visible={displayBasic} style={{ width: "80%" }} onHide={() => setDisplayBasic(!displayBasic)}>
                        <TabView>
                            <TabPanel header="Personal Info">
                                <div className="p-fluid p-formgrid p-grid">
                                    <div className="p-field p-col-12 p-md-4">
                                        <label htmlFor="Status">Status</label>
                                        <Dropdown inputId="Status" value={selectedState} options={states} placeholder="Select" optionLabel="name" />
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>First Name</label>
                                        <InputText value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Middle Name</label>
                                        <InputText value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Last Name</label>
                                        <InputText value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                        <label>Did accident occur in scotland?</label>
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Date of Birth</label>
                                        <InputText value={dateBirth} type="date" onChange={(e) => setDateBirth(e.target.value)} />
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Ni Number</label>
                                        <div className="p-inputgroup">
                                            <InputText value={niNumber} type="number" onChange={(e) => setNiNumber(e.target.value)} />
                                            <Dropdown inputId="Status" value={selectedState} options={states} placeholder="Select" optionLabel="name" />
                                        </div>
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Mobile</label>
                                        <InputText value={mobile} type="number" onChange={(e) => setMobile(e.target.value)} />
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Landline</label>
                                        <InputText type="number" />
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Email</label>
                                        <InputText type="email" />
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Address</label>
                                        <div className="p-inputgroup">
                                            <InputText />
                                            <Dropdown inputId="Status" value={selectedState} options={states} placeholder="Select" optionLabel="name" />
                                        </div>
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Address line 1</label>
                                        <InputText />
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Address line 2</label>
                                        <InputText />
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Address line 3</label>
                                        <InputText />
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>City</label>
                                        <InputText />
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Contact </label>
                                        <InputText type="number" />
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel header="Injury Info">
                                <div className="p-fluid p-formgrid p-grid">
                                    <div className="p-field p-col-12 p-md-4">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="city1" name="city" value="Chicago" />
                                            <label htmlFor="city1">Chicago</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="city2" name="city" value="Los Angeles" />
                                            <label htmlFor="city2">Los Angeles</label>
                                        </div>
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Circumstances</label>
                                        <Dropdown inputId="Status" value={selectedState} options={states} placeholder="Select" optionLabel="name" />
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Description</label>
                                        <InputTextarea />
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="city1" name="city" value="Chicago" />
                                            <label htmlFor="city1">Chicago</label>
                                        </div>
                                        <div className="p-field-radiobutton">
                                            <RadioButton inputId="city2" name="city" value="Los Angeles" />
                                            <label htmlFor="city2">Los Angeles</label>
                                        </div>
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Injury Classification</label>
                                        <InputText />
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Injury Description</label>
                                        <InputTextarea />
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Length Of Injury</label>
                                        <div className="p-inputgroup">
                                            <InputText type="number" />
                                            <span className="p-inputgroup-addon">Weeks</span>
                                        </div>
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <Checkbox></Checkbox>
                                        <label>Ongoing Injury</label>
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <Checkbox></Checkbox>
                                        <label>Medical evidence avaliable</label>
                                    </div>

                                    <div className="p-field p-col-12 p-md-4">
                                        <label>Details</label>
                                        <InputTextarea />
                                    </div>
                                </div>
                            </TabPanel>
                        </TabView>
                    </Dialog>
                    <div className="p-field p-col-12 p-md-4">
                        <label>Pasanger Info</label>
                        <InputTextarea />
                    </div>
                </div>
            </Fieldset>
        </>
    );
}

export default RTA;
