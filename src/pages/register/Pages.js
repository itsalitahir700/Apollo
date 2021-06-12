import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Badge } from "primereact/badge";
import queryString from "query-string";
import PagesData from "./PagesData";
import { PostPageAction } from "../../redux/actions/menuAction";
import "./Register.css";

function Pages() {
    const [name, setname] = useState("");
    const [description, setdescription] = useState("");
    const [icon, seticon] = useState("");
    const [path, setpath] = useState("");
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
    const location = useHistory().location;
    const query = queryString.parse(location.search);
    const moduleCode = query.m;
    const dispatch = useDispatch();

    const onStateChange = (e) => {
        setSelectedState(e.value);
    };

    const addRow = async () => {
        setDisplayBasic(!displayBasic);
        setname("");
        setSelectedState([]);
    };

    const handleSubmit = async () => {
        const data = {
            pagename: description,
            pagedescr: name,
            pageicon: icon,
            pagepath: path,
            pagestatus: selectedState.code,
            moduleCode: moduleCode,
        };
        await dispatch(PostPageAction(data));
        setDisplayBasic(!displayBasic);
    };

    const pagesData = useSelector((state) => state.menuSlice?.pageData?.data);

    return (
        <div>
            <Button label="Add" icon="pi pi-external-link" onClick={addRow} />
            <PagesData pagesData={pagesData} />
            <Dialog header="Add Page" visible={displayBasic} style={{ width: "80%" }} onHide={() => setDisplayBasic(!displayBasic)}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="locale-us">Name</label>
                        <InputText value={name} onChange={(e) => setname(e.target.value)} />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="locale-us">Description</label>
                        <InputText value={description} onChange={(e) => setdescription(e.target.value)} />
                    </div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="locale-us">Icon</label>
                        <InputText value={icon} onChange={(e) => seticon(e.target.value)} />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="locale-us">Path</label>
                        <InputText value={path} onChange={(e) => setpath(e.target.value)} />
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

export default Pages;
