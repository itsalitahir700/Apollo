import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import UpdateClaimant from "../claimantinfo/update";

const RTACase = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="tabview-demo">
            <div className="card">
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="Claimant">
                        <UpdateClaimant />
                    </TabPanel>
                    <TabPanel header="Passengers">Passengers</TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default RTACase;
