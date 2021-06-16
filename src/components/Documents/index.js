import React, { useEffect, useCallback, useState } from "react";
import { getDocuments, addDocuments } from "../../redux/actions/documentActions";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactLightBox, { SRLWrapper } from "simple-react-lightbox";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "./Documents.css";
import ImagesUpload from "../ImageUpload";

function Documents() {
    const dispatch = useDispatch();

    const url = require("url");
    const urlObj = url.parse(document.location.href, true);
    const rtaCode = urlObj?.query?.id;

    const documents = useSelector((state) => state.documentsSlice?.documents);

    const [showdocumentsmodal, setshowdocumentsmodal] = useState(false);
    const [uploaddocs, setuploaddocs] = useState([]);
    const [loading, setloading] = useState(false);

    const handleDocuments = useCallback(async () => {
        await dispatch(await getDocuments(rtaCode));
    }, [dispatch, rtaCode]);

    const handleUpload = async () => {
        if (uploaddocs.length) {
            setloading(true);
            await dispatch(await addDocuments({ files: uploaddocs, rtaCode }));
            setloading(false);
        }
    };

    useEffect(() => {
        handleDocuments();
    }, [handleDocuments]);

    return (
        <div className="documents">
            <Button label="+ Add Documents" onClick={() => setshowdocumentsmodal(true)} />
            <SimpleReactLightBox>
                <SRLWrapper>{documents && documents.length ? documents.map((docs, idx) => <img height="160" className="doc-img" key={docs?.rtadoccode} src={docs?.docbase64} alt={docs?.docname} />) : ""}</SRLWrapper>
            </SimpleReactLightBox>
            <Dialog header={"Add Documents"} visible={showdocumentsmodal} style={{ width: "80%" }} onHide={() => setshowdocumentsmodal(false)}>
                <ImagesUpload handleImages={setuploaddocs} />
                <center className="p-mt-4">
                    <Button disabled={loading} onClick={handleUpload}>
                        <i className="pi pi-upload p-mr-2"></i>&nbsp;{loading ? "Uploading ..." : "Upload"}{" "}
                    </Button>
                </center>
            </Dialog>
        </div>
    );
}

export default Documents;
