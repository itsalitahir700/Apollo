import React, { useRef, useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function SubRtaCases({ subRtaCasesDetails, selectedSubRtaCases, setSelectedSubRtaCases }) {
    const dt = useRef(null);

    return (
        <div>
            <div className="datatable-filter-demo">
                <div className="card p-datatable-sm">
                    <DataTable
                        selectionMode="checkbox"
                        selection={selectedSubRtaCases}
                        onSelectionChange={(e) => setSelectedSubRtaCases(e.value)}
                        dataKey="rtanumber"
                        responsiveLayout="scroll"
                        ref={dt}
                        value={subRtaCasesDetails}
                        paginator
                        rows={6}
                        className="p-datatable-customers"
                        emptyMessage="No data found."
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: "3em" }}></Column>
                        <Column field="rtanumber" header="RTA Number" filter sortable />
                        <Column field="firstname" header="First Name" filter sortable />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default SubRtaCases;
