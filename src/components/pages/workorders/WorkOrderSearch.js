import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { 
    Button,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography 
} from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import WorkOrderSearchResult from './WorkOrderSearchResult';

const WorkOrderSearch = (props) => {

    const [searchKeywordKind, setSearchKeywordKind] = React.useState("ID");
    const [searchKeyword, setSearchKeyword] = React.useState("");
    const [dateFrom, setDateFrom] = React.useState(Date.parse("2000-1-1"));
    const [dateTo, setDateTo] = React.useState(Date.now());

    const changeSearchKeywordKind = (event) => {
        setSearchKeywordKind(event.target.value);
    }

    const changeDateFrom = (event) => {

    }

    const changeDateTo = (event) => {

    }

    const doSearch = () => {
        console.log("do search...");
    }

    const rows = [

    ]

    return(
        <div style={{ paddingTop: 0 }}>
            <div>
                <Typography fontSize={14} sx={{ paddingTop: 0, marginTop: 0 }}>- Search condition for workorder</Typography>
                <div style={{ margin: 3, border: "1px solid #d3d3d3" }}>
                    <div style={{ spacing: 3, margin: 2, marginTop: 8, padding: 2, display: "flex"}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="작업지시생성일-시작"
                                inputFormat="MM/dd/yy"
                                value={dateFrom}
                                onChange={changeDateFrom}
                                renderInput={(params) => <TextField {...params} size="small" sx={{ width: "145px"}}/>}
                            />
                            &nbsp;
                            <DesktopDatePicker
                                label="작업지시생성일-종료"
                                inputFormat="MM/dd/yy"
                                value={dateTo}
                                onChange={changeDateTo}
                                renderInput={(params) => <TextField {...params} size="small" sx={{ width: "145px"}}/>}
                            />
                        </LocalizationProvider>
                    </div>
                    <div style={{ spacing: 3, margin: 2, marginTop: 2, padding: 2 }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={searchKeywordKind}
                            label="검색어종류"
                            onChange={changeSearchKeywordKind}
                            size="small"
                            sx={{ width: "145px" }}
                        >
                            <MenuItem value={"ID"}>작업지시ID</MenuItem>
                            <MenuItem value={"NAME"}>작업지시명</MenuItem>
                        </Select>
                        <Button variant="outlined" style={{ marginLeft: 3, padding: 3, width: "145px" }}>검색하기</Button>
                    </div>
                    <div style={{ spacing: 3, margin: 2, marginTop: 4, padding: 2 }}>
                        <TextField size="small" sx={{ width: "294px" }} fontSize={ 12 } id="outlined-basic" label={ searchKeywordKind } variant="outlined"/>
                    </div>
                </div>
            </div>
            <div style={{ padding: 0.5, paddingTop: 2 }}>
                <Typography fontSize={14}>- Search result for workorder</Typography>
                <div>
                    <WorkOrderSearchResult />
                </div>
            </div>
        </div>
    );
}

export default WorkOrderSearch;