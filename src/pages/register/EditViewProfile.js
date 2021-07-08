import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useSelector, useDispatch } from "react-redux";
import EditViewJobs from "./EditViewJobs";
import EditViewUsers from "./EditViewUsers";
import { TabView, TabPanel } from "primereact/tabview";
import { ProfileRegisterEditAction } from "../../redux/actions/profileAction";
import { getLovUserCategory } from "../../services/ProfileRegister";

function EditViewProfile() {
    const singleCompanyProfileData = useSelector((state) => state.profileSlice.singleCompanyData);

    const [selectedState, setSelectedState] = useState({ code: singleCompanyProfileData?.companystatus, name: singleCompanyProfileData?.companystatus === "Y" ? "Active" : "Inactive", type: null });
    const [name, setname] = useState(singleCompanyProfileData?.name);
    const [tag, settag] = useState(singleCompanyProfileData?.tag);
    const [userCat, setuserCat] = useState([]);
    const [userCatvalue, setuserCatvalue] = useState({ code: singleCompanyProfileData?.tblUsercategory?.categorycode, name: singleCompanyProfileData?.tblUsercategory?.categoryname, type: null });
    const [postCode, setpostCode] = useState(singleCompanyProfileData?.postcode);
    const [addressLine1, setaddressLine1] = useState(singleCompanyProfileData?.addressline1);
    const [addressLine2, setaddressLine2] = useState(singleCompanyProfileData?.addressline2);
    const [city, setcity] = useState(singleCompanyProfileData?.city);
    const [region, setregion] = useState(singleCompanyProfileData?.region);
    const [email, setemail] = useState(singleCompanyProfileData?.email);
    const [contactPerson, setcontactPerson] = useState(singleCompanyProfileData?.contactperson);
    const [contactNumber1, setcontactNumber1] = useState(singleCompanyProfileData?.phone);
    const [contactNumber2, setcontactNumber2] = useState(singleCompanyProfileData?.phone2);
    const [vatchecked, setVatChecked] = useState(false);
    const [vatRegNo, setvatRegNo] = useState("");
    const [directIntroducerchecked, setdirectIntroducerchecked] = useState(singleCompanyProfileData?.directintroducer === "Y" ? true : false);
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

    async function funcgetLovUserCategory() {
        const res = await getLovUserCategory();
        setuserCat(res.data);
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
            postcode: postCode,
            region: region,
            userCategoryCode: userCatvalue?.code,
            directIntroducer: directIntroducerValue,
            companycode: singleCompanyProfileData?.companycode,
            companystatus: selectedState,
        };

        await dispatch(ProfileRegisterEditAction(data));
        setloading(false);
        setloadingIcon("");
    };

    useEffect(() => {
        funcgetLovUserCategory();
    }, []);

    return (
        <div>
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
                                disabled
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
                                options={userCat}
                                value={userCatvalue}
                                onChange={(e) => {
                                    setuserCatvalue(e.value);
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
                            <Dropdown
                                options={states}
                                value={selectedState}
                                onChange={(e) => {
                                    setSelectedState(e.value);
                                }}
                                placeholder="Select"
                                optionLabel="name"
                            />
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
                    <EditViewJobs name={name} tag={tag} userCat={userCatvalue} />
                </TabPanel>
                <TabPanel header="Users">
                    <EditViewUsers name={name} tag={tag} userCat={userCatvalue} />
                </TabPanel>
            </TabView>
        </div>
    );
}

export default EditViewProfile;
