import React, { useEffect, useCallback, useState } from "react";
import { getDocuments, addDocuments } from "../../redux/actions/documentActions";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactLightBox, { SRLWrapper } from "simple-react-lightbox";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "./Documents.css";
import ImagesUpload from "../ImageUpload";
import { FaFilePdf } from "react-icons/all";

function Documents() {
    const dispatch = useDispatch();

    const url = require("url");
    const urlObj = url.parse(document.location.href, true);
    const rtaCode = urlObj?.query?.id;

    const documents = useSelector((state) => state.documentsSlice?.documents);

    const [showdocumentsmodal, setshowdocumentsmodal] = useState(false);
    const [uploaddocs, setuploaddocs] = useState([]);
    const [loading, setloading] = useState(false);
    const [pdfBase64, setPDFBase64] = useState();

    const handleDocuments = useCallback(async () => {
        setloading(true);
        await dispatch(await getDocuments(rtaCode));
        setloading(false);
    }, [dispatch, rtaCode]);

    const handleUpload = async () => {
        if (uploaddocs.length) {
            setloading(true);
            await dispatch(await addDocuments({ files: uploaddocs, rtaCode }));
            await handleDocuments();
            setloading(false);
        }
    };

    useEffect(() => {
        handleDocuments();
    }, [handleDocuments]);

    return (
        <div className="documents">
            <Button label="+ Add Documents " className="p-mb-2" onClick={() => setshowdocumentsmodal(true)} />

            <SimpleReactLightBox>
                <SRLWrapper>{documents && documents.length ? documents.map((docs, idx) => docs.doctype === "Image" && <img height="160" className="doc-img" key={docs?.rtadoccode} src={docs?.docbase64} alt={docs?.docname} />) : ""}</SRLWrapper>
            </SimpleReactLightBox>
            {documents && documents.length ? documents.map((docs, idx) => docs.doctype === "Esign" && <FaFilePdf title="Click to view" onClick={() => setPDFBase64(docs?.docbase64)} className="pdf-file" />) : null}
            <Dialog header={"Add Documents"} visible={showdocumentsmodal} style={{ width: "80%" }} onHide={() => setshowdocumentsmodal(false)}>
                <ImagesUpload handleImages={setuploaddocs} />
                <center className="p-mt-4">
                    <Button disabled={loading} onClick={handleUpload}>
                        <i className={loading ? "pi pi-spin pi-spinner" : "pi pi-upload p-mr-2"}></i>&nbsp;Upload
                    </Button>
                </center>
            </Dialog>
            {pdfBase64 ? <embed className="p-mt-4" width="100%" style={{ height: "90vh" }} src={`data:application/pdf;base64,${pdfBase64}`} type="application/pdf" /> : null}
        </div>
    );
}

export default Documents;
