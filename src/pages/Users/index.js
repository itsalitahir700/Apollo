import { useState, useEffect, useCallback } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import { getUsers, updateUserPassword } from "../../services/Users";
import { MdUpdate } from "react-icons/all";
import { Chip } from "primereact/chip";
import { Skeleton } from "primereact/skeleton";

function Users() {
    const [userslist, setuserslist] = useState([]);
    const [loading, setloading] = useState(false);
    const [updating, setupdating] = useState(false);

    const actionTemplate = (rowData) => {
        return (
            <center>
                <Button disabled={updating} onClick={() => updatePassword(rowData?.usercode)} className="p-button-rounded p-mr-2">
                    <MdUpdate />
                </Button>
            </center>
        );
    };

    const statusTemplate = (rowData) => {
        return (
            <center>
                <Chip label={rowData?.status === "Y" ? "Active" : "Inactive"} className="p-px-4 custom-chip" />
            </center>
        );
    };

    const tableSkeleton = () => (
        <DataTable value={userslist} dataKey="usercode">
            <Column body={skeleteon} header="User Name" filter></Column>
            <Column body={skeleteon} header="Status" filter></Column>
            <Column body={skeleteon} header="Update Password"></Column>
        </DataTable>
    );

    const skeleteon = () => {
        return <Skeleton></Skeleton>;
    };

    const updatePassword = async (usercode) => {
        setupdating(true);
        console.log(usercode);
        await updateUserPassword(usercode);
        setupdating(false);
    };

    const getuserslist = useCallback(async () => {
        setloading(true);
        setuserslist(await getUsers());
        setloading(false);
    }, []);

    useEffect(() => {
        getuserslist();
    }, [getuserslist]);

    return (
        <Card>
            {!loading && userslist && userslist.length ? (
                <DataTable value={userslist} dataKey="usercode">
                    <Column field="username" header="User Name" filter sortable></Column>
                    <Column field="status" body={statusTemplate} header="Status" filter sortable></Column>
                    <Column body={actionTemplate} header="Update Password"></Column>
                </DataTable>
            ) : (
                tableSkeleton()
            )}
        </Card>
    );
}

export default Users;
