import React from 'react';
import Pane from 'react-split-pane';
import SplitPane from 'react-split-pane';

import BodyRouter from './routes/BodyRouter';

const Body = (props) => {

    const [drawerOpen, setDrawerOpen] = React.useState(props.drawerOpen);

    React.useEffect(()=>{
        setDrawerOpen(props.drawerOpen);
    }, [props.drawerOpen]);
    
    const marginLeft = drawerOpen ? 240 : 56;

    return (
        <div style={{ marginLeft: marginLeft }}>
            <BodyRouter { ...props } />
        </div>
    );
}

export default Body;