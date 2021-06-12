import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "primereact/badge";
import { PostMenuAction } from "../../redux/actions/menuAction";

import ModuleData from "./ModuleData";
import "./Register.css";

function Module() {
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [selectedState, setSelectedState] = useState([]);
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

    let history = useHistory();

    const onStateChange = (e) => {
        setSelectedState(e.value);
    };

    const dispatch = useDispatch();
    const handleSubmit = async () => {
        const data = {
            descr: description,
            modulename: name,
            modulestatus: selectedState.code,
        };
        await dispatch(PostMenuAction(data));
        setDisplayBasic(!displayBasic);
    };

    const editRow = async (rowData) => {
        setDisplayBasic(!displayBasic);
        setname(rowData.loginid);
        setSelectedState(rowData.status);
    };

    const addRow = async () => {
        setDisplayBasic(!displayBasic);
        setname("");
        setSelectedState([]);
    };

    const viewDetails = async (rowData) => {
        console.log("rowData ::", rowData);
        history.push(`/pages?m=${rowData.modulecode}`);
    };

    const moduleData = useSelector((state) => state.menuSlice?.moduleData?.data);

    return (
        <div>
            <Button label="Add" icon="pi pi-external-link" onClick={addRow} />
            <ModuleData editRow={editRow} moduleData={moduleData} viewDetails={viewDetails} />

            <Dialog header="Add Module" visible={displayBasic} style={{ width: "80%" }} onHide={() => setDisplayBasic(!displayBasic)}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="locale-us">Name</label>
                        <InputText value={name} onChange={(e) => setname(e.target.value)} />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="locale-us">Description</label>
                        <InputText value={description} onChange={(e) => setdescription(e.target.value)} />
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

export default Module;
