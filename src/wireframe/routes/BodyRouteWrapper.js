import React from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react=router-dom';

import BodyLayout1 from './layouts/BodyLayout1';
import BodyLayout2 from './layouts/BodyLayout2';
import BodyLayout3 from './layouts/BodyLayout3';

const BodyRouteWrapper = (props) => {
    
    const presenter = props.presenter;
    let layout = undefined;
    switch(props.layout) {
        case "layout-1":
            layout = <Bodylayout1 {...props}> { presenter } </Bodylayout1>
            break;
        case "layout-2":
            layout = <Bodylayout2 {...props}> { presenter } </Bodylayout2>
            break;
        case "laytou-3":
            layout = <Bodylayout3 {...props}> { presenter } </Bodylayout3>
            break;
        default: 
            // nothing
    }

    return (
        <Route { ...props } render={({ ...props }) => {
            <div>
                { layout }
            </div>
        }} />
    )
}

export default withRouter(BodyRouteWrapper);