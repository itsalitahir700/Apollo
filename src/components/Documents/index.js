import React, { useEffect, useCallback } from "react";
import { getDocuments } from "../../redux/actions/documentActions";
import { useDispatch, useSelector } from "react-redux";

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

    return <div>HEHE</div>;
}

export default Documents;
