import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Profile from "./Profile";
import Jobs from "./Jobs";
import Users from "./Users";
import "./Register.css";

const Register = () => {
  //  const [displayBasic, setDisplayBasic] = useState(false);
  return (
    <div>
      {/* <Button
        label="Add"
        icon="pi pi-external-link"
        onClick={() => setDisplayBasic(true)}
      /> */}
      {/* <Dialog
        header="Murtaza"
        visible={displayBasic}
        style={{ width: "80%" }}
        onHide={() => setDisplayBasic(false)}
      > */}
      <div className="tabview-demo">
        <div className="mt-4">
          <Profile />
        </div>
      </div>
      {/* </Dialog> */}
    </div>
  );
};

export default Register;
