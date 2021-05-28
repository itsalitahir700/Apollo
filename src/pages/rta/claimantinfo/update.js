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
    const [minorDetails, setMinorDetails] = useState();
    const [showMinorModal, setShowMinorModal] = useState(false);
    const claimantstore = useSelector((state) => state.claimantSlice.claimantDetails);
    const [editmode, seteditmode] = useState(false);

    const dispatch = useDispatch();

    const fetchClaimantDetails = useCallback(() => {
        dispatch(getClaimantDetails());
    }, [dispatch]);

    useEffect(() => {
        fetchClaimantDetails();
    }, [fetchClaimantDetails]);

    useEffect(() => {
        if (Object.keys(claimantstore).length) {
            let newObj = {};
            Object.keys(claimantstore).forEach((element) => {
                if (element in claimantDetails) {
                    newObj[element] = claimantstore[element];
                }
            });
            setclaimantDetails(newObj);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [claimantstore]);

    return (
        <div className="card">
            <ClaimantInfo handleClaimantReturn={setclaimantDetails} claimantdata={claimantDetails} editmode={editmode} showMinorModal={setShowMinorModal} />
            <MinorModal handleMinorReturn={setMinorDetails} show={showMinorModal} hide={setShowMinorModal} />
            <Button onClick={() => seteditmode(!editmode)} label={!editmode ? "Edit" : "Update"} icon={!editmode ? "pi pi-pencil" : "pi pi-check"} className="p-mr-2 p-mb-2" />
        </div>
    );
}

export default UpdateClaimant;
