import React, { useState } from "react";
import { Fieldset } from "primereact/fieldset";
import { Button } from "primereact/button";
import ClaimantInfo from "./claimantinfo";
import MinorModal from "./minormodal";
import AccidentInfo from "./AccidentInfo";
import VehiclesInfo from "./VehiclesInfo";
import ImagesUpload from "../../components/ImageUpload";
import { handlePostRequest } from "../../services/PostTemplate";
import { validation } from "../../utilities/validation";
import { claimantdetails, accidentdetails, minordetails, vehicledetails } from "../../utilities/constants";

import "./Hire.css";

function Hire() {
    const [claimantDetails, setclaimantDetails] = useState(claimantdetails);
    const [minorDetails, setMinorDetails] = useState(minordetails);
    const [accidentDetails, setaccidentDetails] = useState(accidentdetails);
    const [vehiclesDetails, setvehiclesDetails] = useState(vehicledetails);
    const [images, setimages] = useState();
    const [showMinorModal, setShowMinorModal] = useState(false);
    const [errors, seterrors] = useState({});
    const [loading, setloading] = useState(false);

    const handleSubmit = async () => {
        setloading(true);
        let post = { ...claimantDetails, ...minorDetails, ...accidentDetails, ...vehiclesDetails, files: images };
        const isvalid = await validation(post);
        seterrors(isvalid?.errors);
        if (!Object.keys(isvalid?.errors).length) {
            await handlePostRequest(post, "/hire/addNewHireCase");
        }
        setloading(false);
    };

    return (
        <>
            <Fieldset className="p-mt-2" legend="Claimant Info">
                <ClaimantInfo handleClaimantReturn={setclaimantDetails} showMinorModal={setShowMinorModal} errors={errors} />
            </Fieldset>

            <Fieldset className="p-mt-2" legend="Accident Info">
                <AccidentInfo handleAccidentReturn={setaccidentDetails} errors={errors} />
            </Fieldset>

            <Fieldset className="p-mt-2" legend="Vehicle Info">
                <VehiclesInfo handleVehicleInfoReturn={setvehiclesDetails} errors={errors} />
            </Fieldset>

            <Fieldset className="p-mt-2" legend="Attachments">
                <ImagesUpload handleImages={setimages} />
            </Fieldset>
            <center className="p-mt-2 p-button-outlined" disabled={loading} onClick={handleSubmit}>
                {Object.keys(errors).length ? <p className="p-error p-d-block">Please fill out required fields</p> : ""}
                <Button label="Create Hire" disabled={loading} icon={loading ? "pi pi-spin pi-spinner" : ""} />
            </center>
            <MinorModal
                handleMinorReturn={setMinorDetails}
                claimantAddress={{ gpostalcode: claimantDetails?.postalcode, gaddress1: claimantDetails?.address1, gaddress2: claimantDetails?.address2, gaddress3: claimantDetails?.address3, gcity: claimantDetails?.city, gregion: claimantDetails?.region }}
                show={showMinorModal}
                hide={setShowMinorModal}
            />
        </>
    );
}

export default Hire;
