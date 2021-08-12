import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { SetSingleCompanyDataAction, SetSingleJobsCompanyDataAction, SetSingleUsersCompanyDataAction, SetFreshUsersJobsDataNullLAction } from "../../redux/actions/profileAction";
import "./DataTable.css";

const ProfileComapanyData = () => {
    const [companyData, setcompanyData] = useState(null);
    const dt = useRef(null);

    const dispatch = useDispatch();
    const companyProfileData = useSelector((state) => state.profileSlice.compnayData);
    let history = useHistory();
    const editProduct = async (rowData) => {
        dispatch(SetSingleCompanyDataAction(rowData));
        dispatch(SetSingleJobsCompanyDataAction(rowData.tblCompanyjobs));
        dispatch(SetSingleUsersCompanyDataAction(rowData.tblUsers));
        dispatch(SetFreshUsersJobsDataNullLAction());
        history.push("/companydetails");
    };

    useEffect(() => {
        setcompanyData(companyProfileData);
    }, [companyProfileData]);

    const nameBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </React.Fragment>
        );
    };

    const emailBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </React.Fragment>
        );
    };

    const tagBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Tag</span>
                {rowData.tag}
            </React.Fragment>
        );
    };

    const addressBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Address</span>
                {rowData.addressline1}
            </React.Fragment>
        );
    };

    const categoryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Category</span>
                {rowData.tblUsercategory.categoryname}
            </React.Fragment>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Status</span>
                {rowData.companystatus === "Y" ? <Badge value="Active" severity="success" className="p-mr-2"></Badge> : <Badge value="Inactive" severity="warning" className="p-mr-2"></Badge>}
            </React.Fragment>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => editProduct(rowData)} />
            </React.Fragment>
        );
    };

    return (
        <div className="datatable-filter-demo">
            <div className="card p-datatable-sm">
                <DataTable ref={dt} value={companyData} paginator rows={10} className="p-datatable-customers" emptyMessage="No customers found.">
                    <Column field="name" header="Name" body={nameBodyTemplate} filter sortable filterPlaceholder="Search by name"  filterMatchMode="contains"/>
                    <Column field="email" style={{ width: "25%" }} header="Email" body={emailBodyTemplate} filter sortable filterPlaceholder="Search by email"  filterMatchMode="contains"/>
                    <Column field="tag" style={{ textAlign: "center" }} header="Tag" body={tagBodyTemplate} filter sortable filterPlaceholder="Search by tag"  filterMatchMode="contains"/>
                    <Column field="addressline1" header="Address" body={addressBodyTemplate} filter sortable filterPlaceholder="Search by address"  filterMatchMode="contains"/>
                    <Column field="tblUsercategory.categoryname" header="Category" body={categoryBodyTemplate} filter sortable filterPlaceholder="Search by category"  filterMatchMode="contains"/>
                    <Column className="p-column-filter-status" field="companystatus" header="Status" body={statusBodyTemplate} filter sortable filterPlaceholder="Search by status"  filterMatchMode="contains"/>
                    <Column body={actionBodyTemplate} filterMatchMode="contains"></Column>
                </DataTable>
            </div>
        </div>
    );
};
export default ProfileComapanyData;
