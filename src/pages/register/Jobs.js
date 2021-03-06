import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { getLovCampaign } from "../../services/JobsRegister";
import { useSelector, useDispatch } from "react-redux";
import { PostJobsFreshAction } from "../../redux/actions/profileAction";
import JobsData from "./JobsData";

function Jobs() {
    const [adultfee, setadultfee] = useState(0);
    const [childfee, setchildfee] = useState(0);
    const [scotadultfee, setscotadultfee] = useState(0);
    const [scotchildfee, setscotchildfee] = useState(0);
    const [adultpostreforms, setadultpostreforms] = useState(0);
    const [childpostreforms, setchildpostreforms] = useState(0);
    const [compaignCode, setcompaignCode] = useState([]);
    const [compaignCodeValue, setcompaignCodeValue] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [loading, setloading] = useState(false);
    const [loadingIcon, setloadingIcon] = useState("");
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

    const dispatch = useDispatch();

    async function funcgetLovCampaign() {
        const res = await getLovCampaign();
        setcompaignCode(res.data);
    }

    const onStateChange = (e) => {
        setSelectedState(e.value);
    };
    const CompanyCode = useSelector((state) => state.profileSlice.profileData?.companycode);
    const handleSubmit = async () => {
        setloading(true);
        setloadingIcon("pi pi-spin pi-spinner");
        const data = {
            adultfee: adultfee,
            childfee: childfee,
            compaigncode: compaignCodeValue.code,
            companycode: CompanyCode,
            scotadultfee: scotadultfee,
            scotchildfee: scotchildfee,
            status: selectedState?.code,
            adultpostreforms,
            childpostreforms,
        };
        const res = await dispatch(PostJobsFreshAction(data));
        if (res?.responsecode !== 0) {
            setDisplayBasic(!displayBasic);
            setInitialValues();
        }
        setloading(false);
        setloadingIcon("");
    };

    const setInitialValues = () => {
        setadultfee("");
        setchildfee("");
        setcompaignCodeValue("");
        setscotadultfee("");
        setscotchildfee("");
        setSelectedState("");
        setadultpostreforms("");
        setchildpostreforms("");
    };

    useEffect(() => {
        funcgetLovCampaign();
    }, []);

    return (
        <div>
            <div align="right">
                <Button label="Add" icon="pi pi-external-link" onClick={() => setDisplayBasic(!displayBasic)} />
            </div>
            <JobsData />
            <Dialog header="Add Job" visible={displayBasic} style={{ width: "80%" }} onHide={() => setDisplayBasic(!displayBasic)} draggable={false}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="childfee">Compaign</label>
                        <Dropdown
                            inputId="IntroducerCategory"
                            value={compaignCodeValue}
                            options={compaignCode}
                            onChange={(e) => {
                                setcompaignCodeValue(e.value);
                            }}
                            placeholder="Select"
                            optionLabel="name"
                        />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="locale-us">Adult Fee</label>
                        <InputNumber id="locale-us" value={adultfee} onValueChange={(e) => setadultfee(e.value)} mode="currency" currency="EUR" minFractionDigits={2} />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="childfee">Child Fee</label>
                        <InputNumber id="childfee" value={childfee} onValueChange={(e) => setchildfee(e.value)} mode="currency" currency="EUR" minFractionDigits={2} />
                    </div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="scotadultfee">Scottish Adult</label>
                        <InputNumber id="scotadultfee" value={scotadultfee} onValueChange={(e) => setscotadultfee(e.value)} mode="currency" currency="EUR" minFractionDigits={2} />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="scotchildfee">Scottish Minor</label>
                        <InputNumber id="scotchildfee" value={scotchildfee} onValueChange={(e) => setscotchildfee(e.value)} mode="currency" currency="EUR" minFractionDigits={2} />
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="Status">Status</label>
                        <Dropdown inputId="Status" value={selectedState} options={states} onChange={onStateChange} placeholder="Select" optionLabel="name" />
                    </div>
                </div>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="adultpostreforms">Adult Post Reforms</label>
                        <InputNumber id="adultpostreforms" value={adultpostreforms} onValueChange={(e) => setadultpostreforms(e.value)} mode="currency" currency="EUR" minFractionDigits={2} />
                    </div>
                    <div className="p-field p-col-12 p-md-6">
                        <label htmlFor="childpostreforms">Minor Post Reforms</label>
                        <InputNumber id="childpostreforms" value={childpostreforms} onValueChange={(e) => setchildpostreforms(e.value)} mode="currency" currency="EUR" minFractionDigits={2} />
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <Button icon={loadingIcon || ""} disabled={loading} onClick={handleSubmit} type="submit" label="Submit" className="p-mt-2" />
                </div>
            </Dialog>
        </div>
    );
}

export default Jobs;
