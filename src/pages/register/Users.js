import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import generator from "generate-password";
import { useSelector, useDispatch } from "react-redux";
import { getLovRole } from "../../services/UsersRegister";
import { PostUsersFreshAction } from "../.../../../redux/actions/profileAction";
import UsersData from "./UsersData";

function Users() {
    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [userRole, setuserRole] = useState([]);
    const [userRoleValue, setuserRoleValue] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [displayBasic, setDisplayBasic] = useState(false);
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

    async function funcgetLovRole() {
        const res = await getLovRole();
        setuserRole(res.data);
    }

    const generatePass = () => {
        var password = generator.generate({
            length: 6,
            lowercase: true,
            uppercase: true,
            numbers: true,
            symbols: true,
        });
        setpassword(password);
    };

    const onStateChange = (e) => {
        setSelectedState(e.value);
    };

    const CompanyCode = useSelector((state) => state.profileSlice.profileData?.data?.companycode);
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        const userRolevalues = userRoleValue.map((role) => {
            return role.code;
        });
        const data = {
            companycode: CompanyCode,
            loginid: userName,
            status: selectedState.code,
            pwd: password,
            rolecodes: userRolevalues,
        };
        await dispatch(PostUsersFreshAction(data));
        setDisplayBasic(!displayBasic);
    };

    useEffect(() => {
        funcgetLovRole();
    }, []);

    return (
        <div>
            <Button label="Add" icon="pi pi-external-link" onClick={() => setDisplayBasic(!displayBasic)} />
            <UsersData />

            <Dialog header="Add User" visible={displayBasic} style={{ width: "80%" }} onHide={() => setDisplayBasic(!displayBasic)}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="locale-us">User Name</label>
                        <InputText value={userName} onChange={(e) => setuserName(e.target.value)} />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="locale-us">Password</label>
                        <InputText value={password} onChange={(e) => setpassword(e.target.value)} />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="locale-us">Generate Password</label>
                        <Button label="Generate Random Pass" className="p-button-secondary" onClick={generatePass} />
                    </div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="userrole">User Role</label>
                        <MultiSelect
                            inputId="userrole"
                            value={userRoleValue}
                            options={userRole}
                            onChange={(e) => {
                                setuserRoleValue(e.value);
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="Status">Status</label>
                        <Dropdown inputId="Status" value={selectedState} options={states} onChange={onStateChange} placeholder="Select" optionLabel="name" />
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <Button onClick={handleSubmit} type="submit" label="Submit" className="p-mt-2" />
                </div>
            </Dialog>
        </div>
    );
}

export default Users;
