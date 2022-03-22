import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
    Breadcrumbs,
    Link,
    Typography
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const BreadcrumbNav = (props) => {
    const crumbs = useBreadcrumbs();
    const breadcrumbs = [];

    crumbs.map(({
        match,
        breadcrumb
    }, index) => {
        breadcrumbs.push(
            (index + 1 === crumbs.length) ? (
                <Typography color='text.secondary' fontSize='13px'>
                    { breadcrumb }
                </Typography>
            ) : (
                <Link 
                    component={ RouterLink }
                    underline='hover'
                    key={ index }
                    color='inherit'
                    to={ match.pathname }
                >
                    <Typography color='text.secondary' fontSize='13px'>
                        { breadcrumb }
                    </Typography>
                </Link>
            )
        )
    });

    return (
        <div style={{ paddingLeft: 12, paddingTop: 3, height: 24, backgroundColor: '#d3d3d3' }}>
            <Breadcrumbs
                separator={ <NavigateNextIcon fontSize="small"/> }
                aria-label='breadcrumb'
            >
                { breadcrumbs }
            </Breadcrumbs>
        </div>
    );
}

const typography = {
    body2: {
        fontSize: [12, '!important']
    }
}

export default BreadcrumbNav;
