import React, { useState, useEffect, useCallback } from "react";
import SignaturePad from "react-signature-canvas";
import { Button } from "primereact/button";
import styles from "./style.module.css";
import { addESign, getESigns } from "../../redux/actions/eSignAction";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";

const ESign = () => {
    let sigPad = {};
    const [trimmedDataURL, settrimmedDataURL] = useState(null);
    const [loading, setloading] = useState(false);
    const [eDetails, setEDetails] = useState({});
    const eFields = useSelector((state) => state?.eSignSlice?.eFields);
    const dispatch = useDispatch();

    const handleESigns = useCallback(async () => {
        setloading(true);
        await dispatch(await getESigns(88));
        setloading(false);
    }, [dispatch]);

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
        settrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL("image/png"));
        for (var i in eDetails) {
            if (eDetails[i] === undefined || eDetails[i] === "") {
                flag = false;
                break;
            }
        }
        if (flag) {
            await addESign({ rtaCode: 88, eSign: sigPad.getTrimmedCanvas().toDataURL("image/png").replace("data:image/png;base64,", ""), ...eDetails });
        } else {
            toast.warn("Please fill all the fields");
        }
        setloading(false);
    };

    console.log(eDetails);

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className=" p-fluid p-formgrid p-grid p-my-0">
                    {Object.keys(eFields).map((item) => (
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
        </div>
    );
};

export default ESign;
