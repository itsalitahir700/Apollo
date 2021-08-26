import React, { useEffect, useState } from "react";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { handleGetRequest } from "../../services/GetTemplate";

function Logs() {
    const url = require("url");
    const urlObj = url.parse(document.location.href, true);

    const [data, setdata] = useState("");

    const customizedMarker = (item) => {
        return (
            <span className="custom-marker p-shadow-2" style={{ backgroundColor: "#607D8B" }}>
                <i className="pi pi-check"></i>
            </span>
        );
    };
    const customizedContent = (item) => {
        return (
            <Card title={item.descr} subTitle={item.createdon}>
                <p>{item.userName}</p>
            </Card>
        );
    };

    useEffect(() => {
        const getTimelineData = async () => {
            const rtaCode = urlObj?.query?.id;
            const res = await handleGetRequest(`rta/getAuthRtaCaseLogs/${rtaCode}`);
            setdata(res.data);
        };
        getTimelineData();
    }, []);
    return (
        <div>
            <div className="card">
                <Timeline value={data} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
            </div>
        </div>
    );
}

export default Logs;
