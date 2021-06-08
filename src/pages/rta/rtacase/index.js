import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import UpdateClaimant from "../update";
import ViewClaimant from "../View";
import "./Rtacase.css";

const RTACase = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const url = require("url");
    const urlObj = url.parse(document.location.href, true);
    const mode = urlObj?.query?.mode;

    return (
        <div className="tabview-demo">
            <div>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="Main">
                        {mode && mode === "e" ? <UpdateClaimant /> : ""}
                        {mode && mode === "v" ? <ViewClaimant /> : ""}
                    </TabPanel>
                    <TabPanel header="Images">Images ***/</TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default RTACase;
