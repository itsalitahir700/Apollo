import React, { useState, useEffect, useCallback, useRef } from "react";
import SignaturePad from "react-signature-canvas";
import { Button } from "primereact/button";
import styles from "./style.module.css";
import { addESign, getESigns } from "../../redux/actions/eSignAction";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";
import { FaFilePdf } from "react-icons/fa";

const ESign = () => {
    let sigPad = {};
    const [loading, setloading] = useState(false);
    const [eDetails, setEDetails] = useState({});
    const [pdfBase64, setPDFBase64] = useState();
    const eFields = useSelector((state) => state?.eSignSlice?.eFields);
    const dispatch = useDispatch();
    const url = require("url");
    const urlObj = url.parse(document.location.href, true);
    const rtaCode = urlObj?.query?.rta;
    const pdfRef = useRef(null);

    const handleESigns = useCallback(async () => {
        setloading(true);
        await dispatch(await getESigns(rtaCode));
        setloading(false);
    }, [dispatch, rtaCode]);

    useEffect(() => {
        handleESigns();
    }, [handleESigns]);

    useEffect(() => {
        let newObj = {};
        Object.keys(eFields).length &&
            Object.keys(eFields).forEach((element, idx) => {
                newObj[element] = undefined;
            });
        setEDetails(newObj);
    }, [eFields]);

    const clear = () => {
        sigPad.clear();
    };
    const trim = async () => {
        setloading(true);
        let flag = true;

        for (var i in eDetails) {
            if ((eDetails[i] === undefined || eDetails[i] === "") && [eDetails[i]] === "doc") {
                flag = false;
                break;
            }
        }
        if (flag) {
            await addESign({ rtaCode, eSign: sigPad.getTrimmedCanvas().toDataURL("image/png").replace("data:image/png;base64,", ""), ...eDetails });
        } else {
            toast.warn("Please fill all the fields");
        }
        setloading(false);
    };
    const executeScroll = () => pdfRef.current.scrollIntoView({ top: "400px", behavior: "smooth" });

    return (
        <div className={styles.container}>
            <center>
                <h2>E-SIGNATURE</h2>
                <h6>
                    <b>Please add you signature below</b>{" "}
                </h6>
            </center>
            <div className={styles.formContainer}>
                <div className=" p-fluid p-formgrid p-grid p-my-0">
                    {Object.keys(eFields).map((item) => (
                        <>
                            {item === "doc" ? (
                                <div className="p-md-1 p-sm-2 p-xs-2">
                                    <Button
                                        title="Double click to view"
                                        onClick={() => {
                                            setPDFBase64(eFields[item]);
                                        }}
                                        onDoubleClick={() => {
                                            setPDFBase64(eFields[item]);
                                            executeScroll();
                                        }}
                                    >
                                        <FaFilePdf title="Double click to view" className="pdf-file" />
                                        &nbsp;PDF
                                    </Button>
                                </div>
                            ) : (
                                <div className="p-field p-col-12 p-md-6">
                                    <label>{eFields[item]}</label>
                                    <InputText
                                        disabled={loading}
                                        required={true}
                                        type={eFields[item]}
                                        value={eDetails[item]}
                                        onChange={(e) => {
                                            setEDetails({ ...eDetails, [item]: e.target.value });
                                        }}
                                        placeholder={eFields[item]}
                                    />
                                </div>
                            )}
                        </>
                    ))}
                </div>
            </div>
            <div className={styles.sigContainer} style={{ pointerEvents: loading ? "none" : "all" }}>
                <SignaturePad
                    disable={!loading}
                    canvasProps={{ className: styles.sigPad }}
                    ref={(ref) => {
                        sigPad = ref;
                    }}
                />
            </div>
            <div className={styles.buttons}>
                <Button label="Clear" disabled={loading} className="p-button-secondary" onClick={clear} />
                <Button label="Submit" disabled={loading} className="p-ml-2" onClick={trim} />
            </div>
            <div ref={pdfRef} className="pdf-section p-pb-2">
                {pdfBase64 ? <embed className="p-mt-4" width="100%" style={{ height: "90vh" }} src={`data:application/pdf;base64,${pdfBase64}`} type="application/pdf" /> : null}
            </div>
        </div>
    );
};

export default ESign;
