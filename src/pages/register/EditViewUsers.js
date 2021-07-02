import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import generator from "generate-password";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "primereact/badge";
import { getLovRole } from "../../services/UsersRegister";
import { PostUsersAction } from "../.../../../redux/actions/profileAction";
import EditViewUsersData from "./EditViewUsersData";

function EditViewUsers({ name, tag, userCat }) {
    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [userRole, setuserRole] = useState([]);
    const [userRoleValue, setuserRoleValue] = useState([]);
    const [selectedState, setSelectedState] = useState([]);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [editflag, seteditflag] = useState(true);
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

    const companyUsersData = useSelector((state) => state.profileSlice.usersData);

    const CompanyCode = useSelector((state) => state.profileSlice.singleCompanyData?.companycode);
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
        await dispatch(PostUsersAction(data));
        setDisplayBasic(!displayBasic);
    };

    const editRow = async (rowData) => {
        seteditflag(false);
        console.log("rowData ::", rowData);
        setDisplayBasic(!displayBasic);
        setuserName(rowData.loginid);
        setSelectedState(rowData.status);
    };

    const addRow = async () => {
        seteditflag(true);
        setDisplayBasic(!displayBasic);
        setuserName("");
        setuserRoleValue([]);
        setSelectedState([]);
    };

    useEffect(() => {
        funcgetLovRole();
    }, []);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "baseline" }}>
                <label>
                    {" "}
                    <b> Name : {name}</b>
                </label>
                <label>
                    <b>Tag : {tag}</b>{" "}
                </label>
                <label>
                    <b>Category : {userCat?.name}</b>{" "}
                </label>
                <Button label="Add" icon="pi pi-external-link" onClick={addRow} />
            </div>
            <EditViewUsersData companyUsersData={companyUsersData} editRow={editRow} />

            <Dialog header="Add User" visible={displayBasic} style={{ width: "80%" }} onHide={() => setDisplayBasic(!displayBasic)}>
                {editflag ? (
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
                ) : (
                    ""
                )}
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
                        <span style={{ textAlign: "center ", paddingLeft: "40%" }}>{selectedState?.code === "Y" ? <Badge severity="success" value="Active"></Badge> : <Badge severity="warning" value="Inactive"></Badge>}</span>
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <Button onClick={handleSubmit} type="submit" label="Submit" className="p-mt-2" />
                </div>
            </Dialog>
        </div>
    );
}

export default EditViewUsers;
