import React from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const PageWrapper = (props) => {

    return(
        <div>
            <div>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
                        MUI
                    </Link>
                    <Link
                        underline="hover"
                        key="2"
                        color="inherit"
                        href="/getting-started/installation/"
                        onClick={handleClick}
                    >
                        Core
                    </Link>
                    <Typography key="3" color="text.primary">
                        Breadcrumb
                    </Typography>
                </Breadcrumbs>
            </div>
            <div>
                { props.children }
            </div>
        </div>
    );
}

export default PageWrapper;