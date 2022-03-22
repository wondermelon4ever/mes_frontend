import React from 'react';

import BodyRouter from './routes/BodyRouter';
import BreadcrumbNav from './nav/BreadcrumbNav';

const Body = (props) => {

    const [drawerOpen, setDrawerOpen] = React.useState(props.drawerOpen);

    React.useEffect(()=>{
        setDrawerOpen(props.drawerOpen);
    }, [props.drawerOpen]);
    
    const marginLeft = drawerOpen ? 240 : 56;

    return (
        <div style={{ marginLeft: marginLeft }}>
            <BreadcrumbNav />
            <BodyRouter { ...props } />
        </div>
    );
}

export default Body;