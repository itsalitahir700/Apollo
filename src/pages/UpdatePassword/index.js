import React from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { updatePassword } from "../../services/Auth";
import "./UpdatePassword.css";

function UpdatePassword() {
    const [isloading, setisloading] = React.useState(false);

    const Schema = Yup.object().shape({
        password: Yup.string().required("This field is required"),
        confirmpassword: Yup.string().when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf([Yup.ref("password")], "Both password need to be the same"),
        }),
    });

    return (
        <div className="password-wrapper">
            <Card title="Change Password" className="password-card">
                <Formik
                    initialValues={{
                        password: "",
                        confirmpassword: "",
                    }}
                    validationSchema={Schema}
                    onSubmit={async (e) => {
                        if (e.password && e.confirmpassword) {
                            setisloading(true);
                            await updatePassword(e.password);
                            setisloading(false);
                        }
                    }}
                >
                    {({ values, errors, handleSubmit, handleChange, handleBlur }) => {
                        return (
                            <div className="p-fluid p-formgrid p-grid">
                                <form onSubmit={handleSubmit}>
                                    <div className="p-field ">
                                        <label>Password</label> <InputText name="password" onChange={handleChange} onBlur={handleBlur} value={values.password || ""} type="text" placeholder="Enter a new password" className={errors?.password && "p-invalid p-d-block"} />
                                        <small className="p-error p-d-block">{errors?.password}</small>
                                    </div>
                                    <div className="p-field ">
                                        <label>Confirm Password</label> <InputText name="confirmpassword" onChange={handleChange} onBlur={handleBlur} value={values.confirmpassword || ""} type="text" placeholder="Re enter a new password" className={errors?.confirmpassword && "p-invalid p-d-block"} />
                                        <small className="p-error p-d-block">{errors?.confirmpassword}</small>
                                    </div>

                                    <Button disabled={isloading} type="submit" label={"Update Password"} />
                                </form>
                            </div>
                        );
                    }}
                </Formik>
            </Card>
        </div>
    );
}

export default UpdatePassword;
