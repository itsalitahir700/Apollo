import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import queryString from "query-string";
import RoleRightsData from "./RoleRightsData";
import { PostPageAction } from "../.../../../../redux/actions/menuAction";
import { getlovModule, getlovPages } from "../../../services/RoleRights";
import "./Register.css";

function RoleRights() {
  const [module, setmodule] = useState([]);
  const [modulevalue, setmodulevalue] = useState("");
  const [pages, setpages] = useState([]);
  const [pagesvalue, setpagesvalue] = useState("");
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
  const roleDescr = query.n;
  const dispatch = useDispatch();

  const onStateChange = (e) => {
    setSelectedState(e.value);
  };

  const addRow = async () => {
    setDisplayBasic(!displayBasic);
    setSelectedState([]);
  };

  const token = useSelector((state) => state.authenticationSlice.token);

  async function funcgetlovModule() {
    const res = await getlovModule(token);
    setmodule(res.data);
  }

  const handleSubmit = async () => {
    console.log("data ::", pagesvalue);
    // const data = {
    //   pageicon: icon,
    //   pagepath: path,
    //   pagestatus: selectedState.code,
    //   moduleCode: moduleCode,
    // };
    // await dispatch(PostPageAction(data));
    // setDisplayBasic(!displayBasic);
  };

  const handleModuleChange = async (e) => {
    setmodulevalue(e.value);
    funcgetlovMenuPages(e.value.code);
  };

  async function funcgetlovMenuPages(code) {
    const res = await getlovPages(code);
    setpages(res.data);
  }

  const roleRightsData = useSelector(
    (state) => state.menuSlice?.pageData?.data
  );

  useEffect(() => {
    funcgetlovModule();
  }, []);

  return (
    <div>
      <Button label="Add" icon="pi pi-external-link" onClick={addRow} />
      <RoleRightsData roleRightsData={roleRightsData} />
      <Dialog
        header="Add Role Rights"
        visible={displayBasic}
        style={{ width: "80%" }}
        onHide={() => setDisplayBasic(!displayBasic)}
      >
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="locale-us">Role Name</label>
            <InputText disabled value={roleDescr} />
          </div>
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="module">Module</label>
            <Dropdown
              inputId="module"
              value={modulevalue}
              options={module}
              onChange={(e) => {
                handleModuleChange(e);
              }}
              placeholder="Select"
              optionLabel="name"
            />
          </div>
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="page">Page</label>
            <MultiSelect
              inputId="page"
              value={pagesvalue}
              options={pages}
              onChange={(e) => {
                setpagesvalue(e.value);
              }}
              placeholder="Select"
              optionLabel="pagename"
            />
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

export default RoleRights;
