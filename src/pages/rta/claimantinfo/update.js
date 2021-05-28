import React, { useState, useEffect, useCallback } from "react";
import { getClaimantDetails } from "../../../redux/actions/claimantAction";
import ClaimantInfo from "../claimantinfo";
import MinorModal from "../minormodal";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";

function UpdateClaimant() {
    const [claimantDetails, setclaimantDetails] = useState({
        title: "",
        firstname: "",
        middlename: "",
        lastname: "",
        dob: "",
        ninumber: "",
        englishlevel: "",
        mobile: "",
        landLine: "",
        email: "",
        postalcode: "",
        address1: "",
        address2: "",
        address3: "",
        city: "",
        region: "",
        scotland: "N",
        displayBasic: "false",
        minor: "",
        showMinorModal: "",
        claimantDetails: "",
        minorDetails: "",
        accidentDetails: "",
        vehiclesDetails: "",
        images: "",
        passengers: "",
    });
    const [minorDetails, setMinorDetails] = useState({
        gtitle: "",
        gfirstname: "",
        gmiddleName: "",
        glastName: "",
        gdob: "",
        gpostalcode: "",
        gemail: "",
        gaddress1: "",
        gaddress2: "",
        gaddress3: "",
        gcity: "",
        gregion: "",
    });
    const [showMinorModal, setShowMinorModal] = useState(false);
    const claimantstore = useSelector((state) => state.claimantSlice.claimantDetails);
    const [viewmode, setviewmode] = useState(true);

    const dispatch = useDispatch();

    const fetchClaimantDetails = useCallback(() => {
        dispatch(getClaimantDetails());
    }, [dispatch]);

    useEffect(() => {
        fetchClaimantDetails();
    }, [fetchClaimantDetails]);

    useEffect(() => {
        if (Object.keys(claimantstore).length) {
            let newclaimantObj = {};
            let newminorObj = {};
            Object.keys(claimantstore).forEach((element) => {
                if (element in claimantDetails) {
                    newclaimantObj[element] = claimantstore[element];
                }
                if (element in minorDetails) {
                    newminorObj[element] = claimantstore[element];
                }
            });
            setclaimantDetails(newclaimantObj);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [claimantstore]);

    console.log({ ...claimantstore, ...minorDetails });

    return (
        <div className="card">
            <ClaimantInfo handleClaimantReturn={setclaimantDetails} claimantdata={claimantDetails} viewmode={viewmode} showMinorModal={setShowMinorModal} />
            <MinorModal handleMinorReturn={setMinorDetails} minorData={minorDetails} viewmode={viewmode} show={showMinorModal} hide={setShowMinorModal} />
            <Button onClick={() => setviewmode(!viewmode)} label={viewmode ? "Edit" : "Update"} icon={viewmode ? "pi pi-pencil" : "pi pi-check"} className="p-mr-2 p-mb-2" />
        </div>
    );
}

export default UpdateClaimant;
