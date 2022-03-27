import React from 'react';

import { withStyles } from '@mui/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import WorkOrderSearch from './WorkOrderSearch';
import WorkOrderLineTable from './WorkOrderLineTable';

const gridStyle = {
    backgroundColor: "blue",
    paddingBottom: 2,
    paddingRight: 2,
    marginTop: 2,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 500
};

const WorkOrderButton = withStyles ({
    root: {
        padding: "3px",
        // margin: "2px",
        fontSize: 13,
        color: "black",
        // background: '#d3d3d3',
        // background: 'linear-gradient(45deg, #d3d3d3 30%, #FF8E53 90%)'
    }
})(Button);

const WorkOrder = (props) => {
    return(
        <Grid container spacing={1} rowSpacing={1} columnSpacing={1} columns={16}>
            <Grid item xs={16} sx={{ borderBottom: "1px solid #d3d3d3" }}>
                <Box>
                    <Typography fontSize={14}>
                        - 단순작업지시 셋업
                    </Typography>
                </Box>
            </Grid>
            <Grid container xs={12} sx={{ paddingTop: 0.5 }} >
                {/* <Grid container xs={12} sx={{ backgroundColor: "#d3d3d3"}}  */}
                <Grid item xs={12} sm={4} sx={{ paddingLeft: 2, display: "flex", justifyContent: "flex-start", borderBottom: "1px solid #d3d3d3"}}>
                    <Box component="div" sx={{ padding: 0.5 }}>
                        {/* <ButtonGroup variant="outlined" aria-label="outlined primary button group"> */}
                            <WorkOrderButton>리셋</WorkOrderButton>
                            <WorkOrderButton>내려받기</WorkOrderButton>
                        {/* </ButtonGroup> */}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end",  borderBottom: "1px solid #d3d3d3" }}>
                    <Box component="div" sx={{ padding: 0.5 }}>
                        {/* <ButtonGroup variant="outlined" aria-label="outlined primary button group"> */}
                            <WorkOrderButton>생성</WorkOrderButton>
                            <WorkOrderButton>수정</WorkOrderButton>
                            <WorkOrderButton>준비</WorkOrderButton>
                            <WorkOrderButton>작업시작</WorkOrderButton>
                            <WorkOrderButton>입력잠금</WorkOrderButton>
                            <WorkOrderButton>입력해재</WorkOrderButton>
                            <WorkOrderButton>종료</WorkOrderButton>
                            <WorkOrderButton>삭제</WorkOrderButton>
                            <WorkOrderButton>닫기</WorkOrderButton>
                        {/* </ButtonGroup> */}
                    </Box>
                </Grid>
                <Grid container sm={16} sx={{ padding: 1, height: document.documentElement.clientHeight-60-24-120, overflowY: "scroll" }}>
                    <Grid item sm={5} sx={{ paddingLeft: 1 }}>
                        <TextField sx={{ borderBottom: "#d3d3d3" }} fullWidth fontSize={ 13 } id="outlined-basic" label="작업지시 ID" variant="standard" value="abcdefg"/>
                    </Grid>
                    <Grid item sm={11} sx={{ paddingLeft: 1 }}>
                        <TextField fullWidth fontSize={ 13 } id="outlined-basic" label="작업지시 설명" variant="standard" value="abcdefg"/>
                    </Grid>
                    <Grid item sm={16} sx={{ padding: 1, paddingTop: 0.5 }}>
                        <TextField fontSize={ 13 } id="outlined-basic" label="작업지시 상태" variant="standard" value="START"/>
                        &nbsp;
                        <TextField fontSize={ 13 } id="outlined-basic" label="작업지시 유형" variant="standard" value="NORMAL"/>
                        &nbsp;
                        <FormControlLabel 
                            control={<Checkbox defaultChecked />}
                            label={<Typography fontSize={13}>초과생산여부</Typography>}/>
                        <FormControlLabel 
                            control={<Checkbox defaultChecked />} 
                            label={<Typography fontSize={13}>입력잠금여부</Typography>}/>
                        <FormControlLabel 
                            control={<Checkbox defaultChecked />}
                            label={<Typography fontSize={13}>종료예약여부</Typography>}/>
                    </Grid>
                    <Grid item sm={16} sx={{ padding: 1, paddingTop: 0.5 }}>
                        <TextField fullWidth fontSize={ 13 } id="outlined-basic" label="사유" variant="standard"/>
                    </Grid>
                    <Grid item sm={16} sx={{ padding: 1, paddingTop: 0 }}>
                        <WorkOrderLineTable height={ 250 } with={"100%"}/>
                    </Grid>
                    <Grid sm={16} sx={{ padding: 1, paddingTop: 0 }}>
                       이 부분에서 다른 정보를 보여준다 (또는 탭방식으로 처리할 수도 있다)
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4} sx={{ margin: 0, padding: 0, borderLeft: "1px solid #d3d3d3" }}>
                <WorkOrderSearch />
            </Grid>
        </Grid>
    )

}

export default WorkOrder;