import React from 'react';
import Pane from 'react-split-pane';
import SplitPane from 'react-split-pane';

import BodyRouter from './routes/BodyRouter';

const Body = (props) => {

    return (
        <div style={{ marginLeft: "70px"}}>
            <BodyRouter { ...props } />
        </div>
    );
}

export default Body;