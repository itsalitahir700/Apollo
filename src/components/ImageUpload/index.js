import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Badge } from "primereact/badge";
import { Panel } from "primereact/panel";
import "./ImageUpload.css";

function ImagesUpload({ handleImages }) {
    const toastBC = React.useRef(null);
    const upload = React.useRef(null);
    const [files, setfiles] = useState([]);
    const [loading, setloading] = useState(false);

    const header = () => {
        return (
            <>
                <input type="file" accept="image/gif, image/jpeg, image/png" style={{ display: "none" }} ref={upload} onChange={onFileChange} />
                <Button onClick={() => upload.current.click()}>
                    <i className="pi pi-upload p-mr-2"></i> Upload File
                </Button>
                &nbsp;
                <Button onClick={handleClear}>
                    <i className="pi pi-times p-mr-2"></i> Clear
                </Button>
            </>
        );
    };

    const onFileChange = async (e) => {
        setloading(true);
        await getBase64(e.target.files[0]);
        setloading(false);
    };

    async function getBase64(file) {
        if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                if (!files.some((file) => file?.fileBase64 === reader.result)) {
                    let newfiles = JSON.parse(JSON.stringify(files));
                    newfiles.push({ fileBase64: reader.result, fileName: file.name, fileSize: file.size });
                    setfiles(newfiles);
                }
            };
        } else {
            toastBC.current.show({ severity: "warn", summary: "This file type not supported" });
        }
    }

    const handleRemove = (b64) => {
        let newArr = files.filter((file) => JSON.stringify(file?.fileBase64) !== JSON.stringify(b64));
        setfiles(newArr);
    };

    const handleChange = (b64, desc) => {
        let idx = files.findIndex((file) => JSON.stringify(file?.fileBase64) === JSON.stringify(b64));
        let newArr = JSON.parse(JSON.stringify(files));
        newArr[idx].filedescr = desc;
        setfiles(newArr);
    };

    const handleClear = () => {
        setfiles([]);
    };

    useEffect(() => {
        handleImages(files);
    }, [files, handleImages]);

    return (
        <Panel header={header}>
            <Toast ref={toastBC} position="bottom-center" />

            <div className="image-flex ">
                {files.length ? (
                    files.map((file) => (
                        <div className="card-flex" key={file?.fileBase64}>
                            <img src={file?.fileBase64} width="60px" alt="img" />
                            <Badge value={(file?.fileSize / (1024 * 1024)).toFixed(2) + " MB"} />
                            <InputTextarea value={file?.filedescr} placeholder="Description" onChange={(e) => handleChange(file?.fileBase64, e.target.value)} />

                            <Button className="p-button-danger p-button-outlined p-button-sm" onClick={() => handleRemove(file?.fileBase64)}>
                                <i className="pi pi-trash "></i>
                            </Button>
                        </div>
                    ))
                ) : (
                    <center>
                        <h6 className="image-placeholder">Please Upload Images</h6>
                    </center>
                )}
                {loading && <h5>Loading</h5>}
            </div>
        </Panel>
    );
}

export default ImagesUpload;
