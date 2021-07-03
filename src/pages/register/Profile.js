import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, AccordionTab } from "primereact/accordion";
import Jobs from "./Jobs";
import Users from "./Users";
import { TabView, TabPanel } from "primereact/tabview";
import ProfileComapanyData from "./ProfileCompanyData";
import { ProfileRegisterAction, GetCompanyDataAction } from "../../redux/actions/profileAction";
import { getLovUserCategory } from "../../services/ProfileRegister";

function Profile() {
    const [selectedState, setSelectedState] = useState(null);
    const [name, setname] = useState("");
    const [tag, settag] = useState("");
    const [userCat, setuserCat] = useState([]);
    const [userCatvalue, setuserCatvalue] = useState("");
    const [postCode, setpostCode] = useState("");
    const [addressLine1, setaddressLine1] = useState("");
    const [addressLine2, setaddressLine2] = useState("");
    const [city, setcity] = useState("");
    const [region, setregion] = useState("");
    const [email, setemail] = useState("");
    const [contactPerson, setcontactPerson] = useState("");
    const [contactNumber1, setcontactNumber1] = useState("");
    const [contactNumber2, setcontactNumber2] = useState("");
    const [vatchecked, setVatChecked] = useState(false);
    const [vatRegNo, setvatRegNo] = useState("");
    const [directIntroducerchecked, setdirectIntroducerchecked] = useState(false);
    const [loading, setloading] = useState(false);
    const [loadingIcon, setloadingIcon] = useState("");

    let states = [
        {
            code: "Y",
            name: "Active",
            type: null,
        },
        {
            code: "N",
            name: "Inactive",
            type: null,
        },
    ];
    const dispatch = useDispatch();

    const token = useSelector((state) => state.authenticationSlice.token);

    const onStateChange = (e) => {
        setSelectedState(e.value);
    };
    async function funcgetLovUserCategory() {
        const res = await getLovUserCategory(token);
        setuserCat(res.data);
    }

    async function funcGetCompanyDataAction() {
        await dispatch(GetCompanyDataAction());
    }

    const handleSubmit = async () => {
        setloading(true);
        setloadingIcon("pi pi-spin pi-spinner");
        let directIntroducerValue = "N";
        if (directIntroducerchecked) {
            directIntroducerValue = "Y";
        }
        const data = {
            name: name,
            addressline1: addressLine1,
            addressline2: addressLine2,
            city: city,
            companyregno: vatRegNo,
            contactperson: contactPerson,
            email: email,
            phone: contactNumber1,
            phone2: contactNumber2,
            companystatus: selectedState?.code,
            postcode: postCode,
            region: region,
            tag: tag,
            userCategoryCode: userCatvalue?.code,
            directIntroducer: directIntroducerValue,
        };

        await dispatch(ProfileRegisterAction(data));
        setloading(false);
        setloadingIcon("");
    };

    useEffect(() => {
        funcgetLovUserCategory();
        funcGetCompanyDataAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Accordion>
                <AccordionTab header="Add New Company">
                    <TabView className="mt-2">
                        <TabPanel header="Profile">
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col">
                                    <label htmlFor="Name">Name</label>
                                    <InputText
                                        value={name}
                                        onChange={(e) => {
                                            setname(e.target.value);
                                        }}
                                        id="Name"
                                        type="text"
                                    />
                                </div>
                                <div className="p-field p-col">
                                    <label htmlFor="Tag">Tag</label>
                                    <InputText
                                        value={tag}
                                        onChange={(e) => {
                                            settag(e.target.value);
                                        }}
                                        id="Tag"
                                        type="text"
                                    />
                                </div>
                                <div className="p-field p-col">
                                    <label htmlFor="IntroducerCategory">Introducer Category</label>
                                    <Dropdown
                                        inputId="IntroducerCategory"
                                        value={userCatvalue}
                                        options={userCat}
                                        onChange={(e) => {
                                            setuserCatvalue(e.value);
                                            console.log(userCatvalue);
                                        }}
                                        placeholder="Select"
                                        optionLabel="name"
                                    />
                                </div>
                            </div>
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col">
                                    <label htmlFor="Postcode">Postcode</label>
                                    <InputText
                                        value={postCode}
                                        onChange={(e) => {
                                            setpostCode(e.target.value);
                                        }}
                                        id="Postcode"
                                        type="text"
                                    />
                                </div>
                                <div className="p-field p-col">
                                    <label htmlFor="AddressLine1">Address line 1</label>
                                    <InputText
                                        value={addressLine1}
                                        onChange={(e) => {
                                            setaddressLine1(e.target.value);
                                        }}
                                        id="AddressLine1"
                                        type="text"
                                    />
                                </div>
                                <div className="p-field p-col">
                                    <label htmlFor="AddressLine2">Address line 2</label>
                                    <InputText
                                        value={addressLine2}
                                        onChange={(e) => {
                                            setaddressLine2(e.target.value);
                                        }}
                                        id="AddressLine2"
                                        type="text"
                                    />
                                </div>
                                <div className="p-field p-col">
                                    <label htmlFor="Town/City">Town/City</label>
                                    <InputText
                                        value={city}
                                        onChange={(e) => {
                                            setcity(e.target.value);
                                        }}
                                        id="Town/City"
                                        type="text"
                                    />
                                </div>
                                <div className="p-field p-col">
                                    <label htmlFor="Region">Region</label>
                                    <InputText
                                        value={region}
                                        onChange={(e) => {
                                            setregion(e.target.value);
                                        }}
                                        id="Region"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col">
                                    <label htmlFor="email">Email</label>
                                    <InputText
                                        value={email}
                                        onChange={(e) => {
                                            setemail(e.target.value);
                                        }}
                                        id="email"
                                        type="email"
                                    />
                                </div>
                                <div className="p-field p-col">
                                    <label htmlFor="ContactPerson">Contact person</label>
                                    <InputText
                                        value={contactPerson}
                                        onChange={(e) => {
                                            setcontactPerson(e.target.value);
                                        }}
                                        id="ContactPerson"
                                        type="text"
                                    />
                                </div>
                                <div className="p-field p-col">
                                    <label htmlFor="ContactNumber1">Contact Number 1</label>
                                    <InputText
                                        value={contactNumber1}
                                        onChange={(e) => {
                                            setcontactNumber1(e.target.value);
                                        }}
                                        id="ContactNumber1"
                                        type="text"
                                    />
                                </div>
                                <div className="p-field p-col">
                                    <label htmlFor="ContactNumber2">Contact Number 2</label>
                                    <InputText
                                        value={contactNumber2}
                                        onChange={(e) => {
                                            setcontactNumber2(e.target.value);
                                        }}
                                        id="ContactNumber2"
                                        type="text"
                                    />
                                </div>
                                <div className="p-field p-col">
                                    <label htmlFor="Status">Status</label>
                                    <Dropdown inputId="Status" value={selectedState} options={states} onChange={onStateChange} placeholder="Select" optionLabel="name" />
                                </div>
                            </div>
                            <div className="p-fluid p-formgrid p-grid">
                                <div className="mt-4 p-field p-col-6 p-md-3 p-field-checkbox">
                                    <Checkbox inputId="DirectIntroducer" onChange={(e) => setdirectIntroducerchecked(e.checked)} checked={directIntroducerchecked}></Checkbox>
                                    <label htmlFor="DirectIntroducer">Direct Introducer</label>
                                </div>
                                <div className="mt-4 p-field p-col-6 p-md-3 p-field-checkbox">
                                    <Checkbox inputId="vat" onChange={(e) => setVatChecked(e.checked)} checked={vatchecked}></Checkbox>
                                    <label htmlFor="vat">VAT</label>
                                </div>
                                {vatchecked ? (
                                    <div className="p-field p-col">
                                        <label htmlFor="vatRegNo">VAT Reg No</label>
                                        <InputText
                                            value={vatRegNo}
                                            onChange={(e) => {
                                                setvatRegNo(e.target.value);
                                            }}
                                            id="vatRegNo"
                                            type="text"
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <Button icon={loadingIcon || ""} disabled={loading} onClick={handleSubmit} type="submit" label="Submit" className="p-mt-2" />
                            </div>
                        </TabPanel>
                        <TabPanel header="Jobs">
                            <Jobs />
                        </TabPanel>
                        <TabPanel header="Users">
                            <Users />
                        </TabPanel>
                    </TabView>
                </AccordionTab>
            </Accordion>

            <Accordion activeIndex={0}>
                <AccordionTab header="View All Company">
                    <ProfileComapanyData />
                </AccordionTab>
            </Accordion>
        </div>
    );
}

export default Profile;
