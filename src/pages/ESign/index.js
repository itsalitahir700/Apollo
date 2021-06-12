import React, { Component } from "react";
import SignaturePad from "react-signature-canvas";
import { Button } from "primereact/button";

import styles from "./style.module.css";

class ESign extends Component {
    state = { trimmedDataURL: null };
    sigPad = {};
    clear = () => {
        this.sigPad.clear();
    };
    trim = () => {
        this.setState({ trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL("image/png") });
    };
    render() {
        let { trimmedDataURL } = this.state;

        console.log(trimmedDataURL);
        return (
            <div className={styles.container}>
                <div className={styles.sigContainer}>
                    <SignaturePad
                        canvasProps={{ className: styles.sigPad }}
                        ref={(ref) => {
                            this.sigPad = ref;
                        }}
                    />
                </div>
                <div className={styles.buttons}>
                    <Button label="Clear" className="p-button-secondary" onClick={this.clear} />
                    <Button label="Trim" className="p-ml-2" onClick={this.trim} />
                </div>
            </div>
        );
    }
}

export default ESign;
