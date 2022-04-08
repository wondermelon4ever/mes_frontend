import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Link, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import SvgIcon from '@mui/material/SvgIcon';

const Copyright = (props) => {

    const theme = useTheme();

    return(
        <div style={{ padding: 10 }}>
            <Typography style={{ fontSize: 12 }} color="black" align="center">
                {/* <img src="images/footer-log.png" alt="Samsung"/> &nbsp; */}
                {/* <IconButton>
                    <SettingsIcon />
                </IconButton>*/}
                &nbsp;
                { 'Copyright 2022 ' }
                <Link color="inherit" href="http://www.sds.samsung.com" style={{ textDecoration: "none" }}>
                    Samsung SDS
                </Link>
                { " " + new Date().getFullYear() }
                { '. All rights reserved.'}
                &nbsp;
                |
                &nbsp;
                <Link color="inherit" onClick={ (event)=> console.log("clicked!") } style={{ textDecoration: "none" }}>
                    개인정보 처리방침
                </Link>
            </Typography>
        </div>
    )
}

export default Copyright;