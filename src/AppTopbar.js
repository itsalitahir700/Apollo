import React from "react";

export const AppTopbar = (props) => {
    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };
    return (
        <div className="layout-topbar clearfix">
            <button type="button" className="p-link layout-menu-button" onClick={props.onToggleMenu}>
                <span className="pi pi-bars" />
            </button>

            <div className="layout-topbar-icons" style={{ display: "flex" }}>
                <center>
                    {JSON.parse(localStorage.getItem("loggedIn"))?.email} <br />
                    <b>{JSON.parse(localStorage.getItem("loggedIn"))?.tblUsercategory?.categoryname}</b>
                </center>
                <button type="button" className="p-link">
                    <span onClick={handleLogout} className="layout-topbar-item-text">
                        Logout
                    </span>
                </button>
            </div>
        </div>
    );
};
