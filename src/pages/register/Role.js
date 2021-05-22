import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "primereact/badge";
import { PostRoleAction } from "../.../../../../redux/actions/menuAction";

import RoleData from "./RoleData";
import "./Register.css";

function Role() {
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
      rolename: name,
      rolestatus: selectedState.code,
    };
    await dispatch(PostRoleAction(data));
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
    history.push(`/rolerights?m=${rowData.rolecode}&n=${rowData.descr}`);
  };

  const roleData = useSelector((state) => state.menuSlice?.roleData?.data);

  return (
    <div>
      <Button label="Add" icon="pi pi-external-link" onClick={addRow} />
      <RoleData
        editRow={editRow}
        roleData={roleData}
        viewDetails={viewDetails}
      />

      <Dialog
        header="Add Role"
        visible={displayBasic}
        style={{ width: "80%" }}
        onHide={() => setDisplayBasic(!displayBasic)}
      >
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="locale-us">Name</label>
            <InputText value={name} onChange={(e) => setname(e.target.value)} />
          </div>
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="locale-us">Description</label>
            <InputText
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="Status">Status</label>

            <Dropdown
              inputId="Status"
              value={selectedState}
              options={states}
              onChange={onStateChange}
              placeholder="Select"
              optionLabel="name"
            />
            <span style={{ textAlign: "center ", paddingLeft: "40%" }}>
              {selectedState?.code === "Y" ? (
                <Badge severity="success" value="Active"></Badge>
              ) : (
                <Badge severity="warning" value="Inactive"></Badge>
              )}
            </span>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={handleSubmit}
            type="submit"
            label="Submit"
            className="p-mt-2"
          />
        </div>
      </Dialog>
    </div>
  );
}

export default Role;
