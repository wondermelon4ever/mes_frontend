import React from 'react';
import Button from '@mui/material/Button';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Typography } from '@mui/material';

let idCounter = 0;
const WorkOrderLineTable = (props) => {

    const apiRef = useGridApiRef();

    const columns = [
        { field: "id", hide: true },
        { field: "flow", headerName: "플로우", type: "text", align: "center", width: 110, editable: true },
        { field: "description", headerName: "설명", width: 200, editable: true },
        { field: "line", headerName: "라인", width: 70, editable: true },
        { field: "lineDesc", headerName: "라인설명", width: 100, editable: true },
        { field: "equipId", headerName: "장비ID", type: "singleSelect", valueOptions: ["1", "2", "3"], width: 100, editable: true },
        { field: "equipDesc", headerName: "장비설명", width: 100, editable: true },
    ]

    const rows = [];

    const handleRowSelection = (params) => {
        setSelectedRowId(params.id);
    }

    const addRow = () => {
        apiRef.current.updateRows([{
            id: idCounter++, 
            flow: "", 
            description: "", 
            line: "", 
            lineDesc: "", 
            equipId: "", 
            equipDesc: ""
        }])
    }

    const updateRow = () => {
        // apiRef.current.updateRows([{ id: rowId, username: randomUserName() }]);
    }

    const updateAllRows = () => {

    }

    const deleteRow = () => {
        var rows = apiRef.current.getSelectedRows();
        rows.forEach((arow, key)=>{
            apiRef.current.updateRows([{ id: arow.id, _action: 'delete' }]);
        });
    }

    // const { data } = useDemoData({
    //     dataSet: 'Commodity',
    //     rowLength: 100000,
    //     editable: true,
    // });

    return (
        <div style={{ width: props.width, padding: 0 }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="text" onClick={ addRow }><Typography fontSize={ 12 } >추가</Typography></Button>
                <Button variant="text" onClick={ updateRow }><Typography fontSize={ 12 } >갱신</Typography></Button>
                <Button variant="text" onClick={ updateAllRows }><Typography fontSize={ 12 } >모두갱신</Typography></Button>
                <Button variant="text" onClick={ deleteRow }><Typography fontSize={ 12 } >삭제</Typography></Button>
            </div>
            <div style={{ height: props.height }}>
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
                    checkboxSelection={ true }
                    disableSelectionOnClick
                    density='compact'
                    // onRowClick={ handleRowSelection }
                />
            </div>
        </div>
    );
}

export default WorkOrderLineTable;