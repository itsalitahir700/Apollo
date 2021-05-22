import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/actions/authAction";
import "./Login.css";

const Login = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    let history = useHistory();
    const dispatch = useDispatch();
    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            userName: username,
            password: password,
        };
        const res = await dispatch(loginAction(data));
        if (res?.login) history.push("/profile");
    };
    return (
        <div className="p-d-flex p-jc-center" style={{ marginTop: "4%" }}>
            <div className="card" style={{ width: "40%" }}>
                <h2 style={{ marginTop: "2%", marginBottom: "10%" }} className="p-text-center">
                    Login
                </h2>
                <form onSubmit={handleLogin} className="p-fluid">
                    <div className="p-field p-grid">
                        <label htmlFor="firstname3" className="p-col-fixed" style={{ width: "100px" }}>
                            Firstname
                        </label>
                        <div className="p-col">
                            <InputText id="firstname3" type="text" value={username} onChange={(e) => setusername(e.target.value)} type="text" placeholder="Username" autoComplete="username" />
                        </div>
                    </div>
                    <div className="p-field p-grid">
                        <label htmlFor="lastname3" className="p-col-fixed" style={{ width: "100px" }}>
                            Lastname
                        </label>
                        <div className="p-col">
                            <InputText value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" autoComplete="current-password" />
                        </div>
                    </div>
                    <Button type="submit" label="Submit" className="p-mt-2" />
                </form>
            </div>
        </div>
    );
};

export default Login;
