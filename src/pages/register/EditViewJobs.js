import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { getLovCampaign } from "../../services/JobsRegister";
import { useSelector, useDispatch } from "react-redux";
import { PostEditJobsAction, PostJobsAction } from "../../redux/actions/profileAction";
import EditViewJobsData from "./EditViewJobsData";

function EditViewJobs({ name, tag, userCat }) {
    const [adultfee, setadultfee] = useState(0);
    const [childfee, setchildfee] = useState(0);
    const [scotadultfee, setscotadultfee] = useState(0);
    const [scotchildfee, setscotchildfee] = useState(0);
    const [adultpostreforms, setadultpostreforms] = useState(0);
    const [childpostreforms, setchildpostreforms] = useState(0);
    const [companyJobCode, setcompanyJobCode] = useState("");
    const [compaignCode, setcompaignCode] = useState([]);
    const [compaignCodeValue, setcompaignCodeValue] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [loading, setloading] = useState(false);
    const [loadingIcon, setloadingIcon] = useState("");
    const [add, setadd] = useState(false); // default is edit

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
        setcompaignCodeValue(res.data[0]);
    }

    const CompanyCode = useSelector((state) => state.profileSlice.singleCompanyData?.companycode);

    const companyJobsData = useSelector((state) => state.profileSlice.jobsData);
    const handleSubmit = async () => {
        if (add) {
            handleAddJobSubmit();
        } else {
            handleEditJobSubmit();
        }
    };
    const handleEditJobSubmit = async () => {
        setloading(true);
        setloadingIcon("pi pi-spin pi-spinner");
        const data = {
            adultfee: adultfee,
            childfee: childfee,
            compaigncode: compaignCodeValue.code,
            companycode: CompanyCode,
            scotadultfee: scotadultfee,
            scotchildfee: scotchildfee,
            status: selectedState,
            companyjobcode: companyJobCode,
            adultpostreforms,
            childpostreforms,
        };

        const res = await dispatch(PostEditJobsAction(data));
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

    const editRow = async (rowData) => {
        console.log(rowData);
        setadd(false);
        setDisplayBasic(!displayBasic);
        setSelectedState({ code: rowData?.status, name: rowData?.status === "Y" ? "Active" : "Inactive", type: null });
        setcompaignCodeValue({ code: rowData.tblCompaign.compaigncode, name: rowData.tblCompaign.compaignname, type: null });
        setadultfee(rowData.adultfee);
        setchildfee(rowData.childfee);
        setscotadultfee(rowData.scotadultfee);
        setscotchildfee(rowData.scotchildfee);
        setadultpostreforms(rowData.adultpostreforms);
        setchildpostreforms(rowData.childpostreforms);
        setcompanyJobCode(rowData.companyjobcode);
        setSelectedState(rowData.status);
    };
    const addRow = async () => {
        setadd(true);
        setDisplayBasic(!displayBasic);
        setInitialValues();
    };
    const handleAddJobSubmit = async () => {
        const data = {
            adultfee: adultfee,
            childfee: childfee,
            compaigncode: compaignCodeValue.code,
            companycode: CompanyCode,
            scotadultfee: scotadultfee,
            scotchildfee: scotchildfee,
            status: selectedState,
            adultpostreforms,
            childpostreforms,
        };

        const res = await dispatch(PostJobsAction(data));
        if (res?.responsecode !== 0) {
            setDisplayBasic(!displayBasic);
            setInitialValues();
        }
        setloading(false);
        setloadingIcon("");
    };

    useEffect(() => {
        funcgetLovCampaign();
    }, []);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "baseline" }}>
                <label>
                    {" "}
                    <b> Name : {name}</b>
                </label>
                <label>
                    <b>Tag : {tag}</b>{" "}
                </label>
                <label>
                    <b>Category : {userCat?.name}</b>{" "}
                </label>
                <Button label="Add" icon="pi pi-external-link" onClick={addRow} />
            </div>
            <EditViewJobsData editRow={editRow} companyJobsData={companyJobsData} />
            <Dialog header="Job" visible={displayBasic} style={{ width: "80%" }} onHide={() => setDisplayBasic(!displayBasic)} draggable={false}>
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
                        <Dropdown value={selectedState} options={states} onChange={(e) => setSelectedState(e.value)} optionValue="code" optionLabel="name" placeholder="Select status" />
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

export default EditViewJobs;
