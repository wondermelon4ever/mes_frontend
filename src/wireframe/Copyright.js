import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Link, Typography } from '@mui/material';

const Copyright = (props) => {

    const theme = useTheme();

    return(
        <div style={{ padding: 10 }}>
            <Typography varient="body2" color="black" align="center">
                { 'Copyright @' }
                <Link color="inherit" href="">
                    Samsung SDS
                </Link>
                { " " + new Date().getFullYear() }
                { '. All rights reserved.'}
                <img src="images/footer-log.png" alt="Samsung"/>
            </Typography>
        </div>
    )
}

export default Copyright;