import React, { useEffect, useCallback } from "react";
import { getDocuments } from "../../redux/actions/documentActions";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactLightBox, { SRLWrapper } from "simple-react-lightbox";
import "./Documents.css";

function Documents() {
    const dispatch = useDispatch();

    const url = require("url");
    const urlObj = url.parse(document.location.href, true);
    const rtaCode = urlObj?.query?.id;

    const documents = useSelector((state) => state.documentsSlice?.documents);

    const handleDocuments = useCallback(async () => {
        dispatch(getDocuments(rtaCode));
    }, [dispatch, rtaCode]);

    useEffect(() => {
        handleDocuments();
    }, [handleDocuments]);

    return (
        <SimpleReactLightBox>
            <SRLWrapper>{documents && documents.length && documents.map((docs, idx) => <img height="160" className="doc-img" key={docs?.rtadoccode} src={docs?.docbase64} alt={docs?.docname} />)}</SRLWrapper>
        </SimpleReactLightBox>
    );
}

export default Documents;
