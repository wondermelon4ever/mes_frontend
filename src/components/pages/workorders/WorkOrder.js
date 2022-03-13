import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import WorkOrderSearch from './WorkOrderSearch';

const WorkOrder = (props) => {
    return(
        <Grid sx={{ flexGrow: 1 }} container spacing={0}>
            <Grid item xs={12}>
                <Box p={2} >
                    <Typography variant="h7" component="h7">
                        단순작업지시 셋업
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={9} sm={2}>
                <Box>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button>리셋</Button>
                        <Button>내려받기</Button>
                    </ButtonGroup>
                </Box>
            </Grid>
            <Grid item xs={9} sm={6} justify="end">
                <Box justifyContent="flex-end">
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button>생성</Button>
                        <Button>수정</Button>
                        <Button>준비</Button>
                        <Button>작업시작</Button>
                        <Button>입력잠금</Button>
                        <Button>입력해재</Button>
                        <Button>종료</Button>
                        <Button>삭제</Button>
                        <Button>닫기</Button>
                    </ButtonGroup>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <WorkOrderSearch />
            </Grid>
        </Grid>
    );
}

export default WorkOrder;