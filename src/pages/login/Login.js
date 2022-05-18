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
    const [loading, setloading] = useState(false);
    const [loadingIcon, setloadingIcon] = useState("");

    let history = useHistory();
    const dispatch = useDispatch();
    const handleLogin = async (e) => {
        e.preventDefault();
        setloading(true);
        setloadingIcon("pi pi-spin pi-spinner");
        const data = {
            userName: username,
            password: password,
        };
        const res = await dispatch(loginAction(data));
        setloading(false);
        setloadingIcon("");
        if (res?.login) history.push("/");
    };
    return (
        <div className="login_body">
            <div align="center" className="p-mb-2">
                <h1 className="login_h1 logo_h1">Apollo</h1>
            </div>
            <div class="container" id="container">
                <div class="form-container sign-in-container">
                    <form action="#" className="login_form">
                        <div className="p-mb-4">
                            <h1 className="login_h1">Login</h1>
                        </div>
                        <div className="p-mt-4">
                            <input className="login_input" value={username} onChange={(e) => setusername(e.target.value)} type="text" placeholder="User Name" />
                            <input className="login_input" value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" />
                            <div className="p-mt-4">
                                <Button className="login_button" label="Login" icon={loadingIcon || ""} iconPos="right" disabled={loading} onClick={handleLogin} />
                            </div>
                        </div>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-right">
                            <h1 className="login_h1">Welcome!</h1>
                            <p className="login_p">Please login to access Apollo Portal</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <p className="login_p"> Powered by Apollo IT Dept</p>
            </footer>
        </div>
    );
};

export default Login;
