import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import UpdateClaimant from "../update";
import ViewClaimant from "../View";
import Notes from "../../../components/Notes";
import Messages from "../../../components/Messages";
import Documents from "../../../components/Documents";

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

                    <TabPanel header="Notes">
                        <Notes getNotesService={"hire/getHireCaseNotes"} addNotesService={"hire/addHireNotes"} caseType={"hire"} />
                    </TabPanel>
                    <TabPanel header="Messages">
                        <Messages />
                    </TabPanel>
                    <TabPanel header="Documents">
                        <Documents />
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default RTACase;
