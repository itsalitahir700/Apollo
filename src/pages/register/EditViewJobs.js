import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import { getLovCampaign } from "../../services/JobsRegister";
import { useSelector, useDispatch } from "react-redux";
import { PostEditJobsAction, PostJobsAction } from "../../redux/actions/profileAction";
import EditViewJobsData from "./EditViewJobsData";

function EditViewJobs() {
    const [adultfee, setadultfee] = useState(0);
    const [childfee, setchildfee] = useState(0);
    const [scotadultfee, setscotadultfee] = useState(0);
    const [scotchildfee, setscotchildfee] = useState(0);
    const [companyJobCode, setcompanyJobCode] = useState("");
    const [compaignCode, setcompaignCode] = useState([]);
    const [compaignCodeValue, setcompaignCodeValue] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [isloading, setisloading] = useState(false);
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
        const data = {
            adultfee: adultfee,
            childfee: childfee,
            compaigncode: compaignCodeValue.code,
            companycode: CompanyCode,
            scotadultfee: scotadultfee,
            scotchildfee: scotchildfee,
            status: selectedState,
            companyjobcode: companyJobCode,
        };
        setisloading(true);
        await dispatch(PostEditJobsAction(data));
        setisloading(false);
        setDisplayBasic(!displayBasic);
    };
    const editRow = async (rowData) => {
        setadd(false);
        console.log("rowData ::", rowData);
        setDisplayBasic(!displayBasic);
        setadultfee(rowData.adultfee);
        setchildfee(rowData.childfee);
        setscotadultfee(rowData.scotadultfee);
        setscotchildfee(rowData.scotchildfee);
        setcompanyJobCode(rowData.companyjobcode);
        setSelectedState(rowData.status);
    };
    const addRow = async () => {
        console.log("compaigncode ::", compaignCodeValue);
        setadd(true);
        setDisplayBasic(!displayBasic);
        setadultfee(0);
        setchildfee(0);
        setscotadultfee(0);
        setscotchildfee(0);
        setSelectedState("");
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
        };
        await dispatch(PostJobsAction(data));
        setDisplayBasic(!displayBasic);
    };

    useEffect(() => {
        funcgetLovCampaign();
    }, []);

    return (
        <div>
            <Button label="Add" icon="pi pi-external-link" onClick={addRow} />
            <EditViewJobsData editRow={editRow} companyJobsData={companyJobsData} />
            <Dialog header="Job" visible={displayBasic} style={{ width: "80%" }} onHide={() => setDisplayBasic(!displayBasic)} draggable={false}>
                <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-4">
                        <label htmlFor="childfee">Compaign</label>
                        <select disabled={!add} className="p-inputtext p-dropdown" value={compaignCodeValue} onChange={(e) => setcompaignCodeValue(e.target.value)}>
                            {compaignCode && compaignCode.length !== 0
                                ? compaignCode.map((item, index) => {
                                      return (
                                          <option value={item.code} key={item.code}>
                                              {item.name}
                                          </option>
                                      );
                                  })
                                : "No Records Found"}
                        </select>
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
                <div style={{ textAlign: "center" }}>
                    {isloading ? (
                        <Button onClick={handleSubmit} type="submit" label="Submit" className="p-mt-2" disabled>
                            <ProgressSpinner style={{ width: "15px", height: "15px", margin: "3px" }} strokeWidth="8" />
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit} type="submit" label="Submit" className="p-mt-2" />
                    )}
                </div>
            </Dialog>
        </div>
    );
}

export default EditViewJobs;
