import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useIdleTimer } from "react-idle-timer";
import { toast, ToastContainer } from "react-toastify";
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
import Hire from "./pages/hire/Hire";
import RTATable from "./pages/rta/rtatable";
import HireTable from "./pages/hire/hiretable";
import RTACase from "./pages/rta/rtacase";
import HireCase from "./pages/hire/HireCase";
import Login from "./pages/login/Login";
import ESign from "./pages/ESign";
import RoleRights from "./pages/register/RoleRights";
import WorkFlow from "./pages/workFlow/WorkFlow";
import Users from "./pages/Users";
import UpdatePassword from "./pages/UpdatePassword";
import CaseList from "./pages/CaseList";

import { Dashboard } from "./components/Dashboard";
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
import { refreshToken } from "./services/Auth";

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
    const loggedInApollo = useSelector((state) => state?.authenticationSlice?.loggedInApollo);

    const sidebar = useRef();

    const history = useHistory();

    let menuClick = false;
    const minutes = 840000; // Refresh Token after 14minutes

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

    const logo = layoutColorMode === "dark" ? "assets/layout/images/logo-1.png" : "assets/layout/images/logo.svg";

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

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
        toast.warn("Logged out because of inactivity");
    };

    useIdleTimer({
        timeout: 18000000,
        onIdle: handleLogout,
        debounce: 500,
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
        if (nav) {
            setroutes(traverse(JSON.parse(nav), "to", []));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nav]);

    useEffect(() => {
        const handleRefreshToken = async () => {
            await refreshToken();
        };

        const interval = setInterval(async () => {
            if (localStorage.getItem("token")) {
                console.warn("Refreshing Token ...");
                await handleRefreshToken();
            }
        }, minutes);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, []);

    String.prototype.capitalizeEveryWord = function () {
        return this.toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <ToastContainer></ToastContainer>
            {auth && loggedInApollo && (
                <>
                    <AppTopbar onToggleMenu={onToggleMenu} />
                    <CSSTransition classNames="layout-sidebar" timeout={{ enter: 200, exit: 200 }} in={isSidebarVisible()} unmountOnExit>
                        <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
                            <div className="layout-logo" style={{ cursor: "pointer" }} onClick={() => history.push("/")}>
                                <img width={"100px"} alt="Logo" src={logo} />
                            </div>
                            <AppProfile />
                            <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
                        </div>
                    </CSSTransition>
                </>
            )}
            {/* <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange} layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} /> */}

            <div className="layout-main">
                {!auth && !loggedInApollo ? (
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route exact path="/eSign" component={ESign} />
                        <Redirect to="/" />
                    </Switch>
                ) : (
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        {routes && routes.includes("/profile") && <Route exact path="/profile" component={Profile} />}
                        {routes && routes.includes("/profile") && <Route exact path="/companydetails" component={CompanyDetails} />}
                        {routes && routes.includes("/module") && <Route exact path="/module" component={Module} />}
                        {routes && routes.includes("/role") && <Route exact path="/role" component={Role} />}
                        {routes && routes.includes("/module") && <Route exact path="/pages" component={Pages} />}
                        {routes && routes.includes("/role") && <Route exact path="/rolerights" component={RoleRights} />}
                        {routes && routes.includes("/workflow") && <Route exact path="/workflow" component={WorkFlow} />}
                        {routes && routes.includes("/rta") && <Route exact path="/rta" component={RTA} />}
                        {routes && routes.includes("/rtalist") && <Route exact path="/rtalist" component={RTATable} />}
                        {routes && routes.includes("/rtalist") && <Route exact path="/rtaCase" component={RTACase} />}
                        {<Route exact path="/hire" component={Hire} />}
                        {<Route exact path="/hirelist" component={HireTable} />}
                        <Route exact path="/hireCase" component={HireCase} />
                        <Route exact path="/users" component={Users} />
                        <Route exact path="/caseList" component={CaseList} />
                        <Route exact path="/updatepassword" component={UpdatePassword} />
                        <Route exact path="/eSign" component={ESign} />
                    </Switch>
                )}
            </div>
        </div>
    );
};

export default App;
