import React from 'react';
import Home from './home/Home';
import Monitor from './monitoring/Monitor';

var inited = false;

const configureRoutes = (props) => {
    if(inited == true) return;
    inited = true;

    var routeList = [];
    var home = {
        "key": "/",
        "presenter": <Home { ...props } />,
        "layout": "layout-1"
    };

    const size = {
        "width": "500",
        "height": "500"
    };

    var monitor = {
        "key": "/monitoring",
        "presenter": <Monitor json="app3.json" size={ size } { ...props } />,
        "layout": "layout-1"
    };
    
    routeList.push(home);
    routeList.push(monitor);

    return routeList;
}

export {
    configureRoutes,
    Home
    
}