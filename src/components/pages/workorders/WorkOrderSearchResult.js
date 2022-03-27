import React from 'react';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';

const WorkOrderSearchResult = (props) => {

    const apiRef = useGridApiRef();

    const columns = [
        { field: "id", hide: true },
        { field: "workorderId", headerName: "ID", type: "text", align: "center", width: 60, editable: false },
        { field: "workorderName", headerName: "이름", width: 100, editable: false },
        { field: "status", headerName: "상태", width: 50, editable: false },
        { field: "date", headerName: "생성일자", width: 70, editable: false },
    ]

    const rows = [
        {
            id: 1, workorderId: "1", workorderName: "name", status: "STARTED", date: "2022-10-2"
        }
    ]

    return (
        <div style={{ height: "330px", with: "100%" }}>
            <DataGridPro
                // {...data}
                apiRef={apiRef}
                columns={ columns }
                rows={ rows }
                // loading={rows.length === 0}
                headerHeight={38}
                // hideFooter={ true }
                // autoHeight={ true }
                rowHeight={35}
                checkboxSelection={ false }
                disableSelectionOnClick
                density='compact'
                // onRowClick={ handleRowSelection }
            />
        </div>
    )
}

export default WorkOrderSearchResult;