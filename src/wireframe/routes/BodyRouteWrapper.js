import React from 'react';

import BodyLayout1 from './layouts/BodyLayout1';
import BodyLayout2 from './layouts/BodyLayout2';
import BodyLayout3 from './layouts/BodyLayout3';

const BodyRouteWrapper = (props) => {
    
    const presenter = props.presenter;
    console.log("path=====>" + props.key);
    let layout = undefined;
    switch(props.layout) {
        case "layout-1":
            layout = <BodyLayout1 {...props}> { presenter } </BodyLayout1>
            break;
        case "layout-2":
            layout = <BodyLayout2 {...props}> { presenter } </BodyLayout2>
            break;
        case "laytou-3":
            layout = <BodyLayout3 {...props}> { presenter } </BodyLayout3>
            break;
        default: 
            // nothing
    }

    return (
        <div>
            { layout }
        </div>
    )
}

export default BodyRouteWrapper;