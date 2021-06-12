import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppTopbar } from "./AppTopbar";
import { AppMenu } from "./AppMenu";
import { AppProfile } from "./AppProfile";
import { AppConfig } from "./AppConfig";

import Profile from "./pages/register/Profile";
import CompanyDetails from "./pages/register/CompanyDetails";
import Module from "./pages/register/Module";
import Role from "./pages/register/Role";
import Pages from "./pages/register/Pages";
import RTA from "./pages/rta/RTA";
import RTATable from "./pages/rta/rtatable";
import RTACase from "./pages/rta/rtacase";
import Login from "./pages/login/Login";
import ESign from "./pages/ESign";

import PrimeReact from "primereact/api";

import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "./layout/flags/flags.css";
import "./layout/layout.scss";
import "./App.scss";

import { useSelector } from "react-redux";
const App = () => {
    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("dark");
    const [staticMenuInactive, setStaticMenuInactive] = useState(true);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(false);
    const [routes, setroutes] = useState([]);
    const auth = useSelector((state) => state?.authenticationSlice?.token);
    const nav = useSelector((state) => state?.authenticationSlice?.nav);

    const sidebar = useRef();

    const history = useHistory();

    let menuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode);
    };

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode);
    };

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
        menuClick = false;
    };

    const onToggleMenu = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === "overlay") {
                setOverlayMenuActive((prevState) => !prevState);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }
        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };

    const menu = JSON.parse(localStorage.getItem("nav"));

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const isDesktop = () => {
        return window.innerWidth > 1024;
    };

    const isSidebarVisible = () => {
        if (isDesktop()) {
            if (layoutMode === "static") return !staticMenuInactive;
            else if (layoutMode === "overlay") return overlayMenuActive;
            else return true;
        }

        return true;
    };

    const logo = layoutColorMode === "dark" ? "assets/layout/images/logo_llp.png" : "assets/layout/images/logo.svg";

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
        "p-input-filled": inputStyle === "filled",
        "p-ripple-disabled": ripple === false,
    });

    const sidebarClassName = classNames("layout-sidebar", {
        "layout-sidebar-dark": layoutColorMode === "dark",
        "layout-sidebar-light": layoutColorMode === "light",
    });

    const traverse = (item, key, newRoutes) => {
        item &&
            item.length &&
            item.forEach((elm) => {
                if (key in elm && elm[key] !== null) {
                    newRoutes.push(elm[key]);
                }
                if ("items" in elm) {
                    traverse(elm.items, "to", newRoutes);
                }
            });
        return newRoutes;
    };

    useEffect(() => {
        setroutes(traverse(JSON.parse(nav), "to", []));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nav]);

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            {auth && (
                <>
                    <AppTopbar onToggleMenu={onToggleMenu} />
                    <ToastContainer></ToastContainer>

                    <CSSTransition classNames="layout-sidebar" timeout={{ enter: 200, exit: 200 }} in={isSidebarVisible()} unmountOnExit>
                        <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
                            <div className="layout-logo" style={{ cursor: "pointer" }} onClick={() => history.push("/")}>
                                <img alt="Logo" src={logo} />
                            </div>
                            <AppProfile />
                            <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
                        </div>
                    </CSSTransition>
                </>
            )}

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange} layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            {console.log(routes)}
            <div className="layout-main">
                <Switch>
                    {!auth ? (
                        <Switch>
                            <Route path="/" exact render={() => <div>Home</div>} component={Login} />
                            <Route exact path="/eSign" component={ESign} />
                            <Redirect to="/" />
                        </Switch>
                    ) : (
                        <Switch>
                            {routes && routes.includes("/profile") && <Route exact path="/profile" component={Profile} />}
                            {routes && routes.includes("/companydetails") && <Route exact path="/companydetails" component={CompanyDetails} />}
                            {routes && routes.includes("/module") && <Route exact path="/module" component={Module} />}
                            {routes && routes.includes("/role") && <Route exact path="/role" component={Role} />}
                            {routes && routes.includes("/pages") && <Route exact path="/pages" component={Pages} />}
                            {routes && routes.includes("/rta") && <Route exact path="/rta" component={RTA} />}
                            {routes && routes.includes("/rtalist") && <Route exact path="/rtalist" component={RTATable} />}
                            <Route exact path="/rtaCase" component={RTACase} />
                            <Route exact path="/eSign" component={ESign} />
                        </Switch>
                    )}
                </Switch>
            </div>
        </div>
    );
};

export default App;
